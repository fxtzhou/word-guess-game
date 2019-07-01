
        // List of possible words
        var wordList = ["adagio", "allegro", "andante", "cadenza", "capriccio", "concerto", "crescendo", "diminuendo",
            "dolce", "fermata", "fortissimo", "larghetto", "largo", "legato", "leggiero", "lento", "pianissimo",
            "pianoforte", "pizzicato", "presto", "ritardando", "rubato", "scherzo", "sforzando", "vibrato", "vivace"
        ];

        var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];



        var currentWord = [];

        var wordBeingGuessed = [];
        var guessedLetters = []; //letters guessed by user
        const maxAttempts = 8;
        var guessesLeft = 0;
        var wins = 0;
        var losses = 0;
        var gameStart = false; //game start
        var gameOver = false; //press any key to reset

        
        document.getElementById("play-again").style.display = "none";
            document.getElementById("game-over").style.display = "none";
            document.getElementById("you-win").style.display = "none";


        function newGame() {
            guessesLeft = maxAttempts;
            gameStart = false;
            currentWord = wordList[Math.floor(Math.random() * wordList.length)];
            console.log(currentWord);
            wordBeingGuessed = [];
            guessedLetters = [];

            for (i = 0; i < currentWord.length; i++) {

                console.log(currentWord.length);
                wordBeingGuessed.push("_");
            }


            document.getElementById("play-again").style.display = "none";
            document.getElementById("game-over").style.display = "none";
            document.getElementById("you-win").style.display = "none";
            updateDisplay();
        };

        function updateDisplay() {
            document.getElementById("wins").innerText = wins;
    document.getElementById("current-word").innerText = "";
    for (var i = 0; i < wordBeingGuessed.length; i++) {
        document.getElementById("current-word").innerText += wordBeingGuessed[i];
    }
    document.getElementById("guesses-left").innerText = guessesLeft;
    document.getElementById("guessed").innerText = guessedLetters;
    if(guessesLeft <= 0) {
        document.getElementById("game-over").style.display = "block";
        document.getElementById("play-again").style.display = "block";
        gameOver = true;
    }
        };


        //when user presses a key to reset the game
        newGame();
        document.onkeyup = function (event) {
            
            if (gameOver) {
                newGame();
                gameOver = false;
                
            } else {
                if (event.keyCode >= 65 && event.keyCode <= 90) {
                    newWord(event.key); //makes a new word
                }
            }


            function newWord(letter) {
                if (guessesLeft > 0) {
                    if (!gameStart) {
                        gameStart = true;
                    }
                }

                if (guessedLetters.indexOf(letter) === -1) {
                    guessedLetters.push(letter);
                     //puts that letter into the letter guessed
                    validGuess(letter); //see if the letter was part of the word
                }
            }

            updateDisplay();
            checkWin();
        };

        function validGuess(letter) {
            var position = [];
            for (var i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === letter) {
                    position.push(i);
                }
            }

            if (position.length <= 0) {
                guessesLeft--;
            } else {
                for (var i = 0; i < position.length; i++) {
                    wordBeingGuessed[position[i]] = letter;
                }
            }
        };



        function checkWin() {
            if (wordBeingGuessed.indexOf("_") === -1) { //if the word has no more dashes left
                document.getElementById("you-win").style.display = "block";
                document.getElementById("play-again").style.display = "block";
                wins++;
                gameOver = true;
            }
        }
    
    
