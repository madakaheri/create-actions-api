import fs from 'node:fs/promises';

/**
 * SDK Actions ディレクトリを削除して再生成
 * @param {string} outPath
 * @returns {Promise<void>}
 */
export async function clearSdkActions(outPath) {
	await fs.rm(`${outPath}`, {recursive: true}).catch(() => {}); // eslint-disable-line promise/prefer-await-to-then
	await fs.mkdir(`${outPath}`, {recursive: true});
}
