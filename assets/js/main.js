
var base, buckets, quesbank;

$(function() {
    initLayout();
    initGame();
});

function initLayout() {
    base = new Environment("base");
    buckets = new Environment("buckets");
    
    loadConfig(base);
    loadConfig(buckets);
    
    initQuiz();
}

function initGame() {
    quesbank = Question.all;
    quesbank = shuffle(quesbank);
    
    $("#statement-area").draggable({containment: "#ptotemy-game", scroll: "false", revert: "invalid"});
    playGame(quesbank);
    
}

function playGame(quesbank) {
    $("#statement-area").fadeIn(600);
    var question = quesbank.pop();
    console.log(question);
    Question.showQuizPanel(quiz, question);
    var pos = $("#statement-area").position();
    setDroppable(question, pos);
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
        $("#statement-area").removeClass("draggable1, draggable2");
        var class_ = "draggable" + num;
        console.log(class_);
        $("#statement-area").addClass(class_);
        $("#bucket" + num).droppable({
            accept: "." + class_,
            drop: function(event, ui) {
                addToBucket(num, question, pos);
                playGame(quesbank);
            },
            revert: "valid"
        }); 
}

function addToBucket(num, question, pos) {
    $("#statement-area").fadeOut(400);
    $("#bucket" + num + " ul").prepend("<li>" + question.name + "</li>");
    $("#statement-area").css({top: pos.top, left: pos.left});
}
            

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};