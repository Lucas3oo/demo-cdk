#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as fs from 'fs'
import * as path from "path";
import { load } from 'js-yaml';
import { DemoCdkStack } from '../stack/demo-cdk-stack';

const app = new cdk.App();


function getEnvConfig(envConfigName: string) {
  const envConfig = load(fs.readFileSync(path.resolve("./env/" + envConfigName + ".yaml"), "utf8"));
  return envConfig;
}

async function Main() {
  const envConfigName = app.node.tryGetContext('envConfig');
  if (!envConfigName)
    throw new Error("Context variable missing on CDK command. Pass in as `-c envConfig=myEnvStageXxx` ");
  const envConfig = getEnvConfig(envConfigName);


  const stackName = envConfigName + "-app-resources";
  new DemoCdkStack(app, stackName, envConfig);
}
Main();
