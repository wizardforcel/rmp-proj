$(function()
{
    
    var isLogin = function()
    {
      return localStorage['un'] &&
             localStorage['pw'];
    };
    
    if(isLogin())
    {
      $('.navbar-toggle').append($('<span class="icon-bar"></span>'));
      $('.navbar-toggle').append($('<span class="icon-bar"></span>'));
      $('.navbar-toggle').append($('<span class="icon-bar"></span>'));
      $('.navbar-nav').append('<li><a href="./list.html">论文</a></li>');
      $('.navbar-nav').append('<li><a href="./upload.html">上传</a></li>');
      $('.navbar-nav').append('<li><a href="./logout.html">退出</a></li>');
    }
    else
    {
      $('.navbar-toggle').append($('<span class="icon-bar"></span>'));
      $('.navbar-toggle').append($('<span class="icon-bar"></span>'));
      $('.navbar-nav').append('<li><a href="./login.html">登录</a></li>');
      $('.navbar-nav').append('<li><a href="./reg.html">注册</a></li>');
    }
    
});