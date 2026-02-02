import {makeDirectories} from './steps/make-directories.js';
import {makeUtils} from './steps/make-utils.js';

/**
 * APIディレクトリを生成します。
 * @param {Object} params
 * @param {ActionApiType} params.actionApiType
 * @param {string} params.rootPath
 * @returns {Promise<void>}
 */
export async function apiInit({actionApiType, rootPath}) {
	await makeDirectories(rootPath);
	await makeUtils({type: actionApiType, rootPath});
}
