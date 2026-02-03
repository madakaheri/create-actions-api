import {router} from './utils/router/index.js';

/**
 * Lambdaハンドラー
 * @param {Object} event
 * @param {string} event.action
 * @param {any} event.payload
 * @returns {Promise<{statusCode: number, data?: any, error?: {name: string, message: string, stack: string}}>}
 */
export async function handler(event) {
	const response = await router(event);
	return response;
}
