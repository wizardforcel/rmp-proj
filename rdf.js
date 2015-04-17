$(function()
{
	var url = 'http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Essay/';
	$.ajax(
	{
		url: url,
		type: 'GET',
		async: false,
		dataType: "text",
		beforeSend: function(xhr)
		{
			xhr.setRequestHeader('Accept', 'application/rdf+xml');
		},
		success: function(data)
		{
			$('pre').text(data);
		},
		error: function(xhr, text, ex)
		{
			document.write("RDF获取失败！" + text);
		}
	});

});