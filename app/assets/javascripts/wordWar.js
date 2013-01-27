// naughty globals
var question;
var qNumber = 1;
var finished = false;
var firstIncorrect = true;

$(document).ready(function() {
  setupCountdown($);
  	$("#part1").text("You need to fill in the ");
	$("#answer").text("BLANK");
	$("#part2").text("spaces in the sentences");

});
	

function startQuiz() {
	//start countdown
	setupCountdown($);
	startCountdown(60);
	$("#start-btn").remove();
	loadQuestion();
}


function startCountdown(timerSeconds){
	var ts = (new Date()).getTime() + timerSeconds*1000;

	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){

			if (seconds === 0 && finished === false) {
				finished = true;
				tooSlow();
			}
		}
	});

}

function stopCountdown() {
	$('#countdown').remove();
}


function loadQuestion() {
	finished = false;
	firstIncorrect = true;
	//show question
	var questions = JSON.parse(localStorage.getItem("questions"));
	question = questions.all_questions[qNumber];
	if (qNumber >= 6) {
		finishedQuiz();
		return;
	}
	$("#part1").text(question.part1);
	$("#answer").text("BLANK");
	$("#part2").text(question.part2);

	var questionClass = "#question-" + qNumber;
	$(questionClass).addClass("active");

	var prevQuestionClass = "#question-" + (qNumber-1);

	var qNumberClass = "#qNumber-" + qNumber;
	$(qNumberClass).removeClass("badge-default");
	$(qNumberClass).addClass("badge-warning");
	
	//render buttons
	
	for (var i = 1; i < questions.all_questions.length; i++)  {
		$("#answer-buttons").append("<button type='button' class='answer-btn btn btn-xlarge btn-primary'>" + questions.all_questions[i].word + "</button>");
	}
	


	//attach click handlers to buttons
	document.getElementById("answer-buttons").onclick = function () {
		checkAnswer(event.target.innerText);
		return false;
	};

	qNumber = qNumber + 1;
	
}



function checkAnswer(answer) {
	if (question.word === answer) {
		correctAnswer(answer);
	} else {
		incorrectAnswer(answer);
	}

	console.log(answer);
}

function tooSlow() {
	$("#answer").text("Game over");
	finishQuestion();
}

function correctAnswer(answer) {
	if (firstIncorrect === false) {
		addPoints = 5;
	} else {
		addPoints = 10;
	}
	oldScore = $("#number-points").text();
	newScore = Number(oldScore) + addPoints;
	$("#number-points").text(newScore);
	$("#number-points-small-screen").text(newScore + " points");
	$("#answer").text(answer + " is correct!");
	finishQuestion();

}

function incorrectAnswer(answer) {
	if (firstIncorrect === true) {
		//just disable button or something
		firstIncorrect = false;
	}
	else {
	
	$("#answer").text("Too many wrong answers...");
	finishQuestion();
	}

}

function finishQuestion() {
	$("#part1").text("");
	$("#part2").text("");
	$("#answer-buttons").html("");
	finished = true;
	setTimeout(function() {loadQuestion();}, 1000);
}

function finishedQuiz() {
	stopCountdown();
	var pointsScored = $("#number-points").text();
	$("#answer").text("Game complete, you scored " + pointsScored + " points");

	$.ajax({
		url: "users/points?additional_points=" + pointsScored,
		type: "post"
		}).done(function ( data ) {
			//Submit score, show leaderboard
			//setTimeout(function() {window.location.href = "../users";}, 3000);
			window.location.href = "../users";
		});
	
}
