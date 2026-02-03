import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * テンプレートを src 配下にコピーします。
 * @param {Object} params
 * @param {ActionApiType} params.actionApiType
 * @param {string} params.srcPath
 * @returns {Promise<void>}
 */
export async function copyTemplate({actionApiType, srcPath}) {
	const templateDirectory = new URL(`../templates/${actionApiType}/`, import.meta.url).pathname;
	const templateEntries = await fs.readdir(templateDirectory, {withFileTypes: true});
	await Promise.all(templateEntries.map(entry => {
		const fromPath = path.join(templateDirectory, entry.name);
		const toPath = path.join(srcPath, entry.name);
		return fs.cp(fromPath, toPath, {recursive: true});
	}));
}
