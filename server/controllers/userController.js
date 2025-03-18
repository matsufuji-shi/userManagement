// 'bcrypt' モジュールをインポートして、パスワードのハッシュ化や認証の機能を使用する
const bcrypt = require('bcrypt');

// 'User' モデルをインポートして、データベース操作を行う
// このモデルを通じてユーザー情報の作成、読み取り、更新、削除 (CRUD) 操作を実行する
const User = require('../models/userModel');

// 新しいユーザーを作成する関数
// req: クライアントから送られてきたリクエストオブジェクト
// res: サーバーからクライアントに返すレスポンスオブジェクト
exports.createUser = (req, res) => {
    // リクエストボディからユーザー名、メールアドレス、パスワードを取得
    const { name, email, password } = req.body;

    // パスワードをハッシュ化する処理
    // bcrypt.hash(プレーンテキストパスワード, ソルトのラウンド数, コールバック関数)
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        // ハッシュ化中にエラーが発生した場合のエラーハンドリング
        if (err) return res.status(500).json({ error: err });

        // ハッシュ化されたパスワードを用いて、新しいユーザー情報をデータベースに保存する
        User.create({ name, email, password: hashedPassword }, (err, result) => {
            // データベース操作中にエラーが発生した場合のエラーハンドリング
            if (err) return res.status(500).json({ error: err });

            // 正常にユーザーが作成された場合のレスポンス
            res.status(201).json({ message: 'User created successfully!' });
        });
    });
};

// すべてのユーザーを取得する関数
exports.getUsers = (req, res) => {
    // Userモデルを使用してすべてのユーザーを取得する
    User.findAll((err, users) => {
        // データベース操作中にエラーが発生した場合のエラーハンドリング
        if (err) return res.status(500).json({ error: err });

        // 正常にユーザーが取得できた場合、JSON形式でユーザー情報を返す
        res.status(200).json(users);
    });
};

// 既存のユーザー情報を更新する関数
exports.updateUser = (req, res) => {
    // URLパラメータからユーザーIDを取得
    const { id } = req.params;

    // リクエストボディから更新するユーザー名、メールアドレス、パスワードを取得
    const { name, email, password } = req.body;

    // 新しいパスワードをハッシュ化する
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        // ハッシュ化中にエラーが発生した場合のエラーハンドリング
        if (err) return res.status(500).json({ error: err });

        // 指定されたIDのユーザー情報を更新する
        // updateById(ユーザーID, 更新するフィールド, コールバック関数)
        User.updateById(id, { name, email, password: hashedPassword }, (err, result) => {
            // データベース操作中にエラーが発生した場合のエラーハンドリング
            if (err) return res.status(500).json({ error: err });

            // 正常にユーザー情報が更新された場合のレスポンス
            res.status(200).json({ message: 'User updated successfully!' });
        });
    });
};

// 指定されたIDのユーザーを削除する関数
exports.deleteUser = (req, res) => {
    // URLパラメータからユーザーIDを取得
    const { id } = req.params;

    // Userモデルを使用して、指定されたIDのユーザーを削除する
    User.deleteById(id, (err, result) => {
        // データベース操作中にエラーが発生した場合のエラーハンドリング
        if (err) return res.status(500).json({ error: err });

        // 正常にユーザーが削除された場合のレスポンス
        res.status(200).json({ message: 'User deleted successfully!' });
    });
};

// ユーザーのログイン処理を行う関数
exports.loginUser = (req, res) => {
    // リクエストボディからメールアドレスとパスワードを取得
    const { email, password } = req.body;

    // データベースからメールアドレスを元にユーザー情報を検索する
    User.findByEmail(email, (err, user) => {
        // データベース操作中にエラーが発生した場合のエラーハンドリング
        if (err) return res.status(500).json({ error: 'Database error' });

        // 該当するユーザーが見つからない場合
        if (!user) return res.status(404).json({ error: 'User not found' });

        // 入力されたパスワードと、データベースに保存されているハッシュ化されたパスワードを比較
        bcrypt.compare(password, user.password, (err, isMatch) => {
            // パスワード比較中にエラーが発生した場合のエラーハンドリング
            if (err) return res.status(500).json({ error: 'Error comparing passwords' });

            // パスワードが一致しない場合
            if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

            // パスワードが一致する場合のレスポンス（ログイン成功）
            res.status(200).json({ message: 'Login successful' });
        });
    });
};