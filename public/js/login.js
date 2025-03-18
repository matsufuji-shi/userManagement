// ログインフォームの送信イベントにリスナーを追加し、フォームの送信時に関数を実行
document.getElementById('loginForm').addEventListener('submit', function (e) {
  // フォームのデフォルトの送信動作を防止する（ページリロードを防ぐ）
  e.preventDefault();

  // メールアドレスとパスワードの入力値を取得
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // axiosを使って、ログインAPIにPOSTリクエストを送信
  axios.post('http://localhost:3000/api/login', {
      email: email,  // 入力されたメールアドレスを送信
      password: password  // 入力されたパスワードを送信
  })
  .then(response => {
      // ログイン成功時、サーバーからのメッセージをアラートで表示
      alert(response.data.message);
      // ログイン成功後、ホームページ（index.html）にリダイレクト
      window.location.href = 'index.html';
  })
  .catch(error => {
    // エラーが発生した場合、エラーメッセージをコンソールに出力
    console.error('Error:', error);
    if (error.response) {
        // サーバーからのエラーレスポンスがある場合、その内容をコンソールにログ出力
        console.log('Error response:', error.response);  // 追加のログ
        // エラーメッセージを画面に表示
        document.getElementById('errorMessage').textContent = error.response.data.error || 'An error occurred';
    } else {
        // サーバーからのエラーレスポンスがない場合の一般的なエラーメッセージを表示
        document.getElementById('errorMessage').textContent = 'An error occurred';
    }
  });
});