$(function()
{
    
    var getList = function()
    {
        $.get('http://202.120.40.175:40011/Entity/Ucacb1171b84/xiaoQian/Essay/',
              function(data)
        {
            var xml = $(data);
            var errmsg = xml.find('error').text();
            if (errmsg != "")
            {
                alert("��ȡ����ʧ�ܣ�" + errmsg);
                return;
            }
            
            var list = xml.find('Collection').children();
            for(var i in list)
            {
            
            }
        });
    
    
    
    
    
    
    
    
    
    
    
    };
    getList();
    
    
    
    
    
    
    
    
});