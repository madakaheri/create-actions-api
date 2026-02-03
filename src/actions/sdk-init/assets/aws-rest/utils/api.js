import * as API from 'aws-amplify/api';

class AwsRestApiConnector {
	/**
	 * POSTリクエストを送信する
	 * @param {Object} input
	 * @param {string} input.action - アクション名
	 * @param {Object} input.payload - ペイロード
	 * @returns {Promise<Object>} レスポンスデータ
	 */
	async post({action, payload}) {
		const {body} = await API.post({
			apiName: 'ActionApi',
			path: `/${action}`,
			options: {
				body: payload,
			},
		}).response;
		return body.json();
	}
}

/**
 * 注意事項:
 * - 使用の前に ```Aplify.configure()``` で初期設定する必要があります。
 */
export const api = new AwsRestApiConnector();
export default api;
