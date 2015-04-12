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
    
    
    var postFile = function(eid)
    {
        
        var url = "http://202.120.40.175:40011/Entity/" + 
                  "Ucacb1171b84/xiaoQian/Essay/" + eid.toString();
        var frm = new FormData();
        frm.append('file', $('#file')[0].files[0]);

        $.ajax(
        {
            type : "POST",
            async : false,
            url : url,
            contentType : false,
            data: frm,
            processData : false,
            success : function(data) 
            {
                console.log('success');
                if (data != "Upload Success")
                  alert('提交失败！' + msg);
                else
                {
                  alert('提交成功！');
                  //location.href= './list.html';
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) 
            {
                console.log('error');
                alert('提交失败！' + textStatus);
            }
        });
    };
    
    var postEssay = function(auid)
    {
      var kw = $('#kw-txt').val();
      var dt = new Date().toLocaleDateString()
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
                "\t<Operation-add>\n" + 
                "\t\t<Target>this.Author</Target>\n" +
                "\t\t<Value>Ucacb1171b84/xiaoQian/Author/" + auid.toString() + "</Value>\n" +
                "\t</Operation-add>\n" +
                "</POST>";
      console.log(xml);
      var url = "http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Essay/";
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
                  alert('提交失败！' + msg);
                else
                {
                  var t = $(data).find('Operation-Resource').text();
                  var l = t.split('/');
                  var id = l[l.length - 1];
                  postFile(id);
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) 
            {
                alert('提交失败！' + textStatus);
            }
        });
    };
    
    var postAuthor = function()
    {
        var author = $('#au-txt').val();
        var xml = "<POST>\n" +
                  "\t<Operation-set>\n" +
                  "\t\t<Target>this.name</Target>\n" +
                  "\t\t<Value>" + author + "</Value>\n" +
                  "\t</Operation-set>\n" + 
                  "</POST>";
        console.log(xml);
        var url = "http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Author/";
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
                  alert('提交失败！' + msg);
                else
                {
                  var t = $(data).find('Operation-Resource').text();
                  var l = t.split('/');
                  var id = l[l.length - 1];
                  postEssay(id);
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) 
            {
                alert('提交失败！' + textStatus);
            }
        });
    }
    $('#sub-btn').click(postAuthor);
    
});