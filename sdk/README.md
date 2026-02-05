# Actions API SDK

このディレクトリには、Actions API のクライアント SDK が含まれています。

## 構造

```
sdk/
├── src/
│   ├── index.js           # SDK エクスポート
│   ├── actions/           # アクションクライアント
│   │   ├── index.js       # アクションのエクスポート
│   │   └── hello.js       # サンプルアクション
│   └── utils/             # ユーティリティ
│       └── api.js         # API コネクター
└── package.json
```

## 使い方

### 1. 依存関係のインストール

```bash
cd sdk
npm install
npm install aws-amplify
```

### 2. AWS Amplify の設定

```javascript
import {Amplify} from 'aws-amplify';

Amplify.configure({
    API: {
        REST: {
            ActionApi: {
                endpoint: 'https://your-api-endpoint.amazonaws.com',
                region: 'ap-northeast-1'
            }
        }
    }
});
```

### 3. SDK の使用

```javascript
import {hello} from 'actions-api-sdk';

const result = await hello({name: 'World'});
console.log(result.message); // "Hello, World!"
```

## API アクションとの同期

API 側で新しいアクションを追加した場合、SDK 側でも対応するクライアント関数を作成する必要があります。

例：API に `getUser` アクションを追加した場合：

```javascript
// sdk/src/actions/get-user.js
import {api} from '../utils/api.js';

/**
 * ユーザー情報を取得する
 * @param {Object} input
 * @param {string} input.userId - ユーザーID
 * @returns {Promise<Object>}
 */
export async function getUser(input) {
    return api.post({
        action: 'get-user',
        payload: input,
    });
}
```

```javascript
// sdk/src/actions/index.js
export {hello} from './hello.js';
export {getUser} from './get-user.js';
```

## ライセンス

ISC
