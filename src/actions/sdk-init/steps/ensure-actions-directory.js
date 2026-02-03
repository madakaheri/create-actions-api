import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * actions ディレクトリを作成します。
 * @param {string} srcPath
 * @returns {Promise<void>}
 */
export async function ensureActionsDirectory(srcPath) {
	const actionsPath = path.join(srcPath, 'actions');
	await fs.mkdir(actionsPath, {recursive: true});
}
