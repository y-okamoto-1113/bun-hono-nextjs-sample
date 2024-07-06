import { Hono } from "hono";
import type { RouterRoute } from "hono/types";

type RouteInfo = {
  method: string;
  path: string;
};

// ルーティングを外部ファイルからも追加できる様にする為の関数
//
// @note ルーティング一覧を確認する処理が長いのでファイルを分割したかった。
// しかし、ルーティングは`new Hono()`した`app`インスタンスに紐づくのでファイルを分けたら大元のappインスタンスの中身が見れない。
// そのため、大元の`app.routes`を取得して、こっちのファイルにデータを無理やり突っ込める様にするためにこの変数と関数を定義した。
const externalRoutes: RouterRoute[] = [];
export const addRoutes = (routes: RouterRoute[]) => {
  externalRoutes.push(...routes);
};

// ルーティング一覧をHTMLテーブル形式で取得するエンドポイント
export const routesRoute = new Hono().get("/routes", (c) => {
  const allRoutes = [...routesRoute.routes, ...externalRoutes].map(
    (route) =>
      ({
        method: route.method,
        path: route.path,
      }) as RouteInfo,
  );

  const table = createTable(allRoutes);
  return c.html(table);
});

// HTMLテーブル形式の文字列を生成する関数
function createTable(routes: RouteInfo[]) {
  let table = `
    <table border="1">
      <thead>
        <tr>
          <th>Method</th>
          <th>Path</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (const route of routes) {
    table += `
      <tr>
        <td>${route.method}</td>
        <td>${route.path}</td>
      </tr>
    `;
  }

  table += `
      </tbody>
    </table>
  `;

  return table;
}
