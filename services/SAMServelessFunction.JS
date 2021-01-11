class SAMServelessFunction {
  constructor(apiProperties) {
    this.properties = apiProperties;
  }

  get finalTemplate() {
    return this.makeTemplate();
  }
  makeTemplate() {
    const template = {
      AWSTemplateFormatVersion: "2010-09-09",
      Transform: "AWS::Serverless-2016-10-31",
      Description: this.properties.description,
      Globals: {
        Function: {
          Timeout: 3
        }
      },
      Resources: {
        HelloWorldFunction: {
          Type: "AWS::Serverless::Function",
          Properties: {
            CodeUri: "hello-world/",
            Handler: "app.lambdaHandler",
            Runtime: this.properties.runtime,
            Events: {
              HelloWorld: {
                Type: "Api",
                Properties: {
                  Path: "/hello",
                  Method: "get"
                }
              }
            }
          }
        }
      }
    };
    return template;
  }
}
export default SAMServelessFunction;

//   const api = {
//    "Type": "AWS::Serverless::Api",
//    "Properties": {
//       "AccessLogSetting": "AccessLogSetting",
//       "Auth": "ApiAuth",
//       "BinaryMediaTypes": "List",
//       "CacheClusterEnabled": "Boolean",
//       "CacheClusterSize": "String",
//       "CanarySetting": "CanarySetting",
//       "Cors": "String | CorsConfiguration",
//       "DefinitionBody": "String",
//       "DefinitionUri": "String | ApiDefinition",
//       "Description": "String",
//       "Domain": "DomainConfiguration",
//       "EndpointConfiguration": "EndpointConfiguration",
//       "GatewayResponses": "Map",
//       "MethodSettings": "MethodSettings",
//       "MinimumCompressionSize": "Integer",
//       "Models": "Map",
//       "Name": "String",
//       "OpenApiVersion": "String",
//       "StageName": "String",
//       "Tags": "Map",
//       "TracingEnabled": "Boolean",
//       "Variables": "Map"
//    }
// }

// const helloWorld = {
//   "AWSTemplateFormatVersion": "2010-09-09",
//   "Transform": "AWS::Serverless-2016-10-31",
//   "Description": "sam-app\nSample SAM Template for sam-app\n",
//   "Globals": {
//     "Function": {
//       "Timeout": 3
//     }
//   },
//   "Resources": {
//     "HelloWorldFunction": {
//       "Type": "AWS::Serverless::Function",
//       "Properties": {
//         "CodeUri": "hello-world/",
//         "Handler": "app.lambdaHandler",
//         "Runtime": "nodejs12.x",
//         "Events": {
//           "HelloWorld": {
//             "Type": "Api",
//             "Properties": {
//               "Path": "/hello",
//               "Method": "get"
//             }
//           }
//         }
//       }
//     }
//   },
//   "Outputs": {
//     "HelloWorldApi": {
//       "Description": "API Gateway endpoint URL for Prod stage for Hello World function",
//       "Value": "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello/"
//     },
//     "HelloWorldFunction": {
//       "Description": "Hello World Lambda Function ARN",
//       "Value": "HelloWorldFunction.Arn"
//     },
//     "HelloWorldFunctionIamRole": {
//       "Description": "Implicit IAM Role created for Hello World function",
//       "Value": "HelloWorldFunctionRole.Arn"
//     }
//   }
// }
