import path from 'node:path';
import {fileURLToPath} from 'node:url';

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));

/**
 * Repository configuration for generation scripts.
 * actionApiType is reserved for future API generation options.
 */
export const config = {
	actionApiType: 'aws-rest',
	apiPath: path.join(rootDirectory, 'api'),
	sdkConfig: {
		rootPath: path.join(rootDirectory, 'sdk'),
		srcPath: path.join(rootDirectory, 'api/src/actions'),
		outPath: path.join(rootDirectory, 'sdk/src/actions'),
	},
};

export default config;
