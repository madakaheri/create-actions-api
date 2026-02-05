/**
 * Hello アクションの例
 * @param {Object} input
 * @param {string} input.name - 名前
 * @returns {Promise<{message: string}>}
 */
export async function hello(input) {
	return {
		message: `Hello, ${input.name}!`,
	};
}
