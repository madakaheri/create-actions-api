import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * アセットを src 配下にコピーします。
 * @param {Object} params
 * @param {ActionApiType} params.actionApiType
 * @param {string} params.srcPath
 * @returns {Promise<void>}
 */
export async function copyAssets({actionApiType, srcPath}) {
	const assetsDirectory = new URL(`../assets/${actionApiType}/`, import.meta.url).pathname;
	const assetsEntries = await fs.readdir(assetsDirectory, {withFileTypes: true});
	await Promise.all(assetsEntries.map(entry => {
		const fromPath = path.join(assetsDirectory, entry.name);
		const toPath = path.join(srcPath, entry.name);
		return fs.cp(fromPath, toPath, {recursive: true});
	}));
}
