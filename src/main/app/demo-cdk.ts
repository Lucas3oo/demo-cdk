#!/usr/bin/env node
import { App } from 'aws-cdk-lib'
import { DemoCdkStack } from '../stack/demo-cdk-stack'
import { getEnvConfig } from '../utils/config'

const app = new App()

function main(): DemoCdkStack {
  const envConfig = getEnvConfig(app)

  const envConfigName: string = app.node.tryGetContext('envConfig')
  const stackName: string = envConfigName + '-app-resources'
  const stack: DemoCdkStack = new DemoCdkStack(app, stackName, envConfig)
  return stack
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
