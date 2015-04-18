$(function()
{
    //获取论文元数据
    var essay = JSON.parse(localStorage.essay);
    console.log(essay);
    $('#id-td').text(essay.id);
    $('#title-td').text(essay.title);
    $('#au-td').text(essay.author);
    $('#kw-td').text(essay.kw);
    $('#date-td').text(essay.date);
    var statusTable = ['已删除', '待审核', '审核中', '未通过', '已通过', '已撤销'];
    $('#status-td').text(statusTable[essay.status]);

    //获取审稿人信息
    var ckList = [];
    var getCkList = function()
    {
        var url = 'http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Check/' + 
                 '?Check.Essay.id=' + essay.id;
        var res = $.ajax(
        {
          type: "GET",
          async: false,
          url: url
        });
        if(res.status != 200)
        {
          alert('注册失败！' + res.statusText);
          return;
        }
        var xml = $(res.responseXML);
        var errmsg = xml.find('error').text();
        if (errmsg != "")
        {
            alert("获取审稿人失败！" + errmsg);
            location.href = './list.html';
        }
        var list = xml.find('Collection').children();
        $('.ckli-row').remove();
        for(var i = 0; i < list.length; i++)
        {
          var elem = list.slice(i, i + 1);
          var comment = elem.children('comment').text();
          var cid = elem.children('id').text();
          var id = elem.find('USER id').text();
          ckList.push({id: id, cid: cid, comment: comment});
          var tr = $('<tr class="ckli-row"></tr>');
          var idTd = $('<td>' + id + '</td>')
          var commentTd = $('<td>' + comment + '</td>');
          tr.append(idTd);
          tr.append(commentTd);
          $('#ckli-table').append(tr);
        }
    };
    getCkList();
    console.log(ckList);

    //判断当前用户状态
    var isAuthor = function()
    {
      return essay.aid == localStorage.id;
    };

    var isChecker = function()
    {
      for(var i in ckList)
        if(ckList[i].id == localStorage.id)
        {
          console.log(ckList[i].id);
          return true;
        }
      return false;
    };

    var isAdmin = function()
    {
      return localStorage.un == 'admin';
    };

    if(isAuthor())
      $('#au-panel').removeClass('hidden');
    if(isChecker())
      $('#ck-panel').removeClass('hidden');
    if(isAdmin())
      $('#admin-panel').removeClass('hidden');

    //绑定回调
    var dlBtnOnClick = function()
    {
        window.open('http://202.120.40.175:40011/file/Ucacb1171b84/xiaoQian/Essay/' + essay.id);
    };
    $('#dl-btn').click(dlBtnOnClick);


    var rmBtnOnClick = function()
    {
      if(!confirm('真的要删除吗？'))
          return;

        var url = "http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Essay/" + essay.id;
        var xml = "<PUT>\r\n" +
                  "\t<Operation-set>\r\n" + 
                  "\t\t<Target>this.status</Target>\r\n" +
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
                  alert('删除失败！' + msg);
              else
              {
                alert('删除成功！');
                location.href = './list.html';
              }
            },
            error: function(xhr, text, ex)
            {
              alert('删除失败！' + text);
            }
        });
    };
    $('#rm-btn').click(rmBtnOnClick);

    var addCk = function()
    {
      if(essay.status != 2)
      {
        alert('未在审核状态，不能添加。')
        return;
      }

      if(ckList.length == 3)
      {
        alert('审稿人已满，不能添加。');
        return;
      }

      var id = $('#ckid-txt').val();
      if(!/^\d+$/.test(id))
      {
        alert('请填写正确的审稿人id！');
        return;
      }

      var found = false;
      for(var i in ckList)
        if(ckList[i].id == id) 
        {
          found = true;
          break;
        }
      if(found)
      {
        alert('请勿重复添加！');
        return;
      }


      var url = 'http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Check/';
      var xml = "<POST>\r\n" +
                "\t<Operation-set>\r\n" +
                "\t\t<Target>this.comment</Target>\r\n" +
                "\t\t<Value></Value>\r\n" +
                "\t</Operation-set>\r\n" +
                "\t<Operation-set>\r\n" +
                "\t\t<Target>this.Essay</Target>\r\n" +
                "\t\t<Value>Ucacb1171b84/xiaoQian/Essay/" + essay.id + "</Value>\r\n" +
                "\t</Operation-set>\r\n" +
                "\t<Operation-set>\r\n" +
                "\t\t<Target>this.USER</Target>\r\n" +
                "\t\t<Value>Ucacb1171b84/xiaoQian/USER/" + id + "</Value>\r\n" +
                "\t</Operation-set>\r\n" +
                "</POST>";
      console.log(xml);
      $.ajax(
      {
          type: "POST",
          async: true,
          url: url,
          contentType: "application/xml",
          data: xml,
          success: function(data)
          {
            var msg = $(data).find("error").text();
            if (msg !== "")
            {
                alert('添加失败！' + msg);
                return;
            }
            
            alert('添加成功！');
            location.reload();
          },
          error: function(xhr, text, ex)
          {
            alert('添加失败！' + text);
          }
      });
    };
    $('#ckadd-btn').click(addCk);

    var rmCk = function()
    {

      if(essay.status != 2)
      {
        alert('未在审核状态，不能移除。')
        return;
      }

      var id = $('#ckid-txt').val();
      if(!/^\d+$/.test(id))
      {
        alert('请填写正确的审稿人id！');
        return;
      }

      var index = -1;
      for(var i in ckList)
        if(ckList[i].id == id)
        {
          index = i;
          break;
        }
      if(index == -1)
      {
        alert('列表中无此审稿人！');
        return;
      }

      var cid = ckList[index].cid
      var url = 'http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Check/' + cid;
      $.ajax(
      {
          type: "DELETE",
          async: true,
          url: url,
          success: function(data)
          {
            var msg = $(data).find("error").text();
            if (msg !== "")
            {
                alert('移除失败！' + msg);
                return;
            }

            alert('移除成功！');
            location.reload();
          },
          error: function(xhr, text, ex)
          {
            alert('移除失败！' + text);
          }
      });
    };
    $('#ckrm-btn').click(rmCk);

    var setStatus = function()
    {
        if(!(essay.status == 2 || essay.status == 1))
        {
          alert('当前状态下无法设置！');
          return;
        }

        var status = $('#status-cmb').val();
        var url = 'http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Essay/' + essay.id;
        var xml = "<PUT>\r\n" +
                  "\t<Operation-set>\r\n" +
                  "\t\t<Target>this.status</Target>\r\n" +
                  "\t\t<Value>" + status + "</Value>\r\n" +
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
              {
                  alert('设置失败！' + msg);
                  return;
              }

              alert('设置成功！');
              essay.status = status;
              localStorage.essay = JSON.stringify(essay);
              $('#status-td').text(statusTable[status]);
            },
            error: function(xhr, text, ex)
            {
              alert('设置失败！' + text);
            }
        });
    };
    $('#status-btn').click(setStatus);

    var fixComment = function()
    {
        var comment = prompt('请填写评论');
        if(!comment)
        {
          alert('请填写评论！')
          return;
        }

        var index = -1;
        for(var i in ckList)
        {
          if(ckList[i].id == localStorage.id)
          {
            index = i;
            break;
          }
        }
        if(index == -1)
        {
          alert('获取评论ID失败！')
          return;
        }

        var cid = ckList[index].cid;
        var url = 'http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Check/' + cid;
        var xml = "<PUT>\r\n" +
                  "\t<Operation-set>\r\n" +
                  "\t\t<Target>this.comment</Target>\r\n" +
                  "\t\t<Value>" + comment + "</Value>\r\n" +
                  "\t</Operation-set>\r\n" +
                  "</PUT>";
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
              {
                  alert('评论失败！' + msg);
                  return;
              }

              alert('评论成功！');
              location.reload();
            },
            error: function(xhr, text, ex)
            {
              alert('评论失败！' + text);
            }
        });
    };
    $('#fixcomment-btn').click(fixComment);

});