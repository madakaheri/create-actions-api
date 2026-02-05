import {validateInput} from './steps/validate-input.js';
import {createMessage} from './steps/create-message.js';

/**
 * Hello アクションの例
 * @param {Object} input
 * @param {string} input.name - 名前
 * @returns {Promise<{message: string}>}
 */
export async function hello(input) {
	// ステップ1: 入力を検証
	validateInput(input);

	// ステップ2: メッセージを作成
	const message = createMessage(input.name);

	// ステップ3: 結果を返す
	return {
		message,
	};
}
