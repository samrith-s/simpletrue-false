
var base, buckets, messages, quesbank;

$(function() {
    initLayout();
    initGame();
});

function initLayout() {
    base = new Environment("base");
    buckets = new Environment("buckets");
    messages = new Environment("messages");
    
    loadConfig(base);
    loadConfig(buckets);
    
    initQuiz();
    loadConfig(messages);
}

function initGame() {
    quesbank = Question.all;
    quesbank = shuffle(quesbank);
    
    $("#statement-area").draggable({containment: "#ptotemy-game", scroll: "false", handle: "span", revert: "invalid"});
    playGame(quesbank);
}

function playGame(quesbank) {
    if(quesbank.length===0) {
        displayMessage("You win. Yay. Now get a life, probably.");
    }
    else {
        $("#statement-area").fadeIn(600);
        $("#statement-area").removeClass("no-click");
        var question = quesbank.pop();
        Question.showQuizPanel(quiz, question);
        var pos = $("#statement-area").position();
        setDroppable(question, pos);
    }
}

function setDroppable(question, pos) {
    switch(question.options[0].name) {
            case "true":
                droppableCases(1, question, pos);
                break;
            case "false":
                droppableCases(2, question, pos);
                break;          
    }
}

function droppableCases(num, question, pos) {
        $("#statement-area").removeClass("draggable1 draggable2");
        var class_ = "draggable" + num;
        $("#statement-area").addClass(class_);
        $("#bucket" + num).droppable({
            accept: "." + class_,
            drop: function(event, ui) {
                addToBucket(num, question, pos);
                $("#statement-area").addClass("no-click");
                playGame(quesbank);
            },
            revert: "invalid"
        }); 
}

function addToBucket(num, question, pos) {
    $("#statement-area").fadeOut(400);
    $("#bucket" + num + " ul").prepend("<li><span>" + question.name + "<span></li>");
    $("#statement-area").css({top: pos.top, left: pos.left});
}

function displayMessage(str) {
    $("#messages").fadeIn();
    $("#messageBox").empty().append(str);
    $("#messages").css({zIndex: 3});
}
    
            

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};