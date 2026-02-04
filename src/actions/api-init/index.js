import path from 'node:path';
import {ensureEmptyRoot} from './steps/ensure-empty-root.js';
import {makeSourceDirectory} from './steps/make-src-directory.js';
import {copyTemplate} from './steps/copy-template.js';
import {ensureActionsDirectory} from './steps/ensure-actions-directory.js';

/**
 * APIディレクトリを生成します。
 * @param {Object} params
 * @param {ActionApiType} params.actionApiType
 * @param {string} params.rootPath
 * @returns {Promise<void>}
 */
export async function apiInit({actionApiType, rootPath}) {
	await ensureEmptyRoot(rootPath);

	const sourcePath = path.join(rootPath, 'src');
	await makeSourceDirectory(sourcePath);
	await copyTemplate({actionApiType, srcPath: sourcePath});
	await ensureActionsDirectory(sourcePath);
}
