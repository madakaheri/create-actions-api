import path from 'node:path';
import {ensureEmptyRoot} from './steps/ensure-empty-root.js';
import {makeSrcDirectory} from './steps/make-src-directory.js';
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

	const srcPath = path.join(rootPath, 'src');
	await makeSrcDirectory(srcPath);
	await copyTemplate({actionApiType, srcPath});
	await ensureActionsDirectory(srcPath);
}
