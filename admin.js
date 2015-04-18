$(function()
{

    window.realRmUser = function(id)
    {

        var url = "http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/USER/" + id;
        $.ajax(
        {
          type: "DELETE",
          url: url,
          async: true,
          success: function(data)
          {
            var msg = $(data).find("error").text();
            if (msg !== "")
                alert('用户删除失败！' + msg);
            else
            {
              alert('用户删除成功！');
              location.reload();
            }
          },
          error: function(xhr, text, ex)
          {
            alert('用户删除失败！' + text);
          }
        });
    };


    var rmBtnOnClick = function()
    {
        if(!confirm('真的要删除吗？'))
          return;
   
        var row = $(this).parent().parent();
        var id = row.find(":first").text();
        var un = row.find(":eq(1)").text();
        console.log(id + ' ' + un);
        if(un == 'admin')
        {
          alert('管理员不可删除！');
          return;
        }

        var url = "http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/USER/" + id;
        var xml = "<PUT>\r\n" +
                  "\t<Operation-set>\r\n" + 
                  "\t\t<Target>this.usertype</Target>\r\n" +
                  "\t\t<Value>0</Value>\r\n" +
                  "\t</Operation-set>\r\n" +
                  "</PUT>";
        console.log(xml);
        $.ajax(
        {
            type: "PUT",
            async: true,
            url: url,
            contentType: "application/xml",
            data: xml,
            success: function(data)
            {
              var msg = $(data).find("error").text();
              if (msg !== "")
                  alert('用户删除失败！' + msg);
              else
              {
                row.remove();
                alert('用户删除成功！');
              }
            },
            error: function(xhr, text, ex)
            {
              alert('用户删除失败！' + text);
            }
        });
    };

    var loadList = function(list)
    {
        $('.list-row').remove();
        for(var i = 0; i < list.length; i++)
        {
          var elem = list.slice(i, i + 1);
          var id = elem.children('id').text();
          var un = elem.children('username').text();
          //console.log(id + ' ' + kw + ' ' + title + ' ' + date + ' ' + author);
          var tr = $('<tr class="list-row"></tr>');
          var idTd = $('<td>' + id + '</td>');
          var unTd = $('<td>' + un + '</td>');
          var operTd = $('<td></td>');
          var dlbtn = $('<a class="rm-btn">删除</a>');
          operTd.append(dlbtn);
          tr.append(idTd);
          tr.append(unTd);
          tr.append(operTd);
          $('#list-table').append(tr);
        }
        $('.rm-btn').click(rmBtnOnClick);
    };

    var getList = function()
    {
        $.get('http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/USER/' + 
              "?USER.usertype=1", function(data)
        {
          console.log(data);
            var xml = $(data);
            var errmsg = xml.find('error').text();
            if (errmsg != "")
            {
                alert("获取用户失败！" + errmsg);
                return;
            }
            var list = xml.find('Collection').children();
            loadList(list);
        });
    };
    getList();

});