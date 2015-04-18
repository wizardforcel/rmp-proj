$(function() 
{
    //获取论文元数据
    var essay = JSON.parse(localStorage.essay);
    console.log(essay);
    $('#au-txt').val(essay.author);
    $('#title-txt').val(essay.title);
    $('#kw-txt').val(essay.kw);

    //绑定回调
    var fixEssay = function()
    {
        var author = $('#au-txt').val();
        var title = $('#title-txt').val();
        var kw = $('#kw-txt').val();
        var dt = new Date().toLocaleDateString()
        if(!author || !title || !kw)
        {
          alert('作者、标题、关键词不能为空！')
          return;
        }

        var xml = "<PUT>\n" +
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.keywords</Target>\n" +
                  "\t\t<Value>" + kw + "</Value>\n" +
                  "\t</Operation-set>\n" + 
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.title</Target>\n" +
                  "\t\t<Value>" + title + "</Value>\n" +
                  "\t</Operation-set>\n" + 
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.author</Target>\n" +
                  "\t\t<Value>" + author + "</Value>\n" +
                  "\t</Operation-set>\n" + 
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.status</Target>\n" +
                  "\t\t<Value>1</Value>\n" +
                  "\t</Operation-set>\n" + 
                  "</PUT>";
        console.log(xml);
        var url = "http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Essay/" + essay.id;
        $.ajax(
        {
            type: "PUT",
            async: true,
            url: url,
            contentType: "application/xml",
            data: xml,
            success: function(data)
            {
                console.log(data);
                var msg = $(data).find("error").text();
                if (msg !== "")
                {
                  alert('提交失败！' + msg);
                  return;
                }
                alert('提交成功！');
                location.href= './list.html';
            },
            error: function(xhr, text, ex)
            {
                alert('提交失败！' + text);
            }
        });        
    };
    $('#sub-btn').click(fixEssay);
    
});