import {getAction} from './steps/get-action.js';
import {parseBody} from './steps/parse-body.js';
// import {env} from '../config.js';

/**
 * アクションルーター(HTTP版)
 * @param {import('aws-lambda').APIGatewayProxyEvent} event
 * @returns {Promise<import('aws-lambda').APIGatewayProxyResultV2>}
 */
export async function router(event) {
	const {httpMethod} = event;
	/** @type {import('aws-lambda').APIGatewayProxyResultV2} */
	const response = {
		headers: {
			'Access-Control-Allow-Credentials': false,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
			'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
		},
		statusCode: 200,
		body: null,
	};

	// Preflight Request -> ALL OK
	if (httpMethod === 'OPTIONS') {
		return response;
	}

	try {
		const action = await getAction(event);
		const payload = parseBody(event);
		const result = await action(payload);
		response.body = JSON.stringify(result);
	} catch (error) {
		console.error(error);
		response.statusCode = error.statusCode || 500;
		response.body = JSON.stringify({
			name: error.name || 'UnhandledError',
			message: error.message,
		});
	}

	return response;
}
