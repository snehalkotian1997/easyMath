
$( document ).ready(function() {
    var monthlyData =[], yearlyData=[];
    $.ajax({
        url: "https://api.npoint.io/33ba2a672384d1929000",
      }).done(function(result) {
        $.grep(result, function( n, i ) {
            if(n.monthly != undefined){
               monthlyData.push(n.monthly)
            }
            if(n.yearly != undefined){
               yearlyData.push(n.yearly);;
            }
       });
       var monthGrades = [], monthBoards = [];
    $.each(monthlyData[0],function(i,v){
        monthGrades.push(v.grade);
        monthBoards.push(v.boards);
    })
    var yearGrades = [], yearBoards = [];
    var boardsNames =[];
    $.each(yearlyData[0],function(i,v){
        if(v.grade != undefined){
            yearGrades.push(v.grade);
        }
        if(v.boards != undefined){
            yearBoards.push(v.boards);
        }
   })

    boardsNames.push(Object.keys(yearBoards[0]))
    $(".tabcontent1 .tab").empty();
    $.each(boardsNames[0],function(i,v){
        var ids = v.replace(" ","");
        if(ids.indexOf("JEE(Main + Advanced)") > -1){
            ids = "JEEMainAdvanced"
        }
        $(".tabcontent1 .tab").append('<button class="tablinks2" id="'+ids+'Course" onclick=openCourses(event,'+ids+')>'+v+'</button>');
    })
    $(".contentTabs").empty();
    $.each(boardsNames[0],function(i,v){
        var ids = v.replace(" ","");
        if(ids.indexOf("JEE(Main + Advanced)") > -1){
            ids = "JEEMainAdvanced"
        }
        $(".contentTabs").append('<div id="'+ids+'" class="tabcontent2"></div>');
    })
    var keys = Object.keys(yearBoards[0]);
    var values = [];
    var ids = "";
    $.each(keys,function(i,v){
        ids = v.replace(" ","");
        if(ids.indexOf("JEE(Main + Advanced)") > -1){
            ids = "JEEMainAdvanced"
        }
        values =  yearBoards[0][v];
        var discount = (Number(values.price)*Number(values.discount))/100;
        var discountedPrice = Number(values.price) - discount;
        $("#"+ids).append('<div class="col-sm-12"><div class="col-sm-2"><span class="boldFont">Total<br>Sessions</span><br><span class="bigFont yellowFont">'+values.total_sessions+'</span></div><div class="col-sm-2"><span class="boldFont">Online Pre<br>Assessments</span><br><span class="bigFont yellowFont">'+values.online_pre_assignments+'</span></div><div class="col-sm-2"><span class="boldFont">Online Post<br>Assessments</span><br><span class="bigFont yellowFont">'+values.online_post_assignments+'</span></div><div class="col-sm-2"><span class="boldFont">Online <br>Practice</span><br><span class="bigFont yellowFont">'+values.online_assignments+'</span></div> <div class="col-sm-2"><span class="boldFont">Online <br>Tests</span><br><span class="bigFont yellowFont">'+values.online_tests+'</span></div><div class="col-sm-2"><span class="boldFont">Career Counselling<br>Sessions with Edu Coach</span><br><span class="bigFont yellowFont">'+values.total_sessions+'</span></div></div><div class="col-sm-12"><h5 style="font-weight:bold">Course Topic include</h5><div class="col-sm-4"><span class="yellowFont">Introduction<br><div style="color:white" id="syllabus'+ids+'"></div></span></div></div><div class="col-sm-12 monthFooter"><div class="col-sm-4"><span id="discount" style="float:right">Filling out soon</span><br><span class="bigFont">Vaccant Seats</span><span class="yellowFont bigFont">'+values.seats+' seats</span><br><span>Not a classroom, but 1:1 sessions.</span></div><div class="col-sm-4"><span id="discount" style="float:right">'+values.discount+'% OFF</span><br><span class="">Subscription cost: <span class="yellowFont">₹ '+discountedPrice+'</span> <span class="boldFont" style="font-size: 13px;"> <strike> ₹ '+values.price+'</strike></span><br><span>This cost is inclusive of the tablet cost.</span><br><span>'+values.per_class_price+'</span></span></div><div class="col-sm-2"><button class="" id="bookNow">Book Now</button></div><span style="float: left;margin-top: 20px;">You can also avail a 8 inch and 10 inch tablet with your Subscription.</span><span style="float: right;margin-top: 20px;">Guaranteed <u>terms &amp; conditions</u> apply*</span></div>');
        var syllabus = values.syllabus;
        if(Array.isArray(syllabus)){

        }else{
            var syallabusArray = syllabus.split("!");
            $.each(syallabusArray,function(i,v){
                $("#syllabus"+ids).append("<span>"+v+"</span></br>")
            })
        }
    })

    $("#CBSECourse").trigger("click");
    $("#monthGrade select").empty();
    $.each(monthGrades,function(i,v){
        $("#monthGrade select").append('<option value="'+v+'">'+v+'</option>');
    })
    
    $("#yearGrade select").empty();
    $.each(yearGrades,function(i,v){
        $("#yearGrade select").append('<option value="'+v+'">'+v+'</option>');
    })
    $("#yearlyCourse,#cbseCourse").trigger("click");
    $("#yearlyCourse,#cbseCourse").addClass("active");
    }); 
    
    
    $("body").on("click",".checkmark",function(){
        $(".checkmark").siblings().attr("checked",false);
        $(this).siblings().attr("checked",true);
    })

    $("body").on("change","#yearGrade select",function(){
        var board = $(this).val();
        var boardsNames =[];
        var currentBoard = [];
        $.each(yearlyData[0],function(i,v){
            if(v.grade == board){
                currentBoard.push(v.boards);
            }
        })
        boardsNames.push(Object.keys(currentBoard[0]))
        $(".tabcontent1 .tab").empty();
        $.each(boardsNames[0],function(i,v){
            var ids = v.replace(" ","");
            if(ids.indexOf("JEE(Main + Advanced)") > -1){
                ids = "JEEMainAdvanced"
            }
            $(".tabcontent1 .tab").append('<button class="tablinks2" id="'+ids+'Course" onclick=openCourses(event,'+ids+')>'+v+'</button>');
        })
        $(".contentTabs").empty();
        $.each(boardsNames[0],function(i,v){
            var ids = v.replace(" ","");
            if(ids.indexOf("JEE(Main + Advanced)") > -1){
                ids = "JEEMainAdvanced"
            }
            $(".contentTabs").append('<div id="'+ids+'" class="tabcontent2"></div>');
        })
        var keys = Object.keys(currentBoard[0]);
        var values = [];
        var ids = "";
        $.each(keys,function(i,v){
            ids = v.replace(" ","");
            if(ids.indexOf("JEE(Main + Advanced)") > -1){
                ids = "JEEMainAdvanced"
            }
            values =  currentBoard[0][v];
            var discount = (Number(values.price)*Number(values.discount))/100;
            var discountedPrice = Number(values.price) - discount;
            $("#"+ids).append('<div class="col-sm-12"><div class="col-sm-2"><span class="boldFont">Total<br>Sessions</span><br><span class="bigFont yellowFont">'+values.total_sessions+'</span></div><div class="col-sm-2"><span class="boldFont">Online Pre<br>Assessments</span><br><span class="bigFont yellowFont">'+values.online_pre_assignments+'</span></div><div class="col-sm-2"><span class="boldFont">Online Post<br>Assessments</span><br><span class="bigFont yellowFont">'+values.online_post_assignments+'</span></div><div class="col-sm-2"><span class="boldFont">Online <br>Practice</span><br><span class="bigFont yellowFont">'+values.online_assignments+'</span></div> <div class="col-sm-2"><span class="boldFont">Online <br>Tests</span><br><span class="bigFont yellowFont">'+values.online_tests+'</span></div><div class="col-sm-2"><span class="boldFont">Career Counselling<br>Sessions with Edu Coach</span><br><span class="bigFont yellowFont">'+values.total_sessions+'</span></div></div><div class="col-sm-12"><h5 style="font-weight:bold">Course Topic include</h5><div class="col-sm-12"><span class="yellowFont">Introduction<br><div style="color:white" id="syllabus'+ids+'"></div></span></div></div><div class="col-sm-12 monthFooter"><div class="col-sm-4"><span id="discount" style="float:right">Filling out soon</span><br><span class="bigFont">Vaccant Seats</span><span class="yellowFont bigFont">'+values.seats+' seats</span><br><span>Not a classroom, but 1:1 sessions.</span></div><div class="col-sm-4"><span id="discount" style="float:right">'+values.discount+'% OFF</span><br><span class="">Subscription cost: <span class="yellowFont">₹ '+discountedPrice+'</span> <span class="boldFont" style="font-size: 13px;"> <strike> ₹ '+values.price+'</strike></span><br><span>This cost is inclusive of the tablet cost.</span><br><span>'+values.per_class_price+'</span></span></div><div class="col-sm-2"><button class="" id="bookNow">Book Now</button></div><span style="float: left;margin-top: 20px;">You can also avail a 8 inch and 10 inch tablet with your Subscription.</span><span style="float: right;margin-top: 20px;">Guaranteed <u>terms &amp; conditions</u> apply*</span></div>');
            var syllabus = values.syllabus;
            if(Array.isArray(syllabus)){
                var keys = Object.keys(syllabus[0]);
                $("#syllabus"+ids).append("<div class='col-sm-4'><span class='yellowFont'>"+keys[0]+"</span><br><div id='key1'></div></div>")
                $("#syllabus"+ids).append("<div class='col-sm-4'><span class='yellowFont'>"+keys[1]+"</span><br><div id='key2'></div></div>")
                $("#syllabus"+ids).append("<div class='col-sm-4'><span class='yellowFont'>"+keys[2]+"</span><br><div id='key3'></div></div>")

                $("#key1").append("<span>"+syllabus[0][keys[0]]+"</span><br>");
                $("#key2").append("<span>"+syllabus[0][keys[1]]+"</span><br>");
                $("#key3").append("<span>"+syllabus[0][keys[2]]+"</span><br>");
            }else{
                var syallabusArray = syllabus.split("!");
                $.each(syallabusArray,function(i,v){
                    $("#syllabus"+ids).append("<span>"+v+"</span></br>")
                })
            }
        })
        $("#CBSECourse").trigger("click");
    })

    $("body").on("change","#monthGrade select",function(){
        var board = $(this).val();
        var boardsNames =[];
        var currentBoard = [];
        $.each(monthlyData[0],function(i,v){
            if(v.grade == board){
                if(v.boards.general != undefined){
                    currentBoard.push(v.boards.general);
                }
                if(v.boards.CBSE != undefined){
                    currentBoard.push(v.boards.CBSE);
                }
            }
        })
       // boardsNames.push(Object.keys(currentBoard[0]))
        $("#monthlyDiv").empty();
        $.each(currentBoard,function(i,v){
            $.each(v,function(i1,v1){
                var discount = (Number(v1.price)*Number(v1.discount))/100;
                var discountedPrice = Number(v1.price) - discount;
                $("#monthlyDiv").append('<div class="col-sm-12 monthEachDiv"><div class="container col-sm-1 text-center"><input type="radio" name="radio"><span class="checkmark"></span></div><div class="col-sm-3"><span class="bigFont">'+v1.valid+'</span></br><span>'+v1.refund+'</span></div><div class="col-sm-4"><span class="bigFont yellowFont"> &#x20B9; '+discountedPrice+'</span> <span class="yellowFont"> <strike> &#x20B9; '+v1.price+'</strike></span><br><span id="discount">'+v1.discount+'% OFF</span></div><div class="col-sm-4"><span class="bigFont"> &#x20B9; '+v1.per_class_price+' per session</span><br><span>'+v1.total_sessions+' Sessions</span></div></div>');
            })
        })
    })
     

});



function openType(evt, type) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent1");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks1");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(type).style.display = "block";
    evt.target.className += " active";
  }

  function openCourses(evt, courses) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks2");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    var ids = courses.attributes.id.value;
    document.getElementById(ids).style.display = "block";
    evt.target.className += " active";
  }

  