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


    var rmBtnOnClick = function()
    {

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
      $.get('http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/USER/',
              function(data)
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