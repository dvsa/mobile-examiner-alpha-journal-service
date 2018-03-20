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
