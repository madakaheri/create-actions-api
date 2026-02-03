import {searchActionNames} from './steps/search-action-names.js';
import {clearSdkActions} from './steps/clear-sdk-actions.js';
import {extractFunctionParts} from './steps/extract-function-parts.js';
import {makeSdkCode} from './steps/make-sdk-code.js';
import {publishSdkAction} from './steps/publish-sdk-action.js';
import {publishSdkActionsIndex} from './steps/publish-sdk-actions-index.js';

/**
 * API Actions から SDK Actions を生成して既存の SDK Actions を更新します。
 * @param {Object} params
 * @param {string} params.srcPath
 * @param {string} params.outPath
 * @returns {Promise<void>}
 */
export async function sdkUpdate({srcPath, outPath}) {
	// API Actions 群を解析して SDK Actions コードを生成
	const actionNames = await searchActionNames(srcPath);
	await clearSdkActions(outPath);
	for (const actionName of actionNames) {
		// eslint-disable-next-line no-await-in-loop
		const {docComment, inputName} = await extractFunctionParts({
			srcPath,
			actionName,
		});
		// eslint-disable-next-line no-await-in-loop
		const code = await makeSdkCode({
			docComment,
			actionName,
			inputName,
		});
		// eslint-disable-next-line no-await-in-loop
		await publishSdkAction({
			outPath,
			actionName,
			code,
		});

		console.info(`  - ${actionName}`);
	}

	await publishSdkActionsIndex({
		outPath,
		actionNames,
	});

	console.info('\n✅ SDK Actions have been updated successfully!\n');
}
