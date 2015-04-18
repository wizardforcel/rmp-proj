$(function() 
{
    var fileBtnOnClick = function()
    {
      $('#file').click();
    };
    $('#file-btn').click(fileBtnOnClick);
    
    var fileOnChange = function()
    {
        $('#file-txt').val($('#file').val());
    };
    $('#file').change(fileOnChange);
    
    var uploadFile = function()
    {
        var author = $('#au-txt').val();
        var title = $('#title-txt').val();
        var kw = $('#kw-txt').val();
        var dt = new Date().toLocaleDateString()

        //提交元数据
        var xml = "<POST>\n" +
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.date</Target>\n" +
                  "\t\t<Value>" + dt + "</Value>\n" +
                  "\t</Operation-set>\n" + 
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.keywords</Target>\n" +
                  "\t\t<Value>" + kw + "</Value>\n" +
                  "\t</Operation-set>\n" + 
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.status</Target>\n" +
                  "\t\t<Value>1</Value>\n" +
                  "\t</Operation-set>\n" + 
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.title</Target>\n" +
                  "\t\t<Value>" + title + "</Value>\n" +
                  "\t</Operation-set>\n" + 
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.author</Target>\n" +
                  "\t\t<Value>" + author + "</Value>\n" +
                  "\t</Operation-set>\n" + 
                  "</POST>";
        console.log(xml);
        var url = "http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Essay/";
        var res = $.ajax(
        {
            type: "POST",
            async: false,
            url: url,
            contentType: "application/xml",
            data: xml
        });
        if(res.status != 200)
        {
          alert('提交失败！' + res.statusText);
          return;
        }
        var data = res.responseXML;
        console.log(data);
        var msg = $(data).find("error").text();
        if (msg !== "")
        {
          alert('提交失败！' + msg);
          return;
        }
        var t = $(data).find('Operation-Resource').text();
        var l = t.split('/');
        var id = l[l.length - 1];
        
        //上传文件
        url = "http://202.120.40.175:40011/Entity/" + 
              "Ucacb1171b84/xiaoQian/Essay/" + id.toString();
        var frm = new FormData();
        frm.append('file', $('#file')[0].files[0]);
        console.log($('#file')[0].files[0]);
        res = $.ajax(
        {
            type: "POST",
            async: false,
            url: url,
            contentType: false,
            data: frm,
            processData: false
        });
        if(res.status != 200)
        {
          alert('提交失败！' + res.statusText);
          return;
        }
        var data = res.responseText;
        console.log(data);
        if (data != "Upload Success")
            alert('提交失败！' + msg);
        else
        {
            alert('提交成功！');
            location.href= './list.html';
        }
    };
    $('#sub-btn').click(function()
    {
        setTimeout(uploadFile, 0);
    });
    
});