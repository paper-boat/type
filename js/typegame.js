//场景  创建字母  消除字母 如何开始 如何过关 如何结束
function Typegame(){
  this.createScene();
  this.createStarBord();
  this.letterObj={};
  // this.createLetter();
  this.scor=0;
  this.stage=1;
  //this.play();
  this.keydown();

}

Typegame.prototype={
  //创建场景
  createScene:function(){
    //创建div并插入body中,给div添加css样式
    $("<div class='scene'></div>").appendTo("body").css({
      width:$(window).width(),
      height:$(window).height(), //获取窗口高度
      position:"relative",
      overflow:"hidden",
      background:" url(./img/type.jpg) center",
      backgroundSize:"cover",
    })
    $("<h1>炫彩打字</h1>").appendTo("body").css({
      position:"absolute",
      top:"30px",
      left:"10%",
      // right:"0",
      margin:"auto",
      zIndex:"99999999999",
      fontSize:"72px",
      color:"#DA3B00",
    })
  },
  //创建字母
  createLetter:function(){
    this.createStageBord();
    do{
      var randomNum=Math.floor(Math.random()*26+65)
      var randomLetter=String.fromCharCode(randomNum)
      //fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串。
    }while(this.letterObj[randomLetter])

    do{
      var randomLeft=Math.round(Math.random()*740)
    }while(this.checkLeft(randomLeft))
    var randomTop=Math.round(Math.random()*100)
    var that=this;
    var time=new Date().getTime()
    var ele=$("<div data-time="+time+"></div>").css({
      width:"60",
      height:"60",
      background:"url(img/"+randomLetter+".png) center",
      backgroundSize:"contain",
      textAlign:"center",
      lineHeight:"60px",
      fontSize:"60px",
      fontWeight:"bold",
      position:"absolute",
      left:randomLeft,
      top:randomTop
    }).appendTo(".scene").animate({top:$(window).height()},5000,"linear",function(){
      if($("div[data-time="+time+"]")[0]){
        that.num=3;
        that.scor=0;
        that.stage=1;
        $.each(that.letterObj,function(index,value){
          value.el.remove()
        })
        that.letterObj={}
        that.createFailBord()
      }
    })
    this.letterObj[randomLetter]={start:randomLeft-60,end:randomLeft+60,keycode:randomNum,el:ele};
  },
  play:function(){

    this.createScorBord();
    for (var i = 0; i <this.num;i++) {
      this.createLetter()
    };
  },
  checkLeft:function(left){
    var flag=false;
    $.each(this.letterObj,function(index,value){
      if(left>value.start&&left<value.end){
        flag=true;
      }
    })
    return flag;
  },
  keydown:function(){
    var that=this;
    $(document).keydown(function(e){
      var code=e.keyCode;
      $.each(that.letterObj,function(index,value){
        if(code==value.keycode){
          value.el.remove()
          delete that.letterObj[index]
          that.createLetter();
          that.scor++;
          $(".scor").html(that.scor)
          $(".stage").html("第"+that.stage+"关")
          if(that.scor>=that.stage*10){
            that.createStage()
            //that.createStageBord();
            that.scor=0;
            //$(".scor").html(0)
            that.stage++;
            that.num++;
            $.each(that.letterObj,function(index,value){
              value.el.remove()
            })

            that.letterObj={};
            that.createScorBord()
          }
        }
      })
    })
  },
  createScorBord:function(){
    var that=this;
    $("<div class='scor'></div>").css({
      width:180,
      height:180,
      border:"3px dashed orange",
      position:"absolute",
      right:"150px",
      top:"150px",
      fontSize:"30px",
      textAlign:"center",
      lineHeight:"180px",
      color:"#fff"
    }).appendTo("body")
  },
  createStageBord:function(){
    var that=this;
    $("<div class='stage'>第"+that.stage+"关</div>").css({
      width:230,
      height:80,
      background:"url(img/tage.png) no-repeat center" ,
      backgroundSize:"contain",
      position:"absolute",
      right:"150px",
      top:"60px",
      fontSize:"30px",
      textAlign:"center",
      lineHeight:"80px",
      color:"#fff",

    }).appendTo("body")
  },
  createStage:function(){
    var that=this;
    var btn=$("<div></div>").css({
      width:150,
      height:150,
      cursor: "pointer",
      margin:"auto",
      background:"url(img/next.png) no-repeat bottom" ,
      backgroundSize:"contain"

    }).click(function(){
      that.play()
      $(this).parent().remove()
    })
    $("<div></div>").css({
      width:300,
      height:150,
      background:"url(img/success.png) no-repeat top",
      backgroundSize:"contain",
      position:"absolute",
      left:0,
      top:0,
      bottom:0,
      right:0,
      margin:"auto",
      textAlign:"center",
    }).appendTo("body").append(btn)
  },
  createFailBord:function(){
    var that=this;
    if(this.failbord){
      this.failbord.remove()
    }
    var btn=$("<div></div>").css({
      width:150,height:150,
      textAlign:"center",
      lineHeight:"30px",
      margin:"0 auto",
      cursor:"pointer",
      background:"url(img/newstart.png) no-repeat bottom",
      backgroundSize:"contain",
    }).click(function(){
      $(".scor").html(0)
      that.play()
      $(this).parent().remove()
    })
    this.failbord=$("<div></div>").css({
      width:"300",
      height:"150",
      position:"absolute",
      left:0,right:0,bottom:0,top:0,margin:"auto",
      background:"url(img/fail.png) no-repeat top",
      backgroundSize:"contain",
    }).appendTo("body").append(btn)
  },
  createStarBord:function(){
    var that=this;
    var numm=3;
    var btn=$("<div></div>").css({
      width:150,height:50,
      textAlign:"center",
      lineHeight:"30px",
      left:230,bottom:180,
      cursor:"pointer",
      background:"url(img/start.png) no-repeat center",
      backgroundSize:"contain",
      position:"absolute",
    }).click(function(){
      //$(".scor").html(0)
      that.num=numm;
      that.play()
      $(this).parent().remove()
    })
    var btn1=$("<div></div>").css({
      width:150,height:50,
      textAlign:"center",
      lineHeight:"30px",
      left:230,bottom:120,
      cursor:"pointer",
      background:"url(img/game.png) no-repeat center",
      backgroundSize:"contain",
      position:"absolute",
    }).click(function(){
      var that=this;
      var btn=$("<div><input type='button' value='确定'></div>").css({
        width:150,height:150,
        textAlign:"center",
        lineHeight:"30px",
        margin:"0 auto",
        cursor:"pointer",
        backgroundSize:"contain",
      }).click(function(){
        $(this).parent().remove()
      })
      this.yxsm=$("<div><p>打字游戏助你从零开始逐步成为打字高手！针对用户水平的定制个性化的练习课程，循序渐进，轻松练习不枯燥。提供英文、拼音、五笔、数字符号等多种输入练习，并为收银员、会计、速录等职业提供专业培训。是学打字的最佳伴侣，电脑入门的好伙伴！永久免费！</p></div>").css({
        width:"400",
        height:"300",
        position:"absolute",
        padding:"20px",
        left:0,right:0,bottom:0,top:0,margin:"auto",
        background:"#fff",
      }).appendTo("body").append(btn)

    })

    var btn2=$("<div></div>").css({
      width:150,height:50,
      textAlign:"center",
      lineHeight:"30px",
      left:230,bottom:60,
      cursor:"pointer",
      background:"url(img/gamesz.png) no-repeat center",
      backgroundSize:"contain",
      position:"absolute",
    }).click(function(){
      var that=this;
      var btn1=$("<div><input type='button' value='取消'></div>").css({
        width:50,height:30,
        textAlign:"center",
        lineHeight:"30px",
        margin:"0 auto",
        cursor:"pointer",
        backgroundSize:"contain",
      }).click(function(){
        $(this).parent().remove()
      })
      var btn=$("<div><input type='button' value='确定'></div>").css({
        width:50,height:30,
        textAlign:"center",
        lineHeight:"30px",
        margin:"0 auto",
        cursor:"pointer",
        backgroundSize:"contain",
      }).click(function(){
        if($(".cj").attr("checked")=="checked"){
          numm=3;
        }else if($(".zj").attr("checked")=="checked"){
          numm=4;
        }else if($(".gj").attr("checked")=="checked"){
          numm=5;
        }else{
          numm=3;
        }
        $(this).parent().remove()
      })
      var dj=$("<div>等级选择</div>")
      var cj=$("<input class='cj' type='radio' value='初级'><i>初级</i>").click(function(){  $(this).attr("checked", true)})
      var zj=$("<input class='zj' type='radio' value='中级'><i>中级</i>").click(function(){  $(this).attr("checked", true)})
      var gj=$("<input class='gj' type='radio' value='高级'><i>高级</i>").click(function(){  $(this).attr("checked", true)})
      this.yxsz=$("<div></div>").css({
        width:"400",
        height:"300",
        position:"absolute",
        padding:"20px",
        left:0,right:0,bottom:0,top:0,margin:"auto",
        background:"#fff",
        lineHeight:"30px",
        textAlign:"center",
      }).appendTo("body").append(dj,cj,zj,gj,btn,btn1)

    })
    var btn3=$("<div class='exiet'></div>").css({
      width:150,height:50,
      textAlign:"center",
      lineHeight:"30px",
      left:230,bottom:0,
      cursor:"pointer",
      background:"url(img/exit.png) no-repeat center",
      backgroundSize:"contain",
      position:"absolute",
    }).click(function(){
      $(this).parent().remove()
      $(".scene").remove()

    })
    this.startbord=$("<div></div>").css({
      width:$(window).width(),
      height:$(window).height(),
      background:"#fff",
      position:"absolute",
      left:0,right:0,bottom:0,top:0,margin:"auto",
      textAlign:"center",
      background:"url(img/bac.jpg) no-repeat ",
      backgroundSize:"cover",
    }).appendTo("body").append(btn1,btn2,btn3).append(btn)
  }
}
