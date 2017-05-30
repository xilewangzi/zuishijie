/**
 * Created by Administrator on 2016/12/6.
 */
/*红色小标签*/
var arr = ["一日游","接送机","WI-FI","电话卡","门票"];
var i = 1;
var timer = setInterval(function(){
    $("#redTag").html(arr[i]);
    i++;
    if(i==5){
        i=0;
    }
},2000)
/*city*/
$(".city").click(function(){
    $.each($(".city"),function(){
        $(this).css("background","none")
    })
    $(this).css("background","#2fcea2")
})
/*排序点击*/
$(".oLi a").click(function(){
    $.each($(".oLi a"),function(){
        $(this).css("color","#fff")
    })
    $(this).css("color","#2fcea2")
})
/*项目*/
$.get("../../citywalk/cityWalkList.json",function(res){
    $.each(res,function(index,data){
        /*外层最大div*/
        $("<div/>").addClass("itemsContent").appendTo($(".items"));
        /*pic*/
        $("<img/>").attr("src",data.imgurl).appendTo($(".itemsContent").eq(index));
        /*pic右div*/
        $("<div/>").appendTo($(".itemsContent").eq(index)).addClass("picRight");
        $("<div/>").appendTo($(".picRight").eq(index)).addClass("picRightTop");
        $("<p/>").html(data.address).appendTo($(".picRightTop").eq(index)).addClass("address");
        /*浏览和已售*/
        $("<p/>").appendTo($(".picRightTop").eq(index)).addClass("count");
        $("<span/>").html(data.browseCount).appendTo($(".count").eq(index));
        $("<span/>").html("次浏览").appendTo($(".count").eq(index));
        $("<span/>").html(data.soldCount).appendTo($(".count").eq(index));
        $("<span/>").html("件已售").appendTo($(".count").eq(index));
        /*title*/
        $("<div/>").appendTo($(".picRight").eq(index)).addClass("picRightMiddle");
        $("<p/>").appendTo($(".picRightMiddle").eq(index)).html(data.title).addClass("picRightMiddleP");
        /*introduce*/
        $("<div/>").appendTo($(".picRight").eq(index)).addClass("picRightIntroduce");
        $.each(data.introduce,function(Ieindex,Iedata){
            $("<p/>").html(Iedata).appendTo($(".picRightIntroduce").eq(index));
        })
        /*立即预定*/
        $("<div/>").appendTo($(".picRight").eq(index)).addClass("reserve").html("立即预定");
        /*价格*/
        $("<div/>").appendTo($(".picRight").eq(index)).addClass("price");
        $("<span/>").appendTo($(".price").eq(index)).html(data.oldPrice+"元");
        $("<span/>").appendTo($(".price").eq(index)).html(data.newPrice);
        $("<span/>").appendTo($(".price").eq(index)).html("元起");

    })

})
/*获取热门目的地五组数据*/
var resArr = Array(5);
$.get("../../index/menu.json",function(res){
    $.each(resArr,function(index,data){
        resArr[index]=res[index];
    })
    console.log(resArr)
})
$("#hotArea").hover(function(){
    /*鼠标滑过热门目的地*/
    $("<div/>").appendTo($("#hotArea")).addClass("outerDiv");
    $("<ul/>").appendTo($(".outerDiv")).addClass("outerUl");
    $.each(resArr,function(arrIndex,data){
        $("<li/>").appendTo($(".outerUl")).addClass("areaLi");
        /*title*/
        $("<p/>").appendTo($(".areaLi").eq(arrIndex)).addClass("areaLiPF").html(data.title);
        /*maincity*/
        $("<p/>").appendTo($(".areaLi").eq(arrIndex)).addClass("areaLiPS");
        /*smallPic*/
        $("<h2/>").appendTo($(".areaLi").eq(arrIndex)).addClass("smallPic");
        $.each(data.mainCity,function(mcIndex,cityName){
            $("<a/>").attr("href","#").html(cityName).appendTo($(".areaLiPS").eq(arrIndex));
        });
        $(".areaLi").eq(arrIndex).hover(function(){
            $("<div/>").appendTo($(this)).addClass("display");
            /*遍历moreCity*/
            $.each(data.moreCity,function(mcindex,mcdata){
                $("<div/>").appendTo($(".display")).addClass("contentDiv");
                $("<p/>").appendTo($(".contentDiv").eq(mcindex)).addClass("contentDivP").html(mcdata.cityName);
                $("<div/>").appendTo($(".contentDiv").eq(mcindex)).addClass("contentDivDiv");
                $.each(mcdata.items,function(itemsIndex,cityName1){
                    $("<a/>").html(cityName1).attr("href","#").appendTo($(".contentDivDiv").eq(mcindex));
                })
            })
            $("<img/>").attr("src",data.moreCityImg).appendTo($(".display")).addClass("Oimg");
        },function(){
            $(".display").remove();
        })

    })
},function(){
    $(".outerDiv").remove();
})
$("#footer").load("../html/footer.html");

