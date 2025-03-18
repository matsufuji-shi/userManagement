// Expressモジュールをインポートして、ルーター機能を使用可能にする
const express = require('express');

// ユーザー関連のコントローラをインポートする（このファイルは後で追加します。）
const userController = require('../controllers/userController');

// Expressのルーターオブジェクトを作成する
const router = express.Router();

// ユーザーを作成するためのルートを設定する (POSTリクエスト)
router.post('/users', userController.createUser);

// すべてのユーザーを取得するためのルートを設定する (GETリクエスト)
router.get('/users', userController.getUsers);

// 指定されたIDのユーザーを更新するためのルートを設定する (PUTリクエスト)
router.put('/users/:id', userController.updateUser);

// 指定されたIDのユーザーを削除するためのルートを設定する (DELETEリクエスト)
router.delete('/users/:id', userController.deleteUser);

// ログイン機能のルートを設定する (POSTリクエスト)
router.post('/login', userController.loginUser);

// ルーターオブジェクトをエクスポートして、他のモジュールで使用できるようにする
module.exports = router;