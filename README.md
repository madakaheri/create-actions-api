# create-actions-api

このリポジトリは **Actions API** を構成するためのテンプレートリポジトリです。

## Actions API って何？

Actions API について詳しくは以下のリンクを参照して下さい。

- [ActionsAPI実装規約](https://raw.githubusercontent.com/madakaheri/steerings/refs/heads/main/node/ActionsAPI%E5%AE%9F%E8%A3%85%E8%A6%8F%E7%B4%84.md)

## 使い方

### 1. テンプレートから新しいリポジトリを作成

GitHub でこのリポジトリを開き、「Use this template」ボタンをクリックして新しいリポジトリを作成します。

### 2. リポジトリをクローン

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 3. 依存関係のインストール

```bash
# API側
cd api
npm install

# SDK側
cd ../sdk
npm install
```

## ディレクトリ構造

```
.
├── api/              # バックエンド API
│   ├── src/
│   │   ├── index.js      # Lambda ハンドラー
│   │   ├── actions/      # アクション実装
│   │   └── utils/        # ユーティリティ
│   ├── package.json
│   └── README.md
│
└── sdk/              # クライアント SDK
    ├── src/
    │   ├── index.js      # SDK エクスポート
    │   ├── actions/      # アクションクライアント
    │   └── utils/        # ユーティリティ
    ├── package.json
    └── README.md
```

詳細は各ディレクトリの README.md を参照してください。

## 開発の流れ

1. `api/src/actions/` に新しいアクションを実装
2. `sdk/src/actions/` に対応するクライアント関数を作成
3. 両方を `index.js` でエクスポート

## ライセンス

ISC
