import fs from 'node:fs/promises';

/**
 * SDK Actions を削除して再生成
 * @param {Object} params
 * @param {string} params.outPath
 * @param {string} params.actionName
 * @param {string} params.code
 * @returns {Promise<void>}
 */
export async function publishSdkAction({outPath, actionName, code}) {
	const directoryPath = `${outPath}/${actionName}`;
	await fs.mkdir(directoryPath, {recursive: true});
	const filePath = `${directoryPath}/index.js`;
	await fs.writeFile(filePath, code, 'utf8');
}
