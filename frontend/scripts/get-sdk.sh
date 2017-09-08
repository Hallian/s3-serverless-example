#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

API_NAME=$1

if [ -z $API_NAME ]; then
	echo "No api name specified!"
	exit 1
fi

cd $DIR/../src

API_ID=`aws apigateway get-rest-apis --query "items[?name == '$API_NAME'].id" --output text`
aws apigateway get-sdk --rest-api-id $API_ID --stage-name dev --sdk-type javascript sdk.zip
unzip -o sdk.zip
rm sdk.zip
