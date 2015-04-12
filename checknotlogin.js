var un = localStorage.getItem('un');
var pw = localStorage.getItem('pw');
if(!un || !pw) //未登录
    location.href = './login.html';