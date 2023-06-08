import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import * as DemoCdk from '../main/stack/demo-cdk-stack'

test('Bucket Created', () => {
  const app = new cdk.App()
  // WHEN
  const stack = new DemoCdk.DemoCdkStack(app, 'MyTestStack', null)
  // THEN

  const template = Template.fromStack(stack)

//  template.hasResourceProperties('AWS::S3::Bucket', {
//    VisibilityTimeout: 300
//  })
})
