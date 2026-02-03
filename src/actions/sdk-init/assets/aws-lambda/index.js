import {configure} from './utils/configure.js';
import * as actions from './actions/index.js';

export const api = {
	configure,
	...actions,
};
