//initialize html elements 
const easy = document.getElementById('buttonEasy'); 
const hard = document.getElementById('buttonHard'); 
const container = document.getElementById('boardContainer');
//some global variables
let correctGuesses = []
let successes = 0 ;
let incorrectGuesses = 0; 
let gameNum; 
//word generator
function generateWord(difficulty){
    if(difficulty === 'easy')
    {
        //let wordIndex = 0; 
        const wordsEasy = ['ant','apple','banana','boom','car','cap','deer','eagle','fox','gorilla']
        const index = Math.floor(Math.random() * 10);
        const word = wordsEasy[index]; 
        wordsEasy.splice(index,1);
        console.log(word);
        return word;
    }else{
        const wordsHard = ['tell a tale','lost and found','easy does it','spectacular','lacrosse','premium','fracture','jingle bell','phoenix','rye']
        const indexHard = Math.floor(Math.random() * 10);
        const wordhard = wordsHard[indexHard]; 
        wordsHard.splice(indexHard,1); 
        console.log(wordhard);
        return wordhard; 
    }
}
//generate board
const generateBoard = function(word, wordNum){
    const imagePath = 'assets/gallows.png'
    const gameboard = document.createElement('div');
    const secretContainer = document.createElement('div'); 
    const exit = document.createElement('div');
    const hangmanContainer = document.createElement('div'); 
    const hangman = new Image(); 
    const alphabetContainer = document.createElement('div');
    const x = "\u2716"
    hangmanContainer.setAttribute('id','hangmanContainer'); 
    hangman.setAttribute('id','hangman'); 
    gameboard.setAttribute('id',"gameboard");
    secretContainer.setAttribute('id','secretContainer');
    exit.setAttribute("id","exit");
    alphabetContainer.setAttribute('id','alphabetContainer');
    exit.textContent = x;
    hangman.src = imagePath;
    hangmanContainer.appendChild(hangman); 
    gameboard.appendChild(hangmanContainer);
    container.appendChild(gameboard);
    gameboard.appendChild(exit);
    //container.appendChild(secretContainer);
    exit.addEventListener('click',clearBoard);
    gameboard.appendChild(alphabetContainer);
    gameboard.appendChild(secretContainer);
    generateSecret(word);
    generateAlphabetButtons(alphabetContainer,word); 
};
//generate secret 
const generateSecret = function(word){
    for(var i = 0; i < word.length; i++){
        let char = word.charAt(i);
        if(char !== ' '){
            const secret = document.createElement('div');
            secret.style.backgroundColor= '#eee';
            secret.style.height='15px';
            secret.style.width='15px';
            secret.style.padding='5px';
            secret.style.display = 'inline-block';
            secretContainer.appendChild(secret);
            const space = document.createElement('div');
            space.style.backgroundColor= '#87CEEB';
            space.style.height='3px';
            space.style.width='3px';
            space.style.padding='5px';
            space.style.display = 'inline-block';
            secretContainer.appendChild(space);
        }
        else
        {
            //spaces in between words in a phrase
            const secret = document.createElement('div');
            secret.style.backgroundColor= '#87CEEB';
            secret.style.height='15px';
            secret.style.width='8px';
            secret.style.padding='15px';
            secret.style.display = 'inline-block';
            secretContainer.appendChild(secret);
        }
    }
};
//easy round
const easyRound = function(){
    //clear board
    incorrectGuesses = 0;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    //set indicator for user selection as a border
    easy.style.border = '2px solid black';
    hard.style.border=null; 
    //generate an easy word
    const word = generateWord('easy');
    generateBoard(word);
    //play game
};
//hard round
function hardRound(){
    //clear board
    incorrectGuesses = 0;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    //set indicator for user selection as a border
    hard.style.border = '2px solid black';
    easy.style.border=null; 
    //generate an easy word
    const word = generateWord('hard');
    generateBoard(word);
    //play game
}
//clear board
function clearBoard(){
    gameboard.remove();
    easy.style.border=null;
    hard.style.border=null;
    //need to reset relevant variables too
    incorrectGuesses = 0;
}
//alphabebt buttons
function generateAlphabetButtons(alphabetContainer,word) {
    for (let i = 65; i <= 90; i++) { 
      const uppercaseLetter = String.fromCharCode(i);
      const button = document.createElement("button");
      button.textContent = uppercaseLetter;
      const letter = uppercaseLetter.toLowerCase()
      button.addEventListener("click", () => makeGuess(letter,word,button));
      alphabetContainer.appendChild(button);
    }
}
//event invoked when alphabet button is clicked
function makeGuess(letter, word, button) {
    button.style.backgroundColor = '#87CEEB';
    let success = 0;
    console.log("makeGuess called");
    console.log(letter);
    //scan the word, check if the selected letter is in the word
    for(let i = 0; i < word.length; i++) {
        let currentLetter = word.charAt(i)
        //if it is, update the secret word
        if(letter == currentLetter) {
            //FLAG TO NOTE WHETHER THIS CALL TO MAKE GUESS WAS A SUCCESS OR NOT
            success = 1;
            successes = successes + 1;
            correctGuesses.push(currentLetter);
            console.log(correctGuesses);
            //replace the div content with the selected letter
            secretContainer.innerHTML = ''; //delete children of secretContainer
            updateSecret(word, currentLetter)
            if(successes >= word.length){
                alert("you win!");
            }
            //exit the loop to make sure updateSecret is only called 1 time 
            break;
        }
    }
    if(success != 1){
        incorrectGuesses = incorrectGuesses + 1; 
        updateHangman();
    }
    console.log(incorrectGuesses);
}
//creates a new row of divs, where the correctly guess letters are shown 
function updateSecret(word, guessedLetter) {
    //scan the word 
    for(var i = 0; i < word.length; i++){
        let char = word.charAt(i);
        if(char !== ' ' && char !== guessedLetter && !correctGuesses.includes(char)){
            //grey boxes
            console.log("grey box");
            const secret = document.createElement('div');
            secret.style.backgroundColor= '#eee';
            secret.style.height='15px';
            secret.style.width='15px';
            secret.style.padding='5px';
            secret.style.display = 'inline-block';
            secretContainer.appendChild(secret);
            //spaces in between
            const space = document.createElement('div');
            space.style.backgroundColor= '#87CEEB';
            space.style.height='3px';
            space.style.width='3px';
            space.style.padding='5px';
            space.style.display = 'inline-block';
            secretContainer.appendChild(space);
        }else if(char !== ' ' && char == guessedLetter){
            console.log("letter");
            const letterDiv = document.createElement('div');
            letterDiv.textContent = char.toUpperCase();
            letterDiv.style.backgroundColor = '#fff';
            letterDiv.style.height = '15px';  
            letterDiv.style.width = '15px';   
            letterDiv.style.padding = '5px';
            letterDiv.style.display = 'inline-block';  
            secretContainer.appendChild(letterDiv);
            // Spaces in between
            const space = document.createElement('div');
            space.style.display = 'inline-block';  
            space.style.height='3px';
            space.style.width='3px';
            space.style.padding='5px'; 
            secretContainer.appendChild(space);
        //we also need to make letterDivs if the current char is in correctGuesses
        }else if(char !== ' ' && correctGuesses.includes(char)){
            const letterDiv1 = document.createElement('div');
            letterDiv1.textContent = char.toUpperCase();
            letterDiv1.style.backgroundColor = '#fff';
            letterDiv1.style.height = '15px';  
            letterDiv1.style.width = '15px';   
            letterDiv1.style.padding = '5px';
            letterDiv1.style.display = 'inline-block'; 
            secretContainer.appendChild(letterDiv1);
            // Spaces in between
            const space1 = document.createElement('div');
            space1.style.display = 'inline-block';  
            space1.style.height='3px';
            space1.style.width='3px';
            space1.style.padding='5px'; 
            secretContainer.appendChild(space1);
        //last option is the current char is a space
        }else{
            //spaces in between words in a phrase
            const secret = document.createElement('div');
            secret.style.backgroundColor= '#87CEEB';
            secret.style.height='15px';
            secret.style.width='8px';
            secret.style.padding='15px';
            secret.style.display = 'inline-block';
            secretContainer.appendChild(secret);
        }
    }
}
function updateHangman(){
    if(incorrectGuesses == 1){
        const imagePath = `assets/head.png`;
        document.getElementById('hangmanContainer').innerHTML = '';
        const hangman1 = new Image(); 
        hangman1.src = imagePath
        hangmanContainer.appendChild(hangman1);
    }else if(incorrectGuesses == 2){
        document.getElementById('hangmanContainer').innerHTML = '';
        const imagePath = `assets/body.png`;
        document.getElementById('hangmanContainer').innerHTML = '';
        const hangman2 = new Image(); 
        hangman2.src = imagePath
        hangmanContainer.appendChild(hangman2);
    }else if(incorrectGuesses == 3){
        document.getElementById('hangmanContainer').innerHTML = '';
        const imagePath = `assets/left_arm.png`;
        document.getElementById('hangmanContainer').innerHTML = '';
        const hangman3 = new Image(); 
        hangman3.src = imagePath
        hangmanContainer.appendChild(hangman3);
    }else if(incorrectGuesses == 4){
        document.getElementById('hangmanContainer').innerHTML = '';
        const imagePath = `assets/right_arm.png`;
        document.getElementById('hangmanContainer').innerHTML = '';
        const hangman4 = new Image(); 
        hangman4.src = imagePath
        hangmanContainer.appendChild(hangman4);
    }else if(incorrectGuesses == 5){
        document.getElementById('hangmanContainer').innerHTML = '';
        const imagePath = `assets/left_leg.png`;
        document.getElementById('hangmanContainer').innerHTML = '';
        const hangman5 = new Image(); 
        hangman5.src = imagePath
        hangmanContainer.appendChild(hangman5);
    }else if(incorrectGuesses == 6){
        document.getElementById('hangmanContainer').innerHTML = '';
        const imagePath = `assets/game_over.png`;
        document.getElementById('hangmanContainer').innerHTML = '';
        const hangman6 = new Image(); 
        hangman6.src = imagePath
        hangmanContainer.appendChild(hangman6);
        const gameover = document.createElement('div'); 
        gameover.textContent = "GAME OVER"
        gameover.style.fontSize = "20px"
        gameboard.insertBefore(gameover, hangmanContainer);
        const playAgain = document.createElement('button'); 
        playAgain.textContent = "play again?"
        playAgain.addEventListener("click", () => clearBoard() );
        gameboard.insertBefore(playAgain, hangmanContainer);
    }
}
easy.addEventListener('click',easyRound); 
hard.addEventListener('click',hardRound);

//need some way to end the game after a certain number of incorrect guesses