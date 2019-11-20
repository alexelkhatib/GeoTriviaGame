// make the variables
// - make an empty array -
var questions = [];
// get the ajax api
var triviaURL = 'https://opentdb.com/api.php?amount=15&category=22&difficulty=easy&type=multiple';
//to check if the user is answering questions
var isUserAnswering = false;
//sets the questionContainer
var questionContainer = $('<div>');
questionContainer.addClass('question-container');
//sets the results div
var resultsDiv = $('<div>');
resultsDiv.addClass('results-container');
//sets the timer display
var qPageTitle = $('<h1>');
qPageTitle.addClass('page-title');
//sets the timer functions
var time;
var timeID;
var currentTime;
var numCorrect;
//create the timer functions
function timeGame() {
        //set the time to minus
        if (!isUserAnswering) {
                //sets the timer to add the count function
                timeID = setInterval(count, 1000);
                isUserAnswering = true;
        }

}

function reset() {
        //sets the time back to 330 seconds
        time = 5.5 * 60;
        qPageTitle.text('05:30');
}

function count() {
        //set the decrement
        time--;
        if (time === 0) {
                //clear the interval
                clearInterval(timeID);
                endGame();
        }
        //sets time to the current time
        currentTime = timeConverter(time);
        //puts the timer at the top of the page
        qPageTitle.text(currentTime);
}

//based off the stopwatch class activity
function timeConverter(timeStamp) {
        //converts the time into something readable
        var minutes = Math.floor(timeStamp / 60);
        var seconds = timeStamp - (minutes * 60);

        if (seconds < 10) {
                seconds = "0" + seconds;
        }

        if (minutes === 0) {
                minutes = "00";
        } else if (minutes < 10) {
                minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
}


//functions to prevent multiple appends
function questionReset() {
        var questionRemove = questionContainer.empty();
        return questionRemove;
}

function resultsReset() {
        var resultsRemove = resultsDiv.empty();
        return resultsRemove;
}

function endGame() {
        console.log('this is working');
        //sets the views
        $('#sub-wrapper-questions').hide('fast');
        $('#sub-wrapper-no-time').show('fast');
        //sets the title
        var noTimeTitle = $('<h1>');
        noTimeTitle.addClass('no-time-title');
        noTimeTitle.text('You ran out of time!! Try again?');
        //sets the button
        var noTimeButton = $('<button>');
        noTimeButton.addClass('no-time-button');
        noTimeButton.attr('tabindex', '0');
        noTimeButton.text('Try Again?');
        //appends them to the page
        $('#sub-wrapper-no-time').append(noTimeTitle, noTimeButton);
}

//set up initial views
$('#sub-wrapper-questions').hide();
$('#sub-wrapper-results').hide();
$('#sub-wrapper-no-time').hide();

//main function
$(document).ready(function () {
        //activates when the user clicks the start game button
        $('#start-game')
                .on('click', function () {
                        $('#sub-wrapper-start').hide('fast');
                        $('#sub-wrapper-questions').show('fast');
                        questionReset();
                        //calls the timer
                        reset();
                        timeGame();
                        //appends the timer to the page
                        questionContainer.append(qPageTitle);
                        //grabs the api
                        $
                                .ajax({
                                        url: triviaURL,
                                        method: 'GET'
                                })
                                //then puts the questions and choices to the page
                                .then(function (data) {
                                        console.log('we got this back!!', data);

                                        for (var i = 0; i < data.results.length; i++) {
                                                //pushes the data to the questions array
                                                questions.push(data.results[i]);
                                        }

                                        for (var i = 0; i < questions.length; i++) {
                                                //console.log('working'); create a div to put inside sub wrapper

                                                var questionDiv = $('<div>');
                                                //give it a class of question title
                                                questionDiv.addClass('question-block');
                                                //questions create a label for the questions
                                                var questionTitle = $('<h4>');
                                                questionTitle.addClass('question-title');
                                                questionTitle.text(questions[i].question);
                                                questionDiv.append(questionTitle);

                                                // create input area
                                                var questionInputs = $('<div>');
                                                questionInputs.addClass('question-slot');
                                                //create radio buttons for correct answer
                                                var correctAns = $('<div>');
                                                var correctAnsInput = $('<input>')
                                                var correctAnsLabel = $('<label>');
                                                //add the attributes and the classes
                                                correctAnsInput.attr('type', 'radio');
                                                correctAnsInput.attr('value', questions[i].correct_answer);
                                                correctAnsInput.addClass('correct');
                                                correctAns.addClass('qChoice');
                                                correctAnsInput.attr('tabindex', '0');
                                                correctAnsInput.attr('name', questions[i].question);
                                                //form validation
                                                correctAnsInput.attr('required', 'true');
                                                //set the label text to the correct answer
                                                correctAnsLabel.text(questions[i].correct_answer);
                                                correctAns.append(correctAnsInput, correctAnsLabel);
                                                // push all of them into the respective divs
                                                questionInputs.append(correctAns);
                                                //set up the incorrect Answers divs
                                                for (var k = 0; k < questions[i].incorrect_answers.length; k++) { //sets the variables
                                                        var choice = $('<div>');
                                                        var choiceInput = $('<input>');
                                                        var choiceLabel = $('<label>');
                                                        //add classes and attributes
                                                        choiceInput.attr('type', 'radio');
                                                        choiceInput.attr('name', questions[i].question);
                                                        choiceInput.attr('value', questions[i].incorrect_answers[k]);
                                                        choiceInput.attr('tabindex', '0');
                                                        choice.addClass('qChoice');
                                                        //set the text
                                                        choiceLabel.text(questions[i].incorrect_answers[k]);
                                                        //appends the variables to the questionInput div
                                                        choice.append(choiceInput, choiceLabel);
                                                        questionInputs.append(choice);
                                                }
                                                // make the questions appear in random put into questionDiv. got solution from
                                                // StackOverflow:
                                                // https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-elem
                                                // e nt-order
                                                for (var j = questionInputs.children().length; j >= 0; j--) {
                                                        questionInputs.append(questionInputs.children()[Math.random() * j | 0]);
                                                }
                                                //put questionInputs into questionDiv
                                                questionDiv.append(questionInputs);
                                                //console.log('this is our questions div', questionDiv);

                                                questionContainer.append(questionDiv);

                                                //push all of them into the sub wrapper console.log(questionDiv);
                                        }
                                        //create a submit button and give it class and text
                                        var questionSubmit = $('<button>');
                                        questionSubmit.addClass('question-submit');
                                        questionSubmit.attr('tabindex', '0');
                                        questionSubmit.text('Submit Questions');
                                        questionContainer.append(questionSubmit);
                                        //append container to the sub-wrapper-div
                                        $('#sub-wrapper-questions').append(questionContainer);

                                        /*
                                         */

                                });

                });




        $('form').on('submit', function (event) {
                //prevents the default action
                event.preventDefault();
                //sets isUserAnswering back to it starting value
                isUserAnswering = false;
                //sets the time back to 5:30
                stop();
                // take the values of the checked radio buttons. Got this from tutoring session
                var values = $("input:checked");
                //needed to log the correct answers
                numCorrect = 0;
                for (var i = 0; i < values.length; i++) {
                        //if correct is in the input
                        if ($(values[i]).hasClass("correct")) {
                                //add that to the numCorrect
                                numCorrect++;
                        }
                }

                //sets the new views
                $('#sub-wrapper-questions').hide('fast');
                $('#sub-wrapper-no-time').hide();
                $('#sub-wrapper-results').show('fast');

                //creates the view contents
                var resultsTitle = $('<h1>');
                resultsTitle.addClass('results-title');
                resultsTitle.text('Here are the results!');

                var resultsTally = $('<h2>');
                resultsTally.addClass('results-tally');
                resultsTally.text('You got ' + numCorrect + ' out of ' + questions.length + '!');

                var resultsButton = $('<button>');
                resultsButton.addClass('results-button');
                resultsButton.attr('tabindex', '0');
                resultsButton.text('Replay Game?');
                //adds the variables to the view
                resultsDiv.append(resultsTitle, resultsTally, resultsButton);
                $('#sub-wrapper-results').append(resultsDiv);
                //sets the questions.length back to zero
                questions = [];
                //makes sure that questions.length is back to zero
                questionReset();

        });

        $(document).on('click', '.results-button', function () {
                //sets the views
                $('#sub-wrapper-results').hide('fast');
                $('#sub-wrapper-start').show('fast');
                //prevents the results from duplicating
                resultsReset();
        });

        $(document).on('click', '.no-time-button', function () {
                //sets the views
                $('#sub-wrapper-no-time').hide('fast');
                $('#sub-wrapper-start').show('fast');
                //sets the questions.length back to zero
                questions = [];
                //makes sure that questions.length is back to zero
                questionReset();
                //resets the timer
                reset();
                timeGame();

        });

});