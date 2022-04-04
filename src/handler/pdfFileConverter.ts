import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { jsPDF } from 'jspdf';

export async function main(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  console.log('event 👉', event);

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [4, 2]
  });

  doc.text("Hello world!", 1, 1);
  const file = doc.output();
  console.log(file);

  return {
    'headers': { "Content-Type": "application/pdf" },
    'statusCode': 200,
    'body': file
  }

  return {
    body: JSON.stringify({ message: 'Successful lambda invocation' }),
    statusCode: 200,
  };
}