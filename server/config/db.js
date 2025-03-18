// 'mysql2' モジュールをインポートし、MySQLデータベースに接続するための機能を使用
const mysql = require('mysql2');

// MySQL データベースへの接続設定を行う
// `mysql.createConnection()` 関数はデータベースとの接続オブジェクトを生成する
// 接続設定には以下のオプションを使用:
// - host: データベースサーバーのホスト名 (例: localhost またはリモートサーバーの IP アドレス)
// - user: データベース接続に使用するユーザー名
// - password: データベース接続に使用するパスワード
// - database: 接続先のデータベース名
// これらの値は `process.env` を使って、環境変数から取得する
// 環境変数は、アプリケーションが動作する環境（開発環境、本番環境など）ごとに異なる設定を持つことができる
const connection = mysql.createConnection({
    host: 'localhost',         // データベースサーバーのホスト名 (例: 'localhost')
    user: 'root',         // データベースユーザー名 (例: 'root')
    password: 'rootroot', // データベース接続に使用するパスワード (例: 'password123')
    database: 'userlist'      // 使用するデータベース名 (例: 'user_database')
});

// データベース接続を確立する
// connection.connect() メソッドを使用して、指定した接続設定でMySQLに接続を試みる
// 引数にはコールバック関数を指定し、接続が成功した場合とエラーが発生した場合の処理を定義する
connection.connect((err) => {
    // 接続エラーが発生した場合の処理
    if (err) {
        // エラー内容をコンソールに出力する
        console.error('Error connecting to MySQL database:', err);

        // `return` を使用して、処理をここで中断する（以降のコードが実行されないようにする）
        return;
    }

    // 接続が成功した場合、コンソールに接続成功のメッセージを表示
    console.log('Connected to MySQL database.');
});

// `connection` オブジェクトをエクスポートして、他のファイルでこの接続を使用できるようにする
// `module.exports` は、このファイルを `require` した際に返される値を指定する
// これにより、他のファイルで `require('./config/db')` とすることで、接続オブジェクトを取得し、
// データベースとの通信を行うことができるようになる
module.exports = connection;