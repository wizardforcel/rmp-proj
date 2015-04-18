$(function()
{
    var doLogin = function()
    {
      var un = $('#un-txt').val();
      var pw = $('#pw-txt').val();
      if(!un || !pw)
      {
        alert('用户名和密码不能为空！');
        return;
      }

      $.get('http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/USER/?USER.username=' + 
            un + '&USER.password=' + pw + "&USER.usertype=1", function(data)
      {
        console.log(data);
        if($(data).find('Collection').children().length == 0)
          alert('登录失败！');
        else
        {
          alert('登录成功！');
          localStorage.setItem('un', un);
          localStorage.setItem('pw', pw);
          localStorage.setItem('id',
            $(data).find('Collection').find(':eq(0)').find('id').text())
          location.href = './list.html';
        }
      });
    };
    $('#lgn-btn').click(doLogin);
});