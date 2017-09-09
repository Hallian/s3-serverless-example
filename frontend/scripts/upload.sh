#!/usr/bin/env bash

BUCKET=`aws cloudformation describe-stacks --stack-name todo-example-frontend --query "Stacks[0].Outputs[?OutputKey== 'Bucket'].OutputValue" --output text`
aws s3 sync build s3://$BUCKET
