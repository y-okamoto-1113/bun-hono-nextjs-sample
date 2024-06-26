import { createMiddleware } from "hono/factory";
import { v4 as uuidv4 } from "uuid";

// カスタムロガー
type Env = {
  Variables: {
    requestId: string;
  };
};
export const customLogger = createMiddleware<Env>(async (c, next) => {
  const startTime = Date.now();
  const requestId = uuidv4();
  const { method, url } = c.req;

  // リクエストIDをコンテキストに保存
  c.set("requestId", requestId);

  console.log(
    `[${new Date().toISOString()}] [Request] [${requestId}] ${method} ${url}`,
  );

  const headers = c.req.header();
  if (headers) {
    console.log(
      `[${new Date().toISOString()}] [Request Headers] [${requestId}] ${JSON.stringify(
        headers,
        null,
        4,
      )}`,
    );
  }

  const body = await c.req.text();
  if (body) {
    console.log(
      `[${new Date().toISOString()}] [Request Body] [${requestId}] ${JSON.stringify(body, null, 4)}`,
    );
  }

  await next();

  const statusCode = c.res.status;
  const endTime = Date.now();
  const duration = endTime - startTime;

  // レスポンスログの出力
  console.log(
    `[${new Date().toISOString()}] [Response] [${requestId}] ${statusCode} ${duration}ms`,
  );

  const responseHeaders = c.res.headers;
  if (responseHeaders) {
    console.log(
      `[${new Date().toISOString()}] [Response Headers] [${requestId}] ${JSON.stringify(responseHeaders, null, 4)}`,
    );
  }

  // キャッシュレスポンスボディ
  const responseBody = c.res.body;
  if (responseBody) {
    // レスポンスをログ出力するために一時的に読み取り
    const responseText = await new Response(responseBody).text();
    console.log(
      `[${new Date().toISOString()}] [Response Body] [${requestId}] ${responseText}`,
    );
    // レスポンスボディを再設定
    c.res = new Response(responseText, {
      status: c.res.status,
      headers: c.res.headers,
    });
  }
});
