import path from 'node:path';
import {ensureEmptyRoot} from './steps/ensure-empty-root.js';
import {makeSrcDirectory} from './steps/make-src-directory.js';
import {copyAssets} from './steps/copy-assets.js';
import {ensureActionsDirectory} from './steps/ensure-actions-directory.js';

/**
 * SDKディレクトリを生成します。
 * @param {Object} params
 * @param {ActionApiType} params.actionApiType
 * @param {string} params.rootPath
 * @returns {Promise<void>}
 */
export async function sdkInit({actionApiType, rootPath}) {
	await ensureEmptyRoot(rootPath);

	const srcPath = path.join(rootPath, 'src');
	await makeSrcDirectory(srcPath);
	await copyAssets({actionApiType, srcPath});
	await ensureActionsDirectory(srcPath);
}
