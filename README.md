# demo-cdk

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

    brew install aws-cdk


Create bucket for the templates and a lot of IAM roles are created. This will actually create a stack.

    cdk bootstrap aws://274795428224/eu-north-1


## Run the deployment for a specific env

    cdk deploy -c envConfig=stage14


## Delete the stack

    cdk destroy stage14-app-resources -c envConfig=stage14


## Protecting secrets
Generate RSA key pair but do not check-in the keypair.pem file to Git.

    openssl genrsa -out keypair.pem 2048
    openssl rsa -in keypair.pem -pubout -out publickey.pem

RSA encrypt with PKCS#1 v1.5 padding and base64 encode the secret string 'my-secret-pw' using the public key and then you need to save the secret in the env's properties file.

    echo -n 'my-secret-pw' | openssl rsautl -encrypt -pkcs -pubin -inkey publickey.pem | base64

The the custom function for decrypting which uses node.js built in decrypt and the keypair.pem file can be use:

    decryptProperty(envConfig, 'slrk.deploy.resource-secret');

## Static code analysis of CDK code
Install the tool checkov which have currently 163 rules for Cloudformation.

    brew install checkov

    cdk synth --quiet -c envConfig=stage14 && checkov --framework cloudformation -o sarif --directory cdk.out/ --output-file-path build/checkov --soft-fail

Soft-fail so the command return 0 even if there are failed checks.

The resulting report will be

    build/checkov/results_sarif.sarif

Docker:

    docker run --volume $(pwd):/workdir --workdir /workdir bridgecrew/checkov --framework cloudformation -o sarif --directory cdk.out/ --output-file-path build/checkov --soft-fail

In Azure DevOps:

    - task: Docker@2
      displayName: 'Run Checkov for static code analysis of Cloudformation'
      inputs:
        command: run
        arguments: --volume $(pwd):/workdir --workdir /workdir bridgecrew/checkov  --framework cloudformation -o sarif --directory cdk.out/ --output-file-path build/checkov --soft-fail


