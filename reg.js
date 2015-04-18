$(function()
{
    var doReg = function()
    {
        var pw = $('#pw-txt').val();
        var pw2 = $('#pw-txt2').val();
        if(pw != pw2)
        {
            alert('两次密码不一致！');
            return;
        }
        var un = $('#un-txt').val();

        //判断是否已注册
        var url = 'http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/USER/' + 
                  '?USER.username=' + un + "&USER.usertype=1";
        var res = $.ajax(
        {
          type: 'GET',
          async: false,
          url: url
        });
        if(res.status != 200)
        {
          alert('注册失败！' + res.statusText);
          return;
        }
        var data = res.responseXML;
        console.log(data);
        if($(data).find('Collection').children().length != 0)
        {
          alert('该用户名已被注册！');
          return;
        }

        //注册
        var xml = "<POST>\n" +
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.username</Target>\n" +
                  "\t\t<Value>" + un + "</Value>\n" +
                  "\t</Operation-set>\n" +
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.password</Target>\n" +
                  "\t\t<Value>" + pw + "</Value>\n" +
                  "\t</Operation-set>\n" +
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.usertype</Target>\n" +
                  "\t\t<Value>1</Value>\n" +
                  "\t</Operation-set>\n" +
                  "</POST>";
        console.log(xml);
        url = "http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/USER/";
        res = $.ajax(
        {
            type: "POST",
            async: false,
            url: url,
            contentType: "application/xml",
            data: xml
        });
        if(res.status != 200)
        {
          alert('注册失败！' + res.statusText);
          return;
        }
        var data = res.responseXML;
        console.log(data);
        var msg = $(data).find("error").text();
        if (msg !== "")
            alert('注册失败！' + msg);
        else
        {
          alert('注册成功！');
          localStorage.setItem('un', un);
          localStorage.setItem('pw', pw);
          var t = $(data).find('Operation-Resource').text();
          var l = t.split('/');
          var id = l[l.length - 1];
          localStorage.setItem('id', id);
          location.href = './list.html';
        }
    };
    $('#reg-btn').click(function()
    {
        //ajax同步，用setTimeout异步，把代码捋直
        setTimeout(doReg, 0);
    });
});