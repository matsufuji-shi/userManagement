// ページのコンテンツが完全に読み込まれたときに実行されるイベント
// `DOMContentLoaded` は、HTML が完全に読み込まれ、解析されたときに発生するイベント
document.addEventListener('DOMContentLoaded', () => {
  // 現在のページの URL からクエリパラメータ (`?id=123` のような形式) を取得し、`id` の値を抜き出す
  const userId = new URLSearchParams(window.location.search).get('id');

  // サーバーに対して、すべてのユーザーを取得するための `GET` リクエストを送信
  axios.get(`http://localhost:3000/api/users`)
      .then(response => {
          // 取得したすべてのユーザー情報 (`response.data` はユーザーリストの配列) から、指定された ID のユーザーを検索する
          const user = response.data.find(user => user.id == userId); // `user.id` と `userId` が一致するユーザーを検索

          // ユーザーが見つかった場合
          if (user) {
              // 該当するユーザー情報をフォームの各入力フィールドに設定する
              document.getElementById('userId').value = user.id;           // ユーザー ID を設定
              document.getElementById('updateName').value = user.name;     // ユーザー名を設定
              document.getElementById('updateEmail').value = user.email;   // メールアドレスを設定
          } else {
              // ユーザーが見つからなかった場合は、アラートを表示し、エラーメッセージを出力
              alert('User not found');
          }
      })
      .catch(error => console.error('Error:', error));  // ユーザー情報の取得中にエラーが発生した場合、エラーメッセージをコンソールに出力

  // ユーザー更新フォーム (`updateUserForm`) の `submit` イベントにリスナーを設定し、`updateUser` 関数を実行
  document.getElementById('updateUserForm').addEventListener('submit', updateUser);
});

// ユーザー情報を更新するための関数
// フォームが送信されたときに呼び出される
function updateUser(e) {
  // フォームのデフォルトの送信動作（ページのリロード）を防止
  e.preventDefault();

  // 各入力フィールドからユーザー情報を取得
  const id = document.getElementById('userId').value;                // ユーザー ID
  const name = document.getElementById('updateName').value;          // ユーザー名
  const email = document.getElementById('updateEmail').value;        // メールアドレス
  const password = document.getElementById('updatePassword').value;  // 新しいパスワード

  // `axios` を使用して、指定された ID のユーザー情報を更新する
  // `PUT` リクエストを送信し、サーバー上のデータを新しい値で上書きする
  axios.put(`http://localhost:3000/api/users/${id}`, {
      name: name,           // 更新するユーザー名
      email: email,         // 更新するメールアドレス
      password: password    // 更新するパスワード
  })
  .then(response => {
      // サーバーからのレスポンスを受け取り、更新が成功したことを示すメッセージを表示
      alert(response.data.message);

      // ユーザーの情報が更新された後、`index.html`（ユーザー一覧ページ）にリダイレクトする
      window.location.href = 'index.html';
  })
  .catch(error => {
      // ユーザー情報の更新中にエラーが発生した場合、エラーメッセージをコンソールに出力
      console.error('Error:', error);
  });
}