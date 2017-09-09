#!/usr/bin/env bash

TABLE_ARN=`aws cloudformation describe-stacks --stack-name todo-example-dev --query "Stacks[0].Outputs[?OutputKey == 'TodoTableArn'] | [0].{tableName:OutputValue}" --output text`
TABLE_NAME=`echo $TABLE_ARN | grep -E -o '[a-zA-Z0-9-]*$'`

echo -e "{\n\t\"tableName\": \"$TABLE_NAME\"\n}"
