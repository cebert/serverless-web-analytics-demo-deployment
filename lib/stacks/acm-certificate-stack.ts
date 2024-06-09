import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cdk from "aws-cdk-lib";
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
import { applyCommonTags } from "../utils/tags";

/**
 * This is a stack for provisioning an ACM certificate for use by serverless analytics. This needs to be created in us-east-1
 * because CloudFront requires it to be created in this region for distribution even if you deploy all other resources in a different region.
 *
 * A stack for creating the ACM certificate is used here to prevent sharing the ARN for this certificate in a public repository.
 */
export class AcmCertificateStack extends cdk.Stack {
   public readonly certificateArn: ICertificate | undefined;

   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, {
         ...props,
         env: { region: 'us-east-1' }, // This stack must be in us-east-1 for use by CloudFront
      });
      applyCommonTags(this);

      // Replace root domain with your domain
      // TODO replace this with your domain
      const rootDomain = 'ebertlabs.com';
      // Create the ACM certificate
      const certificate = new acm.Certificate(this, 'Certificate', {
         domainName: rootDomain,
         subjectAlternativeNames: [`*.${rootDomain}`], // Add wildcard support for subdomains
         validation: acm.CertificateValidation.fromDns(), // Don't forget to add a validation CNAME entry to Route53/DNS for the domain for validation
      });
      this.certificateArn = certificate;
   }
}
