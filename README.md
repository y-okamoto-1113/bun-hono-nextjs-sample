# bun-hono-nextjs

## Biome は現在、ルートディレクトリでしか使えない

Frontend, Backend でディレクトリ毎に Biome を設定したくても現状無理。
<https://github.com/biomejs/biome-vscode/issues/251>

## 環境構築

DB セットアップ

TS で定義した DB スキーマが`backend/db/schema/`配下に存在する。
このスキーマアイルからマイグレーションファイルを生成する。

```bash
cd / # プロジェクトルートに移動
bun install
bun drizzle-kit generate
```

実際にマイグレーションされる SQL スクリプトはルートディレクトリの`/drizzle/`配下に生成される。
それを`/migrate.ts`で実行する

```bash
cd / # プロジェクトルートに移動
bun migrate.ts
```

DB の状態を Drizzle Studio で確認する

```bash
bunx drizzle-kit studio
```
