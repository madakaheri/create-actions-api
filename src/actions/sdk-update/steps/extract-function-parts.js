import fs from 'node:fs/promises';
import esprima from 'esprima-next';

/**
 * ソースコードからActionのDocコメントなどをパーツに分けて抽出します。
 *
 * #### inputの対応範囲
 *
 * input は **第一引数のみ** 対応します。
 *
 * 以下は全て `input` として扱います。
 *
 * - オブジェクト分割代入
 * - 配列分割代入
 *
 * また、 **スプレッド構文には対応しません。**
 *
 * @param {Object} params
 * @param {string} params.srcPath
 * @param {string} params.actionName
 * @returns {Promise<{
 *   docComment: string,
 *   inputName: string,
 * }>}
 */
export async function extractFunctionParts({srcPath, actionName}) {
	const path = `${srcPath}/${actionName}/index.js`;
	const code = await fs.readFile(path, 'utf8');
	const ast = esprima.parseModule(code, {
		range: true,
		comment: true,
		attachComment: true,
		tolerant: true,
	});
	const comments = Array.isArray(ast.comments) ? ast.comments : [];
	const bodyNodes = Array.isArray(ast.body) ? ast.body : [];

	let documentComment = '';
	let parameters = [];

	for (const node of bodyNodes) {
		if (node?.type !== 'ExportNamedDeclaration') {
			continue;
		}

		const decl = node.declaration;
		if (!decl || decl.type !== 'FunctionDeclaration' || !decl.id?.name) {
			continue;
		}

		// 関数の引数を取得
		if (decl.params) {
			parameters = decl.params.map(parameter => {
				if (parameter.type === 'Identifier') {
					return parameter.name;
				}

				// デフォルト値付き引数
				if (parameter.type === 'AssignmentPattern' && parameter.left?.type === 'Identifier') {
					return parameter.left.name;
				}

				return 'input';

				/** 以下は対応しません */

				// オブジェクト分割代入
				// if (parameter.type === 'ObjectPattern') {
				// 	return code.slice(parameter.range[0], parameter.range[1]);
				// }

				// 配列分割代入
				// if (parameter.type === 'ArrayPattern') {
				// 	return code.slice(parameter.range[0], parameter.range[1]);
				// }

				// スプレッド構文
				// if (parameter.type === 'RestElement' && parameter.argument?.type === 'Identifier') {
				// 	// rest parameter
				// 	return `...${parameter.argument.name}`;
				// }

				// return code.slice(parameter.range[0], parameter.range[1]);
			});
		}

		const attachedComments = [
			...(decl.leadingComments ?? []),
			...(node.leadingComments ?? []),
		];

		const attachedDocument = attachedComments
			.filter(comment => comment.type === 'Block')
			.findLast(comment => comment.value.trim().startsWith('*'));

		const leadingComment = attachedDocument ?? comments
			.filter(comment => comment.type === 'Block')
			.filter(comment => comment.range?.[1] <= decl.range[0])
			.filter(comment => {
				const between = code.slice(comment.range[1], decl.range[0]);
				return between.trim() === '';
			})
			.findLast(comment => comment.value.trim().startsWith('*'));

		documentComment = leadingComment
			? code.slice(leadingComment.range[0], leadingComment.range[1])
			: '';

		if (documentComment) {
			break;
		}
	}

	return {
		docComment: documentComment.trim(),
		inputName: parameters[0],
	};
}
