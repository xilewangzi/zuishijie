/**
 * Created by Administrator on 2016/12/2.
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
//搜索框聚焦和失去焦点
$(".search input[type='text']").on({
    focus:function(){
        $(".ulist").css("display","block");
    },
    blur:function() {
        $(".ulist").css("display", "none");
    }
})
//ulist鼠标经过颜色
$(".ulist li").hover(function(){
    $(this).css("background","#10bfa5");
},function(){
    $(this).css("background","#fff");
})

/*banner*/
$.get("../index/banner.json",function(res){
    $.each(res,function(index,picObj){
        $("<img/>").attr("src",picObj.imgUrl).appendTo($(".swiper-slide").eq(index));
    })
})
/*loop*/
var mySwiper = new Swiper('.swiper-container', {
    autoplay: 1000,//可选选项，自动滑动
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
    autoplayDisableOnInteraction : false,
    pagination : '.swiper-pagination',
})
/*areaList*/
var OdivArr = [];
$(".areaItems").hover(function(){
    $(this).css("background","#fff");
    /*Li下标*/
    var number = $(this).index();
    /*全部隐藏*/

    $.each($(".areaCategory_content"),function(index){
        OdivArr[index] = $(this);
        $(this).css("display","none");
        /*对应LI的div显示*/
        if(index == number){
            $(this).css("display","block");
        }
    });
    /*获取menu数据*/
    /*moreCity*/
    $.get("../index/menu.json",function(res){
        var city = res[number].moreCity;
        $.each(city,function(mcindex,cityData){
            $("<div/>").appendTo(OdivArr[number]).addClass("areaDiv").append("<p/>")
                /*添加p*/
                .find($("p")).addClass("areaDivP").html(cityData.cityName).parent($("div"))
                /*添加div*/
                .append("<div/>").find($("div")).addClass("areaDivDiv");
            if(number!=5){
                $.each(cityData.items,function(cityNum,data){
                    $("<a/>").attr("href","#").html(data).appendTo($(".areaDivDiv").eq(mcindex));
                })
            }else{
                $.each(cityData.items,function(cityNum,data){
                    $("<img/>").attr("src",data).appendTo($(".areaDivDiv").eq(0));
                })
            }
        })















    })
    /*moreCityImg*/
    $.get("../index/menu.json",function(res){
        if(number!=5){
            $("<img/>").attr("src",res[number].moreCityImg).appendTo(OdivArr[number]);
        }
    })
    $(this).find("h2").css("color","#000");
},function(){
    $(this).css("background","");
    /*全部隐藏*/
    $.each($(".areaCategory_content"),function(){
        $(this).css("display","none");
        $(this).empty();
    });
    $(this).find("h2").css("color","#fff");
})

var number;
$(".areaCategory_content").hover(function(){
    number = $(this).index()-1;
    $(this).css("display","block");
    $.get("../index/menu.json",function(res){
        var city = res[number].moreCity;
        // console.log(city);
        $.each(city,function(mcindex,cityData){
            $("<div/>").appendTo(OdivArr[number]).addClass("areaDiv").append("<p/>")
                /*添加p*/
                .find($("p")).addClass("areaDivP").html(cityData.cityName).parent($("div"))
                /*添加div*/
                .append("<div/>").find($("div")).addClass("areaDivDiv");
            if(number!=5){
                $.each(cityData.items,function(cityNum,data){
                    $("<a/>").attr("href","#").html(data).appendTo($(".areaDivDiv").eq(mcindex));
                })
            }else{
                $.each(cityData.items,function(cityNum,data){
                    $("<img/>").attr("src",data).appendTo($(".areaDivDiv").eq(0));
                })
            }
        })
    })
    /*moreCityImg*/
    $.get("../index/menu.json",function(res){
        if(number!=5){
            $("<img/>").attr("src",res[number].moreCityImg).appendTo(OdivArr[number]);
        }
    })
},function(){
    $(this).empty();
    $(this).css("display","none");
})




/*menu数据*/
$.get("../index/menu.json",function(res){
    $.each($(".areaItems h2"),function(index,LiDom){
        $(LiDom).html(res[index].title);
    });
    $.each($(".areaItems p:even"),function(index,PDom){
        $.each(res[index].mainCity,function(arrIndex,city){
            $("<a/>").html(res[index].mainCity[arrIndex]).attr("href","#").appendTo($(PDom));
        })
        $(PDom).html()
    })
})
/*freeWalk 自由行数据*/
var j = 1;
$.get("../index/freeWalk.json",function(res){
    var dataArr = [];
    var i = 0;
    $.each(res,function(attr,fwObj){
        /*freeWalkMain数据*/
        dataArr[i] = fwObj.data;
        i++;
        /*生成freeWalkHeadTags*/
        $("<a/>").attr({href:"#",target:"_blank"}).html(fwObj.title).appendTo($("<li/>").appendTo($(".freeWalkHeadTags"))
            /*鼠标滑过HeadTags事件*/
            .on("mouseover",function(){
                $(".freeWalkHeadTags").find("li").removeClass("active");
                $(this).addClass("active");
                $(".freeWalkMainUl").eq($(this).index()).css("z-index",++j);
            })
        );
    })
    /*初始化第一个freeWalkHeadTags*/
    $(".freeWalkHeadTags").find("li").first().addClass("active");
    /*初始化第一个freeWalkMainUl*/
    $(".freeWalkMainUl").first().css("z-index",1);
    /*通过下标去重*/
    $.each(dataArr,function(index,data){
        /*第一次循环创建7个freeWalkMain模块*/
        $("<ul/>").appendTo($(".freeWalkMain")).addClass("freeWalkMainUl");
        /*每次循环创建6个li模块*/
        $.each(data,function(attr,dataobj){
            $("<li/>").appendTo($(".freeWalkMainUl").eq(index)).addClass("freeWalkMainLi").append($("<p/>")).append($("<p/>"));
            $(".freeWalkMainUl").eq(index).find($(".freeWalkMainLi")).eq(attr).css("background","url("+dataobj.imgUrl+")"+"no-repeat");
            /*价格*/
            $(".freeWalkMainUl").eq(index).find($(".freeWalkMainLi")).eq(attr).find($("p")).first().append($("<p/>")).append($("<h2/>"))
                .addClass("airTicket").find("h2").html(dataobj.price+"元起");
            /*添加机票或机+酒*/
            if(attr<3){
                $(".freeWalkMainUl").eq(index).find($(".freeWalkMainLi")).eq(attr).find($(".airTicket")).find($("p")).html("机票");
            }else{
                $(".freeWalkMainUl").eq(index).find($(".freeWalkMainLi")).eq(attr).find($(".airTicket")).find($("p")).html("机+酒");
            }
            $(".freeWalkMainUl").eq(index).find($(".freeWalkMainLi")).eq(attr).find($("p")).last().addClass("message");
            /*添加下面的详细信息*/
            if(attr>0){
                $(".freeWalkMainUl").eq(index).find($(".freeWalkMainLi")).eq(attr).find($("p")).last().addClass("smallLi")
            }
            if(attr==0){
                $(".freeWalkMainUl").eq(index).find($(".freeWalkMainLi")).eq(attr).find($(".message")).append($("<p/>")).append($("<p/>"));
                $(".freeWalkMainUl").eq(index).find($(".freeWalkMainLi")).eq(attr).find($(".message")).find($("p")).first().html(dataobj.title);
                $(".freeWalkMainUl").eq(index).find($(".freeWalkMainLi")).eq(attr).find($(".message")).find($("p")).last().html(dataobj.time);
            }else{
                $(".freeWalkMainUl").eq(index).find($(".freeWalkMainLi")).eq(attr).find($(".message")).html(dataobj.title);
            }
        })
    })
})
$("#footer").load("../html/footer.html");


