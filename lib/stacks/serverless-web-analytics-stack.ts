import * as cdk from "aws-cdk-lib";
import * as dotenv from "dotenv";
import * as sns from "aws-cdk-lib/aws-sns";
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
import { Swa } from "serverless-website-analytics";
import { applyCommonTags } from "../utils/tags";

interface ServerlessWebAnalyticsStackProperties extends cdk.StackProps {
   /**
    * Specifies an ACM certificate ARN created in the us-east-1 region for use with the CloudFront distribution.
    * This should be a wildcard certificate to work properly with Cognito.
    *
    * @default undefined
    */
   acmCertificateArn: ICertificate | undefined;

   /**
    * Specifies the fully qualified domain name (FQDN) to use for the CloudFront distribution.
    * This domain name must be covered by the ACM certificate.
    */
   domain: string;
}

export class ServerlessWebAnalyticsStack extends cdk.Stack {
   constructor(
      scope: Construct,
      id: string,
      props: ServerlessWebAnalyticsStackProperties,
   ) {
      super(scope, id, props);
      applyCommonTags(this);

      // Optionally subscribe to Alarms on a SNS topic
      const alarmTopic = new sns.Topic(this, 'alarm-topic');
      new sns.Subscription(this, 'serverless-website-analytics-alarms', {
         topic: alarmTopic,
         protocol: sns.SubscriptionProtocol.EMAIL,
         // TODO: configure an email address here
         // email address hidden as environment secret
         //endpoint: process.env.EMAIL_ADDRESS as string
         endpoint: 'user@example.com'
      });

      new Swa(this, 'serverless-web-analytics', {
         environment: 'prod',
         // NOTE: You should strongly consider enabling authorization here. The only reason it is not enabled is for demo purposes
         // TODO: Enable authorization if you use this in production
         auth: undefined,
         awsEnv: {
            account: this.account,
            region: this.region,
         },
         // allowed cors origins
         allowedOrigins: [
            'https://chrisebert.net',
            'https://ebertlabs.com',
            'https://cebert.github.io',
            `https://${props.domain}`,
         ],
         sites: ['chrisebert.net', 'ebertlabs.com', 'aws-midwest-community-day', props.domain],
         firehoseBufferInterval: 500,
         domain: {
            name: props.domain,
            usEast1Certificate: props.acmCertificateArn,
            // If not configured, you will need to add DNS entries yourself
            hostedZone: undefined,
            trackOwnDomain: true,
         },
         isDemoPage: false,
         // Adds alarms and dashboards at added cost
         observability: {
            dashboard: true,
            loglevel: 'INFO',
         },
         rateLimit: {
            ingestLambdaConcurrency: 100,
            frontLambdaConcurrency: 100
         }
      });
   }
}
