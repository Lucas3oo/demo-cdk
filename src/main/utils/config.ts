import * as yaml from 'yaml'
import * as fs from 'fs'
import * as path from "path";
import { App } from 'aws-cdk-lib';
import * as crypto from 'crypto';

// Get environment specific configuration properties
export function getEnvConfig(app: App): any {
  const envConfigName = app.node.tryGetContext('envConfig');
  if (!envConfigName)
    throw new Error("Context variable missing on CDK command. Pass in as `-c envConfig=myEnvStageXxx` ");

  const envConfig = yaml.parse(fs.readFileSync(path.resolve("./env/" + envConfigName + ".yaml"), "utf8"));

  return envConfig;
}


export function getProperty(properties: { [name: string]: any }, propName: string): string {
  if (!properties[propName] || properties[propName].trim().length === 0)
    throw new Error(propName + " does not exist or is empty");

  return properties[propName];
}


export function decryptProperty(properties: { [name: string]: any }, propName: string): string {
  const encryptedPropValue = getProperty(properties, propName);
  const privateKey = fs.readFileSync(path.resolve("./keypair.pem"), "utf8");
  const propValue: Buffer = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(encryptedPropValue, "base64")
  );

  return propValue.toString();
}
