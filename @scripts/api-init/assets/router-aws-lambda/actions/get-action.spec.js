import fs from 'node:fs/promises';
import test from 'ava';
import {getAction} from './get-action.js';

const authActionNames = await fs.readdir(new URL('../actions/auth', import.meta.url));
const unauthActionNames = await fs.readdir(new URL('../actions/unauth', import.meta.url));

test('getAction', async t => {
	const errorActionMap = {};

	for (const actionName of authActionNames) {
		try {
			// eslint-disable-next-line no-await-in-loop
			await getAction({path: `/v2/auth/${actionName}`});
		} catch (error) {
			errorActionMap[actionName] = error.message;
		}
	}

	for (const actionName of unauthActionNames) {
		try {
			// eslint-disable-next-line no-await-in-loop
			await getAction({path: `/v2/unauth/${actionName}`});
		} catch (error) {
			errorActionMap[actionName] = error.message;
		}
	}

	t.log(errorActionMap);
	t.true(Object.keys(errorActionMap).length === 0, 'All actions should be imported without errors');
});
