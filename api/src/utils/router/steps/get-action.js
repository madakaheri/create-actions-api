import * as actions from '../../actions/index.js';
import {camelToKebab, kekabToCamel} from '../utils/text-transform.js';

/**
 * パスからアクションを取得
 * @param {import('aws-lambda').APIGatewayProxyEvent} event
 * @returns {Promise<Function>}
 */
export async function getAction(event) {
	const {path} = event;

	const [_empty, actionName] = path.split('/').filter(Boolean);
	const actionNameKekab = camelToKebab(actionName);
	const actionNameCamel = kekabToCamel(actionNameKekab);

	const action = actions[actionNameCamel];
	if (typeof action !== 'function') {
		const error = new Error('Action Not Found');
		error.name = 'RouteError';
		error.statusCode = 404;
		throw error;
	}

	return action;
}
