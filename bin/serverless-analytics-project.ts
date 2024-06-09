import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AcmCertificateStack } from "../lib/stacks/acm-certificate-stack";
import { ServerlessWebAnalyticsStack } from "../lib/stacks/serverless-web-analytics-stack";

/**
 * This is a multi-stack CDK app. The first stack deploys an ACM certificate. The second stack
 * deploys an instance of the serverless website analytics server stack.
 */
const app = new cdk.App({
   context: {
    },
});
const acmCertificateStack = new AcmCertificateStack(
   app,
   'serverless-analytics-acm-certificate-stack',
   {
      env: { region: 'us-east-1' }, // ACM certificates for CloudFront must be in us-east-1,
      crossRegionReferences: true
   },
);
const serverlessAnalyticsStack = new ServerlessWebAnalyticsStack(
   app,
   'serverless-analytics-stack',
   {
      env: { region: 'us-east-2' },
      crossRegionReferences: true,
      acmCertificateArn: acmCertificateStack.certificateArn,
      domain: 'web-analytics.ebertlabs.com',
   },
);

console.log(`ACM arn: ${acmCertificateStack.certificateArn}`);
console.log(`ArtifactId: ${serverlessAnalyticsStack.artifactId}`);

app.synth();
