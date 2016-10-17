#!/usr/bin/env node
const fs = require('fs');
const availableRegions = ['us-east-1', 'us-west-2', 'eu-west-1', 'eu-central-1', 'ap-northeast-1', 'ap-northeast-2', 'ap-southeast-1', 'ap-southeast-2'];

const pkgjson = require('./package.json');

const accountId = pkgjson.config.accountId;
const functionName = pkgjson.config.functionName;
const apiName = pkgjson.config.apiName;
const region = pkgjson.config.region || 'us-east-1';

if (availableRegions.indexOf(region) === -1) {
  console.error(`Amazon API Gateway and Lambda are not available in the ${region} region. Available regions: us-east-1, us-west-2, eu-west-1, eu-central-1, ap-northeast-1, ap-northeast-2, ap-southeast-1, ap-southeast-2`);
  process.exit();
}

modifySimpleProxyFile();

function modifySimpleProxyFile() {
  const simpleProxyApiPath = './simple-proxy-api.yaml';
  const simpleProxyApi = fs.readFileSync(simpleProxyApiPath+'.sample', 'utf8');
  const simpleProxyApiModified = simpleProxyApi
      .replace(/YOUR_ACCOUNT_ID/g, accountId)
      .replace(/YOUR_AWS_REGION/g, region)
      .replace(/YOUR_API_NAME/g, apiName)
      .replace(/YOUR_FUNCTION_NAME/g, functionName);

  fs.writeFileSync(simpleProxyApiPath, simpleProxyApiModified, 'utf8');
}
