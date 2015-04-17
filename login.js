$(function()
{
    var doLogin = function()
    {
      var un = $('#un-txt').val();
      var pw = $('#pw-txt').val();
      //此处应该有校检
      $.get('http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/USER/?USER.username=' + 
            un + '&USER.password=' + pw, function(data)
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