// 環境変数を使用するための設定
// `dotenv` パッケージを使用して `.env` ファイル内の環境変数を読み込み、`process.env` オブジェクトに追加する
require('dotenv').config();

// `express` フレームワークをインポート
// Express は、Node.js のためのシンプルで強力なウェブアプリケーションフレームワーク
const express = require('express');

// `cors` パッケージをインポート
// CORS（Cross-Origin Resource Sharing）を有効にし、異なるオリジン間のリクエストを許可する
const cors = require('cors');

// ユーザールートのモジュールをインポート
// `./routes/userRoutes` にはユーザー関連の API エンドポイントが定義されている
const userRoutes = require('./routes/userRoutes');

// `express` アプリケーションを作成
// `app` オブジェクトはサーバーの設定とエンドポイントの定義を管理する
const app = express();

// 使用するポートを設定
// 環境変数 `process.env.PORT` が設定されていない場合、デフォルトでポート 3000 を使用する
const PORT = process.env.PORT || 3000;

// `cors` ミドルウェアをアプリケーションで使用
// これにより、異なるオリジン（ドメイン、ポート）からのリクエストを許可し、API を外部から使用できるようにする
app.use(cors());

// `express.json()` ミドルウェアを使用して、リクエストボディを JSON 形式でパースする
// クライアントから送られてくるデータを JSON として扱うため、`req.body` にアクセスできるようになる
app.use(express.json());

// ルートを設定
// すべての `/api` から始まるリクエストに対して、`userRoutes` で定義されたルートを適用する
// 例: `/api/users` のリクエストは、`userRoutes` モジュールで処理される
app.use('/api', userRoutes);

// サーバーのルートエンドポイントを定義
// `GET /` リクエストに対して、シンプルなメッセージをレスポンスとして返す
app.get('/', (req, res) => {
    // クライアントに「Server is running」のメッセージを返す
    res.send('Server is running');
});

// サーバーを指定したポートで起動する
// `app.listen` は、指定されたポートでサーバーを開始し、クライアントからのリクエストを待ち受ける
app.listen(PORT, () => {
  // サーバー起動時に、どのポートでサーバーが動作しているかをコンソールに出力
  console.log(`Server is running on http://localhost:${PORT}`);
});

//クライアントから受け取った検索情報を取得
//テーブル内の情報と比較しSQLクエリの実行
app.get('/users/search',(req,res) => {
  const query = req.query.query;  //入力値の値のみ取得する
if(!query){  
  return res.status(400).send({error:"検索条件が必要です"}); //queryが空、存在しない場合400とエラーメッセージを返す
}
//データベースから検索条件に一致するユーザー情報を習得するためのSQLクエリを準備
const sql = `SELECT * FROM user WHERE name LIKE ? OR email LIKE ?`;  //テーブルのユーザーとemailの内容をsqlへ入れている
const values = [`%{query}`,`%${query}`];  //入力値の値に該当する値を取得している

//データベースから検索結果を取得しクライアントに返す
db.query(sql,values,(err,results) => {
  if (err) {
    return res.status(500).sent(err);
  }
  res.json(results);
});
});

