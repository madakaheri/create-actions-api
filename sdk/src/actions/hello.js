import {api} from '../utils/api.js';

/**
 * Hello アクションの例
 * @param {Object} input
 * @param {string} input.name - 名前
 * @returns {Promise<{message: string}>}
 */
export async function hello(input) {
	return api.post({
		action: 'hello',
		payload: input,
	});
}
