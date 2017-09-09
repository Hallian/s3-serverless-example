#!/usr/bin/env bash

REGION=eu-west-1
STAGE=dev
API_NAME=$STAGE-todo-example

API_ID=`aws apigateway get-rest-apis --query "items[?name == '$API_NAME'].id" --output text`
aws apigateway get-resources \
	--rest-api-id $API_ID \
	--query "items[].{url:join('', ['https://$API_ID.execute-api.$REGION.amazonaws.com/$STAGE', path]), path:path, methods:resourceMethods}[?methods != null]"
