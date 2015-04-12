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
        var url = "http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/USER/";
        $.ajax(
        {
            type : "POST",
            async : false,
            url : url,
            contentType : "application/xml",
            data : xml,
            success : function(data) 
            {
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
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) 
            {
                alert('注册失败！' + textStatus);
            }
        });
    };
    $('#reg-btn').click(doReg);
});