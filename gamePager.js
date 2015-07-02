/**
 * Created by zs on 2015/4/17.
 */
var pager ={
    //每页显示游戏的数量
    countPerPage:5,

    listPRender: function (content) {
        var result = '<div class="CC"><a href="'+content["href"]+'"><img src="'+content["src"]+'"></a>';
        for(var key in content){
            if(key!="href"&&key!="src"&&key!="id")
            result = result + '<div class="'+key+'">'+content[key]+'</div>';
        }
        result = result + '</div>';
        return result;
    },
    listRender: function (data,currentPage,listContainer1) {
        if(currentPage>Math.ceil( data.length/pager.countPerPage)||currentPage<=0)
        return;
        $(listContainer1).html("");
        for(var key in data){
            if(key<currentPage*pager.countPerPage&&key>=(currentPage-1)*pager.countPerPage){
                $(listContainer1).html($(listContainer1).html() + pager.listPRender(data[key]));
            }
        }
    },

    pagerRender: function (length,currentPage,pagerContainer1) {
        if(currentPage>Math.ceil( length/pager.countPerPage)||currentPage<=0)
            return;
        var result='<a href="#">上一页</a> ';
        pager.totalPage = Math.ceil( length/pager.countPerPage);
        for(var i=1;i<=pager.totalPage;i++){
            if(i==currentPage){
                result = result + '<a href="#" class="SelectA">'+i+'</a> ';
            }else
            result = result + '<a href="#">'+i+'</a> ';
        }
        result = result + '<a href="#">下一页</a> ';
        result = result + '共'+pager.totalPage+'页';

        $(pagerContainer1).html(result);
    },

    render:function (jsonUrl,listContainer,pagerContainer) {
        var listContainer1 = "#"+listContainer;
        var pagerContainer1 = "#"+pagerContainer;
        $(listContainer1).html("");
        $.getJSON(jsonUrl, function (data) {
            pager.listRender(data,1,listContainer1);
            pager.pagerRender(data.length,1,pagerContainer1);

            $(pagerContainer1).on("click","a", function () {
                var goto = $(this).html();
                var current =parseInt($(pagerContainer1).find(".SelectA").html());
                if(goto=="下一页"){
                    goto = current + 1;
                    pager.listRender(data,goto,listContainer1);
                    pager.pagerRender(data.length,goto,pagerContainer1);
                }else if(goto=="上一页"){
                    goto = current - 1;
                    pager.listRender(data,goto,listContainer1);
                    pager.pagerRender(data.length,goto,pagerContainer1);
                }else if(!isNaN(parseInt(goto))){
                    goto = parseInt(goto);
                    pager.listRender(data,goto,listContainer1);
                    pager.pagerRender(data.length,goto,pagerContainer1);
                }
                return false;
            })
        });
    }
};