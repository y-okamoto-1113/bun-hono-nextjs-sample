# bun-hono-nextjs

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Need to know

- ~~Zod~~
- ~~Zod Validator~~
- settings.json
- Hono Stack
- TailwindCSS
- css, postcss
- shadcn
- vite
- bun
- AWS Lambda へのデプロイ方法
- TanStack Query
- Drizzle ORM
- Arc
- WebSocket
- Stream、チャット、動画のストリーム配信
- husky
-

## DrizzleORM の SQL 実行時間確認方法

現在、SQL 実行時間が実装されていない。パッケージに無理やり実装するしかない。
以下ファイルの `execute` メソッドに以下のコードを追加する。
`backend/node_modules/drizzle-orm/pg-core/query-builders/select.js`

```js
execute = (placeholderValues) => {
  return tracer.startActiveSpan('drizzle.operation', () => {
    const start = performance.now();
    const res = this._prepare().execute(placeholderValues);
    const end = performance.now();
    const duration = end - start;
    console.log(`aaaaExecution time: ${duration.toFixed(2)} ms`);
    return res;
  });
};
```
