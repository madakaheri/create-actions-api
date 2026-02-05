# Actions API

このディレクトリには、Actions API のバックエンド実装が含まれています。

## 構造

```
api/
├── src/
│   ├── index.js           # Lambda ハンドラー
│   ├── actions/           # アクション実装
│   │   ├── index.js       # アクションのエクスポート
│   │   └── hello/         # サンプルアクション (ディレクトリ構造)
│   │       ├── index.js   # アクションのメイン処理
│   │       └── steps/     # 実行ステップ
│   │           ├── validate-input.js
│   │           └── create-message.js
│   └── utils/             # ユーティリティ
│       ├── auth.js        # 認証処理
│       └── router/        # ルーティング処理
└── package.json
```

## 使い方

### 1. 依存関係のインストール

```bash
cd api
npm install
```

### 2. 新しいアクションの追加

**重要**: 各アクションはディレクトリとして作成し、実行ステップを `steps/` ディレクトリ内に記述します。

1. `src/actions/` に新しいアクションディレクトリを作成
2. `{actionName}/index.js` にメイン処理を記述
3. `{actionName}/steps/` に各実行ステップを記述
4. `src/actions/index.js` でエクスポート

例：

```javascript
// src/actions/get-user/steps/validate-user-id.js
/**
 * ユーザーIDを検証する
 * @param {string} userId - ユーザーID
 * @throws {Error} ユーザーIDが無効な場合
 */
export function validateUserId(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID');
    }
}

// src/actions/get-user/steps/fetch-user.js
/**
 * ユーザー情報を取得する
 * @param {string} userId - ユーザーID
 * @returns {Promise<Object>} ユーザー情報
 */
export async function fetchUser(userId) {
    // データベースからユーザー情報を取得
    return {
        userId,
        name: 'Example User'
    };
}

// src/actions/get-user/index.js
import {validateUserId} from './steps/validate-user-id.js';
import {fetchUser} from './steps/fetch-user.js';

/**
 * ユーザー情報を取得する
 * @param {Object} input
 * @param {string} input.userId - ユーザーID
 * @returns {Promise<Object>}
 */
export async function getUser(input) {
    // ステップ1: ユーザーIDを検証
    validateUserId(input.userId);
    
    // ステップ2: ユーザー情報を取得
    const user = await fetchUser(input.userId);
    
    // ステップ3: 結果を返す
    return user;
}
```javascript
// src/actions/index.js
export {hello} from './hello/index.js';
export {getUser} from './get-user/index.js';
```

**注意**: SDK 側のコードは API から自動生成されるため、手動で編集する必要はありません。

### 3. デプロイ

AWS Lambda や API Gateway を使用してデプロイします。

## ライセンス

ISC
