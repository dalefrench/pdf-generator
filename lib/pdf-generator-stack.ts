import { Stack, StackProps, aws_lambda_nodejs, aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class PdfGeneratorStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new aws_apigateway.RestApi(this, 'Api');

    api.root.addMethod('ANY');
    const fn = new aws_lambda_nodejs.NodejsFunction(this, 'PdfFileConverter', {
      entry: 'src/handler/pdfFileConverter.ts',
      handler: 'main',
      description: 'Function to convert to a PDF file.'
    });

    const books = api.root.addResource('pdf');
    const postPdfIntegration = new aws_apigateway.LambdaIntegration(fn);
    books.addMethod('POST', postPdfIntegration);
    books.addMethod('GET', postPdfIntegration);



  }
}
