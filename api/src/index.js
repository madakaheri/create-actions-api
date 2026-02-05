import {auth} from './utils/auth.js';
import {router} from './utils/router/index.js';

/**
 * Lambdaハンドラー
 * @param {import('aws-lambda').APIGatewayProxyEvent} event
 * @returns {import('aws-lambda').APIGatewayProxyResult}
 */
export async function handler(event) {
	await auth.fetchCurrentAuthenticationUser(event);
	const response = await router(event);
	return response;
}
