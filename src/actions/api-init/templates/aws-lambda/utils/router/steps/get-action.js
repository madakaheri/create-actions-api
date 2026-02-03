import {camelToKebab, kekabToCamel} from '../utils/text-transform.js';

/**
 * パスからアクションを取得
 * @param {string} actionName
 * @returns {Promise<Function>}
 */
export async function getAction(actionName) {
	const actionKekab = camelToKebab(actionName);
	const actionCamel = kekabToCamel(actionKekab);
	let module;
	try {
		module = await import(`./actions/${actionKekab}/index.js`);
	} catch (error) {
		if (error.code === 'ERR_MODULE_NOT_FOUND') {
			const notFoundError = new Error('Not Found');
			notFoundError.name = 'RouteError';
			notFoundError.statusCode = 404;
			throw notFoundError;
		}

		throw error;
	}

	const action = module[actionCamel];
	if (typeof action !== 'function') {
		const error = new Error('Not Found');
		error.name = 'RouteError';
		error.statusCode = 404;
		throw error;
	}

	return action;
}
