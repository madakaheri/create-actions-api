import {camelToKebab, kekabToCamel} from '../utils/text-transform.js';

/**
 * パスからアクションを取得
 * @param {import('aws-lambda').APIGatewayProxyEvent} event
 * @returns {Promise<Function>}
 */
export async function getAction(event) {
	const {path} = event;

	/** @type {[string, 'auth' | 'unauth', string]} */
	const [_apiVersion, actionName] = path.split('/').filter(Boolean);
	const actionNameKekab = camelToKebab(actionName);
	const actionNameCamel = kekabToCamel(actionNameKekab);

	const filePath = `../../actions/${actionNameKekab}/index.js`;

	const module = await import(filePath).catch(error => {
		if (error.code === 'ERR_MODULE_NOT_FOUND') {
			const error = new Error('Directory Not Found');
			error.name = 'RouteError';
			error.statusCode = 404;
			error.cause = {filePath};
			throw error;
		} else {
			throw error;
		}
	});
	const action = module[actionNameCamel];
	if (typeof action !== 'function') {
		const error = new Error('Action Not Found');
		error.name = 'RouteError';
		error.statusCode = 404;
		throw error;
	}

	return action;
}
