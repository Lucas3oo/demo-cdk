import { Stack, StackProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';


function ensureString(object: { [name: string]: any }, propName: string): string {
  if (!object[propName] || object[propName].trim().length === 0)
    throw new Error(propName + " does not exist or is empty");

  return object[propName];
}

export class DemoCdkStack extends Stack {
  constructor(scope: Construct, id: string, envConfig: any, props?: StackProps) {
    super(scope, id, props);

    const bucket1 = new s3.Bucket(this, 'bucket1', {
      bucketName: ensureString(envConfig, 'slrk.deploy.bucket-name'),
      versioned: true,
      websiteRedirect: { hostName: 'aws.amazon.com' }
    });
  };
}
