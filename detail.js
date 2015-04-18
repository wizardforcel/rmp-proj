$(function()
{
	var essay = JSON.parse(localStorage.essay);
	console.log(essay);
	$('#id-td').text(essay.id);
	$('#title-td').text(essay.title);
	$('#au-td').text(essay.author);
	$('#kw-td').text(essay.kw);
	$('#date-td').text(essay.date);
	var statusTable = ['已删除', '待审核', '审核中', '未通过', '已通过'];
	$('#status-td').text(statusTable[essay.status]);

	var isAuthor = function()
	{
		return essay.aid == localStorage.id;
	};

	var isChecker = function()
	{
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









});