import {SSMClient, GetParametersCommand, GetParametersCommandInput, GetParametersCommandOutput, Parameter} from '@aws-sdk/client-ssm';

const ssmClient = new SSMClient({region: 'eu-west-1'});

export const getSSMValues = async (endpointSSMPath: string, iamroleSSMPath: string): Promise<{url: string, iamRole: string}> => {
    const ssmInput: GetParametersCommandInput = {
        Names: [
            endpointSSMPath, 
            iamroleSSMPath
        ]
    };
    const response: GetParametersCommandOutput = await ssmClient.send(new GetParametersCommand(ssmInput));

    if (!response.Parameters || !response.InvalidParameters) {
        console.log('Parameters not in response', response);
        throw new Error('SSM Failure');
    }

    if (response.Parameters.length == 0 || response.InvalidParameters.length != 0) {
        console.log('Parameter values not in response', response);
        throw new Error('SSM Failure');
    }

    const endpointParam: Parameter | undefined = response.Parameters.find((param: Parameter) => param.Name === endpointSSMPath);
    const iamRoleParam: Parameter | undefined = response.Parameters.find((param: Parameter) => param.Name === iamroleSSMPath);

    if (!endpointParam || !endpointParam.Value || !iamRoleParam || !iamRoleParam.Value) {
        console.log('Parameter value not in Parameter', response);
        throw new Error('Filter Failure');
    }

    return {
        url: endpointParam.Value,
        iamRole: iamRoleParam.Value
    };
};
