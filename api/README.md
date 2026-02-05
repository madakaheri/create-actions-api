# Actions API

このディレクトリには、Actions API のバックエンド実装が含まれています。

## 構造

```
api/
├── src/
│   ├── index.js           # Lambda ハンドラー
│   ├── actions/           # アクション実装
│   │   ├── index.js       # アクションのエクスポート
│   │   └── hello.js       # サンプルアクション
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

1. `src/actions/` に新しいアクションファイルを作成
2. `src/actions/index.js` でエクスポート

例：

```javascript
// src/actions/get-user.js
/**
 * ユーザー情報を取得する
 * @param {Object} input
 * @param {string} input.userId - ユーザーID
 * @returns {Promise<Object>}
 */
export async function getUser(input) {
    // アクションの実装
    return {
        userId: input.userId,
        name: 'Example User'
    };
}
```

```javascript
// src/actions/index.js
export {hello} from './hello.js';
export {getUser} from './get-user.js';
```

### 3. デプロイ

AWS Lambda や API Gateway を使用してデプロイします。

## ライセンス

ISC
