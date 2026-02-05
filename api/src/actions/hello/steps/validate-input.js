/**
 * 入力データを検証する
 * @param {Object} input
 * @param {string} input.name - 名前
 * @throws {Error} 名前が未指定の場合
 */
export function validateInput(input) {
	if (!input || !input.name) {
		const error = new Error('Name is required');
		error.statusCode = 400;
		throw error;
	}
}
