import { Tags } from "aws-cdk-lib";
import { Construct } from "constructs";

/**
 * Applies a set of common tags to the given AWS CDK construct.
 *
 * This function tags the provided construct with a predefined set of key-value pairs.
 * The tags applied are:
 * - application: 'website-analytics'
 * - environment: 'prod'
 * - owner: 'ebertlabs'
 * - project: 'serverless-analytics'
 * - type: 'cdk'
 *
 * @param {Construct} scope - The construct to which the tags will be applied.
 */
export function applyCommonTags(scope: Construct): void {
   Tags.of(scope).add('application', 'website-analytics');
   Tags.of(scope).add('environment', 'prod');
   Tags.of(scope).add('owner', 'ebertlabs');
   Tags.of(scope).add('project', 'serverless-analytics');
   Tags.of(scope).add('type', 'cdk');
   Tags.of(scope).add('purpose', 'demo');
}
