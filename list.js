$(function()
{

    var dlBtnOnClick = function()
    {
        var id = $(this).parent().parent().find(":last").text();
        //console.log(id);
        window.open('http://202.120.40.175:40011/file/Ucacb1171b84/xiaoQian/Essay/' + id);
    };

    var loadList = function(list)
    {
        $('.list-row').remove();
        for(var i = 0; i < list.length; i++)
        {
          var elem = list.slice(i, i + 1);
          var id = elem.children('id').text();
          var kw = elem.children('keywords').text();
          var title = elem.children('title').text();
          var date = elem.children('date').text();
          var author = elem.children('author').text();
          //console.log(id + ' ' + kw + ' ' + title + ' ' + date + ' ' + author);
          var tr = $('<tr class="list-row"></tr>');
          var titleTd = $('<td>' + title + '</td>');
          var authorTd = $('<td>' + author + '</td>');
          var dateTd = $('<td>' + date + '</td>');
          var kwTd = $('<td>' + kw + '</td>');
          var operTd = $('<td></td>');
          var idTd = $('<td class="hidden">' + id + '</td>')
          var dlbtn = $('<a class="dl-btn">下载</a>');
          operTd.append(dlbtn);
          tr.append(titleTd);
          tr.append(authorTd);
          tr.append(dateTd);
          tr.append(kwTd);
          tr.append(operTd);
          tr.append(idTd);
          $('#list-table').append(tr);
        }
        $('.dl-btn').click(dlBtnOnClick);
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

});
