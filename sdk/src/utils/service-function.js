import {api} from './api.js';

class ServiceFunction {
	/**
	 * Action API へ POST する
	 * @param {Object} input
	 * @param {string} input.action - アクション名
	 * @param {Object|null} input.payload - ペイロード
	 * @returns {Promise<Object>} レスポンスデータ
	 */
	async post({action, payload}) {
		return api.post({action, payload});
	}
}

export const serviceFunction = new ServiceFunction();
export default serviceFunction;
