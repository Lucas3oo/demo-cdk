#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DemoCdkStack } from '../stack/demo-cdk-stack';
import { getEnvConfig } from '../utils/config';

const app = new cdk.App();

export async function main() {
  const envConfig = getEnvConfig(app);

  const stackName = app.node.tryGetContext('envConfig') + "-app-resources";
  new DemoCdkStack(app, stackName, envConfig);
}

main();

