# IAM Auth Http Api

## Info 

This handles deployment for a public http api with iam authentication, integrated lambda, and iam role to execute specific route by a specific iam user (for experimental testing).

Http Apis are designed for low-latency and cost-effective integrations, however the purpose of this deployment is to cover iam authentication with Http Apis.

When IAM authorization is enabled, clients must use Signature Version 4 to sign their requests with AWS credentials. API Gateway invokes your API route only if the client has execute-api permission for the route.

You manage access in AWS by creating policies and attaching them to IAM identities (users, groups of users, or roles) or AWS resources. A policy is an object in AWS that, when associated with an identity or resource, defines their permissions. AWS evaluates these policies when an IAM principal (user or role) makes a request. Permissions in the policies determine whether the request is allowed or denied. Most policies are stored in AWS as JSON documents. AWS supports six types of policies: identity-based policies, resource-based policies, permissions boundaries, Organizations SCPs, ACLs, and session policies.

For more information...
- [Serverless Framework: Http Support](https://www.serverless.com/blog/aws-http-api-support)
- [Serverless Framework: Http Lambda Events](https://www.serverless.com/framework/docs/providers/aws/events/http-api)
- [AWS Documentation: Control access for invoking an API](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html)
- [AWS Documentation: IAM Policy Elements Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html)
- [AWS Documentation: IAM Policy Principal](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html)
- [AWS Documentation: Policies and permissions in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policies-json)


## Architecture

<p align="center">
  <img src="/architecture-diagram.drawio.svg" />
</p>

## Usage 

### Credentials:
```bash
export AWS_PROFILE=<profile_name>
```

### Install Dependencies:

```bash
yarn run install
```

### Deploy:

```bash
yarn run deploy
```

### Invoke Locally:

```bash
yarn run invoke <function-name>
```

### Test Deployed Api:

```bash
yarn run execute
```

### Remove:

```bash
yarn run remove
```
