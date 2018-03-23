# mobile-examiner-alpha-journal-service
DVSA Mobile Examiner Services (GDS Alpha phase) - Journal Microservice

# Steps to build the lambda package
These steps will create a deployment-package.zip file for deploying to AWS lambda 
 - npm run compile
 - npm run copy-package
 - bash zip.sh

# Lambda Environment variables
 - redisUrl | redis:// + redis instance endpoint
 - redisPort | redis instance port number

# Service requirements
 - Lambda functions must be with the same VPC as the Redis instance

# Swagger
Go to editor.swagger.io and paste in the contents of `./src/function/swagger/journal-service.yml

# Distribution builds
Refer to the scripts inside dist-scripts for each of the distribution build steps

# Security

## Git Hooks
For each public github repo you are working on, please set up the following prepush git hook in .git/hooks/pre-push

```
  #!/bin/sh
  git secrets --scan && git log -p -n 15 | scanrepo 
```

Make sure the hook is executable (chmod +x .git/hooks/pre-push)


If you tend to commit more than you push, up the 15 to a more suitable number to cover all of your commits - you should be pushing more often though.

## Security Tools

Can you install and run the following security programs as part of your testing process:

https://github.com/awslabs/git-secrets

After installing, do a one-time set up (in each repo) with 

```
  cd /path/to/my/repo
  git secrets --install
  git secrets --register-aws
```

Run with git secrets --scan.

https://github.com/UKHomeOffice/repo-security-scanner

After installing, run with git log -p | scanrepo.
