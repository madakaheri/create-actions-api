import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * actions ディレクトリを作成します。
 * @param {string} srcPath
 * @returns {Promise<void>}
 */
export async function ensureActionsDirectory(sourcePath) {
	const actionsPath = path.join(sourcePath, 'actions');
	await fs.mkdir(actionsPath, {recursive: true});
}
