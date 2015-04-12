var un = localStorage.getItem('un');
var pw = localStorage.getItem('pw');
if(un && pw) //已登录
    location.href = './list.html';