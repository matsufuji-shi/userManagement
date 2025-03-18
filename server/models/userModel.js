// データベース接続をインポート
// '../config/db' からインポートした `db` オブジェクトは、MySQLデータベースとの接続を管理する
const db = require('../config/db');

// ユーザーデータベース操作を定義する `User` オブジェクトを作成
// このオブジェクト内に定義されたメソッドを使用して、ユーザーデータの操作を行う
const User = {
    // 新しいユーザーをデータベースに作成するメソッド
    // `data` オブジェクトには、ユーザー名、メールアドレス、ハッシュ化されたパスワードが含まれる
    // `callback` 関数は、SQLクエリが完了した後に実行される
    create: (data, callback) => {
        // ユーザー情報を挿入するための SQL クエリを作成
        // `?` プレースホルダを使用して、後で `db.query()` に渡される値を安全にバインドする
        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

        // `db.query` メソッドを使用して、SQL クエリを実行
        // 第一引数: 実行するクエリ文字列
        // 第二引数: プレースホルダに置き換える値の配列
        // 第三引数: 実行完了後のコールバック関数
        db.query(query, [data.name, data.email, data.password], callback);
    },

    // メールアドレスでユーザーを検索するメソッド
    // `email` は検索対象のユーザーのメールアドレス
    // `callback` 関数には、エラー (`err`) と結果 (`results`) が渡される
    findByEmail: (email, callback) => {
        // 指定されたメールアドレスを条件としてユーザーを取得する SQL クエリ
        const query = `SELECT * FROM users WHERE email = ?`;

        // データベースに対してクエリを実行
        // `results` はクエリの実行結果（検索されたユーザーの配列）
        db.query(query, [email], (err, results) => {
            // エラーが発生した場合、コールバックにエラーを渡し、`null` を返す
            if (err) return callback(err, null);

            // 検索結果が1件以上の場合、`results[0]`（最初のユーザーオブジェクト）をコールバックに渡す
            if (results.length > 0) return callback(null, results[0]);

            // ユーザーが見つからなかった場合、`null` をコールバックに渡す
            return callback(null, null);
        });
    },

    // すべてのユーザーを取得するメソッド
    // `callback` 関数には、エラー (`err`) と全ユーザーのリスト (`users`) が渡される
    findAll: (callback) => {
        // すべてのユーザーを取得する SQL クエリ
        const query = `SELECT * FROM users`;

        // クエリを実行し、取得結果をコールバックに渡す
        db.query(query, callback);
    },

    // ユーザーをIDで更新するメソッド
    // `id` は更新対象のユーザーID
    // `data` には更新するユーザー情報（`name`, `email`, `password`）が含まれる
    updateById: (id, data, callback) => {
        // 指定された ID のユーザー情報を更新する SQL クエリ
        const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;

        // クエリを実行し、結果をコールバック関数に渡す
        db.query(query, [data.name, data.email, data.password, id], callback);
    },

    // ユーザーをIDで削除するメソッド
    // `id` は削除対象のユーザーID
    deleteById: (id, callback) => {
        // 指定された ID のユーザーを削除する SQL クエリ
        const query = `DELETE FROM users WHERE id = ?`;

        // クエリを実行し、結果をコールバック関数に渡す
        db.query(query, [id], callback);
    }
};

// `User` オブジェクトをエクスポートし、他のファイルで使用できるようにする
// `require` によってこのファイルをインポートした際に、`User` オブジェクトが返される
module.exports = User;