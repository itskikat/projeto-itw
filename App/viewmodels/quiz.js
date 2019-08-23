define(function () {
    return {
        displayName: 'quiz'

    }
});

//quiz
$().ready(function() {
    setTimeout(function(){
        $(".brown").css(({"font-size": "200%", "color": "#993300"}));
        $(".brown_title").css(({"color": "#993300"}));
        $(".text").css(({"font-size": "105%"}));


    var questions = [{
        question: "Referente ao nome «Prémio Nobel», Nobel surge do apelido de um cientista sueco. Qual é o seu primeiro nome?",
        choices: ["Artur", "Alfred", "Schwarzenegger", "Steve"],
        correctAnswer: 1
    }, {
        question: "O que é o prémio Nobel?",
        choices: ["Conjunto de 6 moedas de ouro.", "Conjunto de cientistas e professoes que defendem o bem.", 
        "Conjunto de 6 prémios anuais concebidos em diferentes categorias.", 
        "Conjunto de deveres cumpridos por um cidadão anualmente."],
        correctAnswer: 2
    }, {
        question: "Como é escolhido o laureado?",
        choices: ["Através do envio de um email para uma pessoa de forma aleatória.", 
        "A partir do envio de cartas pelos comitês de cada categoria para milhares de professores e cientistas a pedir informação sobre o candidato", 
        "A partir de uma sondagem via eletrónica", 
        "Aleatoriamente, por um computador"],
        correctAnswer: 1
    }, {
        question: "Quem recusou o Prémio Nobel?",
        choices: ["Jean-Paul Sartre", 
        "Marcelo Rebelo de Sousa", 
        "Marie Currie", 
        "Cristiano Ronaldo"],
        correctAnswer: 0
    }, {
        question: "Hitler ordenou a recusa por parte de cidadãos alemães do tão prestigiado Prémio Nobel. Quantos foram obrigados a recusar?",
        choices: ["3", "1", "5", "6"],
        correctAnswer: 0
    }];

    var currentQuestion = 0;
    var correctAnswers = 0;
    var quizOver = false;



    displayCurrentQuestion();
    $(this).find(".seleciona").hide();

    $(".proxima_questao").on("click", function () {
        if (!quizOver) {
            value = $("input[type='radio']:checked").val();
            if (value == undefined) {
                $(document).find(".seleciona").text("Selecione uma opção");
                $(document).find(".seleciona").show();
            } else {
                $(document).find(".seleciona").hide();
                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    $(document).find(".proxima_questao").text("Jogar de Novo ");
                    quizOver = true;
                }
            }
        } else {
            quizOver = false;
            $(document).find(".proxima_questao").text("Próxima questão");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

    // mostrar questão atual
    function displayCurrentQuestion() {
        console.log("Current question in display");
        var question = questions[currentQuestion].question;
        var questionClass = $(document).find(".quizContainer > .question");
        var choiceList = $(document).find(".quizContainer > .choiceList");
        var numChoices = questions[currentQuestion].choices.length;
        $(questionClass).text(question);
        $(choiceList).find("li").remove();
        var choice;
        for (i = 0; i < numChoices; i++) {
            choice = questions[currentQuestion].choices[i];
            $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
        }
    }

    // reset ao quiz
    function resetQuiz() {
        currentQuestion = 0;
        correctAnswers = 0;
        hideScore();
    }

    // mostrar resultado do quiz
    function displayScore() {
        $(document).find(".quizContainer > .result").text("      Acertou " + correctAnswers + "  de  " + questions.length + " respostas corretas. "+ " Quer jogar novamente ? ");
        $(document).find(".quizContainer > .result").show();
    }

    // esconder resultado do quiz
    function hideScore() {
        $(document).find(".result").hide();
    }


    }, 1000);

});
