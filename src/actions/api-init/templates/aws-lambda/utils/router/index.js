import {getAction} from './steps/get-action.js';

/**
 * アクションルーター(Lambda版)
 * @param {Object} event
 * @param {string} event.action
 * @param {any} event.payload
 * @returns {Promise<{statusCode: number, data?: any, error?: {name: string, message: string, stack: string}}>}
 */
export async function router(event) {
	const {action, payload} = event;

	try {
		const actionMethod = await getAction(action);
		const data = await actionMethod(payload);
		return {
			statusCode: 200,
			data,
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: error.statusCode || 500,
			error: {
				name: error.name || 'UnhandledError',
				message: error.message,
				stack: error.stack,
			},
		};
	}
}
