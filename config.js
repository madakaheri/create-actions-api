/**
 * @type {ActionApiType}
 */
export const actionApiType = 'aws-lambda';

/**
 * SDKビルド設定
 * @type {{srcPath: string, outPath: string, rootPath: string}}
 */
export const sdkConfig = {
	rootPath: new URL('test-repo/sdk', import.meta.url).pathname,
	srcPath: new URL('test-repo/api/src/actions', import.meta.url).pathname,
	outPath: new URL('test-repo/sdk/src/actions', import.meta.url).pathname,
};
