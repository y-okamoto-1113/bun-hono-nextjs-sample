import { Hono } from "hono";

export const errorHandlingRoute = new Hono()
  // 定義していないいルーティングページにアクセスが来た際は、ここを通る。
  .notFound(async (c) => {
    return c.text("Custom 404 Message. 定義していないルーティングです。", 404);
  })
  // システムエラーをキャッチし、全てここを通る。
  .onError(async (err, c) => {
    console.error("システムエラー発生。エラーメッセージは以下。");
    console.error(err);
    return c.json({ message: "システムエラーです。" }, 500);
  })
  // @note 以下はエラーハンドリングの動作確認用ルーティング
  .get("/404", (c) => {
    return c.json({ message: "404エラーを返すルーティングです。" }, 404);
  })
  .get("/500", () => {
    throw new Error("システムエラーを起こすルーティングです。");
  });
