import { Stack, type StackProps, Tags } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import type { Construct } from 'constructs'
import { getProperty, decryptProperty } from '../utils/config'

export class DemoCdkStack extends Stack {
  constructor (scope: Construct, id: string, envConfig: any, props?: StackProps) {
    super(scope, id, props)

    const bucket1 = new Bucket(this, 'bucket1', {
      bucketName: getProperty(envConfig, 'slrk.deploy.bucket-name'),
      versioned: true,
      websiteRedirect: { hostName: 'aws.amazon.com' }
    })

    const tagValue = decryptProperty(envConfig, 'slrk.deploy.resource-secret')

    Tags.of(bucket1).add('my-key', tagValue)
  }
}
