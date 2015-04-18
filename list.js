$(function()
{

    var opBtnOnClick = function()
    {
        var row = $(this).parent().parent();
        //0: id, 1: title, 2: statusText, 3: oper, 5: au, 6: date, 7: kw, 8: statusNum
        var essay = {};
        essay.id = row.find(':eq(0)').text();
        essay.title = row.find(':eq(1)').text();
        essay.status = row.find(':eq(8)').text();
        essay.author = row.find(':eq(5)').text();
        essay.date = row.find(':eq(6)').text();
        essay.kw = row.find(':eq(7)').text();
        essay = JSON.stringify(essay);
        console.log(essay);
        localStorage.essay = essay;
        location.href = './detail.html';
    };

    var loadList = function(list)
    {
        $('.list-row').remove();
        for(var i = 0; i < list.length; i++)
        {
          var elem = list.slice(i, i + 1);
          var status = elem.children('status').text();
          if(status == 0) continue;
          var id = elem.children('id').text();
          var kw = elem.children('keywords').text();
          var title = elem.children('title').text();
          var date = elem.children('date').text();
          var author = elem.children('author').text();
          //console.log(id + ' ' + kw + ' ' + title + ' ' + date + ' ' + author);
          var tr = $('<tr class="list-row"></tr>');
          var idTd = $('<td>' + id + '</td>')
          var titleTd = $('<td>' + title + '</td>');
          var statusTable = ['已删除', '待审核', '审核中', '未通过', '已通过'];
          var statusTd = $('<td>' + statusTable[status] + '</td>');
          var statusNumTd = $('<td class="hidden">' + status + '</td>');
          var operTd = $('<td></td>');
          var authorTd = $('<td class="hidden">' + author + '</td>');
          var dateTd = $('<td class="hidden">' + date + '</td>');
          var kwTd = $('<td class="hidden">' + kw + '</td>');
          var opbtn = $('<a class="view-btn">查看</a>');
          operTd.append(opbtn);
          tr.append(idTd);
          tr.append(titleTd);
          tr.append(statusTd);
          tr.append(operTd);
          tr.append(authorTd);
          tr.append(dateTd);
          tr.append(kwTd);
          tr.append(statusNumTd);
          $('#list-table').append(tr);
        }
        $('.view-btn').click(opBtnOnClick);
    };

    var getList = function()
    {
        $.get('http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Essay/',
              function(data)
        {
            var xml = $(data);
            var errmsg = xml.find('error').text();
            if (errmsg != "")
            {
                alert("获取论文失败！" + errmsg);
                return;
            }
            var list = xml.find('Collection').children();
            loadList(list);
        });
    };
    getList();

    var search = function()
    {
        var title = $('#title-txt').val();
        var kw = $('#kw-txt').val();
        var author = $('#au-txt').val();
        var date = $('date-txt').val();

        var qw = [];
        if(title)
            qw.push("Essay.title=(like)" + title);
        if(kw)
            qw.push("Essay.keywords=(like)" + kw);
        if(date)
            qw.push("Essay.date=" + date);
        if(author)
            qw.push("Essay.Author.name=(like)" + author);
        var qstr = "";
        if(qw.length != 0)
            qstr = qw.join('&');
        $.get('http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Essay/?' + qstr,
              function(data)
        {
            var xml = $(data);
            var errmsg = xml.find('error').text();
            if (errmsg != "")
            {
                alert("获取论文失败！" + errmsg);
                return;
            }
            var list = xml.find('Collection').children();
            loadList(list);
        });
    };
    $('#search-btn').click(search);

    window.realRmEssay = function(id)
    {
        var url = "http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Essay/" + id;
        $.ajax(
        {
          type: "DELETE",
          url: url,
          async: true,
          success: function(data)
          {
            var msg = $(data).find("error").text();
            if (msg !== "")
                alert('删除失败！' + msg);
            else
            {
              alert('删除成功！');
              location.reload();
            }
          },
          error: function(xhr, text, ex)
          {
            alert('删除失败！' + text);
          }
        });
    };

});