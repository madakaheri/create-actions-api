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

API 側で新しいアクションを追加・変更した場合は、リポジトリルートで次のコマンドを実行すると SDK が自動生成されます（手動編集は不要です）。

```bash
npm run sdk:update
```

## ライセンス

ISC
