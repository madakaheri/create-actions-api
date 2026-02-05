import fs from 'node:fs/promises';
import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';

/**
 * SDKコードを生成します。
 * @param {Object} options
 * @param {string} options.actionName
 * @param {string} [options.docComment] default: ''
 * @param {string} [options.inputName] default: ''
 * @returns {Promise<string>}
 */
export async function makeSdkCode({
	actionName,
	docComment: documentComment = '',
	inputName = '',
}) {
	if (!actionName) {
		throw new Error('actionName is required');
	}

	const stub = await fs.readFile(new URL('../stubs/sdk-action.stub', import.meta.url), 'utf8');

	documentComment &&= '\n' + documentComment;

	const T_DOC_COMMENT = documentComment;
	const T_INPUT = inputName;
	const T_INPUT_OR_NULL = inputName || 'null';
	const T_ACTION_KEBAB = kebabCase(actionName);
	const T_ACTION_CAMEL = camelCase(actionName);
	const code = stub
		.replaceAll('T_DOC_COMMENT', T_DOC_COMMENT)
		.replaceAll('T_INPUT_OR_NULL', T_INPUT_OR_NULL)
		.replaceAll('T_INPUT', T_INPUT)
		.replaceAll('T_ACTION_KEBAB', T_ACTION_KEBAB)
		.replaceAll('T_ACTION_CAMEL', T_ACTION_CAMEL);

	return code;
}
