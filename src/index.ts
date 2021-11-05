import {Context} from 'aws-lambda/handler';
import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from 'aws-lambda/trigger/api-gateway-proxy';

export const handler = async (event: APIGatewayProxyEventV2, context?: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    console.log('Event', {event});
    const {requestContext, headers} = event;

    return {
        statusCode: 200,
        ...headers,
        body: 'Successfully queried!'
    };
};
