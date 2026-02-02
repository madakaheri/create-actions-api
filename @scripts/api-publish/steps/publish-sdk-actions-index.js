import fs from 'node:fs/promises';

/**
 * SDK Actions Index を生成
 * @param {Object} params
 * @param {string} params.outPath
 * @param {string[]} params.actionNames
 * @returns {Promise<void>}
 */
export async function publishSdkActionsIndex({outPath, actionNames}) {
	// eslint-disable-next-line arrow-body-style
	const sdkActionIndexLines = actionNames.map(actionName => {
		return `export * from './${actionName}/index.js';`;
	});
	const sdkActionIndexCode = sdkActionIndexLines.join('\n') + '\n';
	await fs.writeFile(`${outPath}/index.js`, sdkActionIndexCode, 'utf8');
}
