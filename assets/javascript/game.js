var charDetails = [
	{"name":"char1",
	 "healthPoint" : 110,
	 "attackPoint" : 8,
	 "nameValue" : "Kenobi"},
	 {"name":"char2",
	 "healthPoint" : 120,
	 "attackPoint" : 5,
	 "nameValue" : "Skywalker"},
	 {"name":"char3",
	 "healthPoint" : 150,
	 "attackPoint" : 11,
	 "nameValue" : "Darth"},
	 {"name":"char4",
	 "healthPoint" : 180,
	 "attackPoint" : 25,
	 "nameValue" : "Darth Maul"}
];

var character ={
	"name": "",
	"img" : "",
	"enemy" : [],
	"baseAttackPoint" : 0,
	"healthPoint" : 0,
	"attackPoint" : 0,
	"nameValue" : ""
};

var enemy ={
	"name":"",
	"img" : "",
	"attackPoint" :0,
	"healthPoint" : 0,
	"nameValue" : ""
};

var yourChar = "";
var charGlobalHealthPoint =0;
var enemyGlobalHealthPoint = 0;
var masterListOfDivs = [];

function getData(){
	for(var i=0; i< charDetails.length;i++){
		var name = charDetails[i].name;
		var charImgDivs = $("#yourChar div img");
		var charDivs = $("#yourChar div");
		for(var j=0; j< charDivs.length; j++){
			if($(charImgDivs[j]).attr("id") ===  name){
				$(charDivs[j]).children("h3").html(charDetails[i].nameValue);
				$(charDivs[j]).children("span").html(charDetails[i].healthPoint);
				break;
			}
	}
	}
	}

function resetCharacter(){
	character.nameValue ="";
	character.name ="";
	character.img = "";
	character.enemy = [];
	character.baseAttackPoint = 0;
	character.healthPoint = 0;
	character.attackPoint = 0;
};

function resetEnemy(){
	enemy.nameValue ="";
	enemy.name ="";
	enemy.img = "";
	enemy.attackPoint = 0;
	enemy.healthPoint = 0;
}

$(document).ready(function() {


$("#nextFromFirst").on("click",function(){
	$("#characterScreen").hide();
	$("#enimiesScreen").show();
});

$("#nextFromSecond").on("click",function(){
	$("#enimiesScreen").hide();
});


$(document).on("click", "div.img", function(){
		$("#nextFromFirst").show();
		character.name = $(this).children("img").attr("value");
		character.img = $(this).children("img").attr("src");
		var details = getCharDetails(character.name);
		character.healthPoint = details.healthPoint;
		character.baseAttackPoint = details.attackPoint;
		character.nameValue = details.nameValue;
		charGlobalHealthPoint = character.healthPoint;
		var charsInDiv = $("div.img");
		for(var i=0; i < charsInDiv.length;i++){
			console.log("name=== ",$(charsInDiv[i]).children("img").attr("value"));
			if(character.name != $(charsInDiv[i]).children("img").attr("value")){
				console.log(charsInDiv[i]);
				masterListOfDivs.push(charsInDiv[i]);
				$(charsInDiv[i]).removeClass("img");
				$(charsInDiv[i]).remove();
				$(charsInDiv[i]).addClass("enemy");
				$("#enemies").html(function(){
					$("#enemies").append(charsInDiv[i]);
				});
			}else{
				var yourCharClone = $(charsInDiv[i]).clone();
				yourCharClone.removeClass("img");
				yourCharClone.addClass("defender");
				$("#yourCharToFight").append(yourCharClone);
			}
		}
		console.log("masterListOfDivs",masterListOfDivs);
	});

	$(document).on("click", "#enemies .enemy", function() {
		
		$("#enimiesScreen").hide();
		$("#defenderScreen").show();
		$("#enemyShooting").fadeIn();
		$("#enemyProgress").fadeIn();
		$("#enemyBar").css("width","100%");
		$("#enemyBar").text("100%");
		$("#attackButton").show();
		$("#getEnemy").hide();
		var defender = $("#defender div");
		if(defender.length == 0){
			enemy.name = $(this).children("img").attr("value");
			enemy.img = $(this).children("img").attr("src");
			var details = getCharDetails(enemy.name);
			enemy.healthPoint = details.healthPoint;
			enemy.attackPoint = details.attackPoint;
			enemy.nameValue = details.nameValue;
			enemyGlobalHealthPoint = enemy.healthPoint;
			character.enemy = enemy;
			// var charsInDiv = $("#enemies img");
			$(this).remove();
			$(this).removeClass("enemy");
			$(this).addClass("defender");
			$("#defender").append($(this));
		}else{
			alert("defender already added!!");
		}	
});
	
	var j=1;
	$("#attackButton").on("click", function(){
		if((character.healthPoint > 0) &&	 (enemy.healthPoint > 0)){
			attack(j);
			$("#score").text("You Attacked "+enemy.nameValue+" for "+character.attackPoint+" damage.");
			$("#score").append(enemy.nameValue+" Attacked you back for "+enemy.attackPoint+" damage.");
			// $("#score").append("Your Score : "+character.healthPoint);
			// $("#score").append("Defender's Score : "+enemy.healthPoint);
			j++;
		}
		if(character.healthPoint <= 0){
			$("#reset").show();
			$("#attackButton").hide();
			$("#enemyShooting").fadeOut(500);
			$("#scoreBoard").css("color","red");
			$("#scoreBoard").text("YOU LOOSE!!");
				$("#defenderScreen").slideUp(1000,function(){
					$("#winnerScreen").slideDown(1000);
				});
		} else if(enemy.healthPoint <= 0){
			$("#defender .defender").fadeOut(1500,function(){
				$("#defender .defender").remove();
				$("#enemyShooting").fadeOut(1500);
				$("#enemyProgress").fadeOut();
			});
			
			if($("#enemies .enemy").length != 0){
				$("#getEnemy").show();
			}
			else{
				// $("#reset").show();
				$("#scoreBoard").text("YOU WIN!!");
				$("#defenderScreen").slideUp(1000,function(){
					$("#winnerScreen").slideDown(1000);
				});
				
				
			}
			$("#attackButton").hide();
		}

		$("#getEnemy").on("click",function(){
			$("#enimiesScreen").show();
			$("#defenderScreen").hide();
		});
		updateHealtPoints();
		updateProgressBars();
		// if(shooting)
		// $("#shooting").css("animation","");
	});
	function updateHealtPoints(){
		$("#yourCharToFight .defender").children("span").text(character.healthPoint);
		$("#yourChar .img").children("span").text(character.healthPoint);
		$("#defender .defender").children("span").text(enemy.healthPoint);

	};

	function getCharDetails(charName){
		var detailsArray = {"name" : "", "healthPoint" : 0, "attackPoint" :0, "nameValue": ""};
		for(var i=0; i<charDetails.length; i++){
			if(charDetails[i].name === charName){
				detailsArray = charDetails[i];
				console.log(detailsArray);
				return detailsArray;
			}
		}
	};

	function updateProgressBars(){
		var charHealthPercetile = Math.floor((character.healthPoint/charGlobalHealthPoint)*100);
		var enemyHealthPercentile = Math.floor((enemy.healthPoint/enemyGlobalHealthPoint)*100);
		$("#myBar").css("width",charHealthPercetile+"%");
		$("#myBar").text(charHealthPercetile+"%");
		$("#enemyBar").css("width",enemyHealthPercentile+"%");
		$("#enemyBar").text(enemyHealthPercentile+"%");
	};

	function attack(noOfTimes){
		character.attackPoint = noOfTimes * character.baseAttackPoint;
		character.healthPoint -= enemy.attackPoint;
		enemy.healthPoint -= character.attackPoint; 
		animation();
	};

		

	function animation(){
		if(character.attackPoint < enemy.attackPoint){
			$("#enemyShooting").addClass("enemyShooting");
			$("#shooting3").addClass("shooting3Class");
   			 setTimeout(function(){
   			 	// alert("inside setTimeout")
   			 	$("#enemyShooting").removeClass("enemyShooting");
   			 	$("#shooting3").removeClass("shooting3Class");
   			 	$("#fire").addClass("fireClass");
   			 	$("#fire").show();
   			 	setTimeout(function(){
   			 		$("#fire").removeClass("fireClass");
   			 	},300);
    		},1500);
		}else{
			$("#shooting3").addClass("shooting3Class");
			$("#enemyShooting").addClass("enemyShooting");
   			 setTimeout(function(){
   			 	$("#shooting3").removeClass("shooting3Class");
   			 	$("#enemyShooting").removeClass("enemyShooting");
   			 	$("#charFire").addClass("charFire");
   			 	$("#charFire").show();
   			 	setTimeout(function(){
   			 		$("#charFire").removeClass("charFire");
   			 	},300);
    		},1500);
		}
	};

	function reset(){
		$("#enemies").html("");
		$("#defender").html("");
		$("#yourCharToFight").html("");
		$("#scoreBoard").html("");
		$("#score").html("");
		$("#yourChar").html("");
        $("#yourChar").html('<div id="char1Div" class="img">'
        	+'<h3 id="name1"></h3><img id="char1" src="assets/images/kenobi1.jpg" value="char1">'
        	+'<br><span id="healthPoint1"></span></div>'
        	+'<div id="char2Div" class="img"><h3 id="name2"></h3>'
        	+'<img id="char2" src="assets/images/skywalker1.jpg" value="char2"><br>'
        	+'<span id="healthPoint2"></span></div>'
        	+'<div id="char3Div" class="img"><h3 id="name3"></h3>'
        	+'<img id="char3" src="assets/images/sidious.jpg" value="char3"><br>'
        	+'<span id="healthPoint3"></span></div>'
        	+'<div id="char4Div" class="img"><h3 id="name4"></h3>'
        	+'<img id="char4" src="assets/images/maul.png" value="char4"><br>'
        	+'<span id="healthPoint4"></span></div>');
        $("#yourChar").addClass("imgContainer");

        resetCharacter();
        resetEnemy();
        j=1;
        enemyGlobalHealthPoint =0;
        charGlobalHealthPoint =0;
        $("#winnerScreen").hide();
        $("#characterScreen").show();
        $("#myBar").css("width","100%");
        $("#enemyBar").css("width","100%");
        $("#myBar").text("100%");
        $("#enemyBar").text("100%");
        //("#notShow").clone().appendTo("#yourChar");
        getData();
		//$("#yourChar").append(masterListOfDivs);
		// html(function(){
		// 	console.log(masterListOfDivs);
		// 	$("#yourChar").append(masterListOfDivs);
		//	$("#yourChar img").removeClass("enemy");
		// });


	};

	$("#reset").on("click",function(){
		reset();
	});
});
	



