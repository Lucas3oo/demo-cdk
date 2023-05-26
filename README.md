# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`DemoCdkStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template




## Initial setup for CDK

Create bucket for the templates and a lot of IAM roles are created. This will actually create a stack.

    cdk bootstrap aws://274795428224/eu-north-1


## Run the deployment for a specific env

    cdk deploy -c envConfig=stage14


## Delete the stack

    cdk destroy stage14-app-resources -c envConfig=stage14