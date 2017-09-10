# Frontend

The frontend is a simple Todo application written in React.

## Getting started

```
npm install
npm run get-path-config
```

## S3 static site hosting

We'll use S3 static site hosting to serve our application to the world. The frontend folder contains a CloudFormation
template called `frontend.cloudformation.yml`. This template contains the configuration that describes a bucket and
static site hosting configuration.

Create the resources with `aws` cli.

```
aws cloudformation create-stack \
	--stack-name todo-example-frontend \
	--template-body file://frontend.cloudformation.yml
```

Since that is somewhat cumbersome, the `package.json`s scripts section has it defined so you can also run:

```
npm run create-stack
``` 

After our stack has been created, we can upload our frontend to the bucket. But first we need the actual bucket name.
You can obtain that from the stack outputs with `aws` cli.

```
aws cloudformation describe-stacks --stack-name todo-example-frontend
```

Alternatively you could use the `npm` script in `package.json` script section.

```
npm run describe-stack
```

Now we can upload our frontend to the S3 bucket with `aws` and we're all set!

```
npm run build
aws s3 sync build s3://$BUCKET
```

To make it even more simple, there's a script that does all of that in one go.

```
npm run deploy
```
