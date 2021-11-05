import {HttpsAgent} from 'agentkeepalive';
import axios from 'axios';
import {aws4Interceptor} from 'aws4-axios';
import {getSSMValues} from './ssm';

const endpointSSMPath: string = '/dev/iamAuthApi/endpointUrl';
const iamRoleSSMPath: string = '/dev/iamAuthApi/clientRole';

const main = async (): Promise<void> => {
    console.log('Retrieving SSM Values...');
    const ssmValues: {url: string, iamRole: string} = await getSSMValues(endpointSSMPath, iamRoleSSMPath);

    console.log('Making request to API...');
    const keepaliveAgent = new HttpsAgent({
        timeout: 60000,
        freeSocketTimeout: 30000,
    });

    const axiosClient = axios.create({
        httpsAgent: keepaliveAgent,
    });

    axiosClient.interceptors.request.use(aws4Interceptor({
        region: 'eu-west-1',
        service: 'execute-api',
        assumeRoleArn: ssmValues.iamRole
    }));

    const response = await axiosClient.get<any>(`${ssmValues.url}/query/example`, {
        headers: {
            'content-type': 'application/json',
        },
    });

    console.log('Api Response :', response.data);
};

main()
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
