
//if the username is valid, reveal the difficulty selection
document.getElementById("startGameBtn").addEventListener("click", function() {
    var username = document.getElementById("usernameInput").value;
    if (username.trim() !== "") {
        document.getElementById("usernameEntry").style.display = "none";
        document.getElementById("difficulty").style.display = "block";
        document.getElementById("username").innerText = username;
        document.getElementById("username").style.color = "red" ;
    }else{
        alert("Please enter a valid username.");
    }
});
//initialize html elements 
const easy = document.getElementById('buttonEasy'); 
const hard = document.getElementById('buttonHard'); 
const container = document.getElementById('boardContainer');
//some global variables
let correctGuesses = []
let successes = 0 ;
let incorrectGuesses = 0; 
let gameNum; 
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
    const word = generateWord('easy'); //get the word
    generateBoard(word); //pass to the board
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
const generateBoard = function(word){
    // Create an SVG element
    const hangmanSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    hangmanSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    hangmanSVG.setAttribute("viewBox", "0 0 300 400");
    hangmanSVG.setAttribute("width", "300");
    hangmanSVG.setAttribute("height", "400");
    hangmanSVG.setAttribute("id", "hangmanSVG");
    //divs for the board, secret word, hangman, alphabet, and exit button
    const gameboard = document.createElement('div');
    const secretContainer = document.createElement('div'); 
    const exit = document.createElement('div');
    const hangmanContainer = document.createElement('div'); 
    const alphabetContainer = document.createElement('div');
    const x = "\u2716"
    //set ID's
    hangmanContainer.setAttribute('id','hangmanContainer'); 
    gameboard.setAttribute('id',"gameboard");
    secretContainer.setAttribute('id','secretContainer');
    exit.setAttribute("id","exit");
    alphabetContainer.setAttribute('id','alphabetContainer');
    exit.textContent = x;
    //this gives the container for the SVG
    hangmanContainer.appendChild(hangmanSVG); 
    //generate the gallows
    createHangmanSVG(hangmanSVG,hangmanContainer); 
    //append it all to the gameboard
    gameboard.appendChild(hangmanContainer);
    container.appendChild(gameboard);
    gameboard.appendChild(exit);
    exit.addEventListener('click',clearBoard);
    gameboard.appendChild(alphabetContainer);
    gameboard.appendChild(secretContainer);
    //play the game
    generateSecret(word);
    generateAlphabetButtons(alphabetContainer,word); //this is where guesses are made
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
            secret.style.height='15px';
            secret.style.width='8px';
            secret.style.padding='15px';
            secret.style.display = 'inline-block';
            secretContainer.appendChild(secret);
        }
    }
};
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
        createHangmanSVG(hangmanSVG, hangmanContainer);
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
            secret.style.height='15px';
            secret.style.width='8px';
            secret.style.padding='15px';
            secret.style.display = 'inline-block';
            secretContainer.appendChild(secret);
        }
    }
}

function createHangmanSVG(hangmanSVG, hangmanContainer) {
    hangmanSVG.innerHTML = ""; // Clear previous drawings
    // Draw gallows
    // Create the gallows using lines
    const gallowsVertical = document.createElementNS("http://www.w3.org/2000/svg", "line");
    gallowsVertical.setAttribute("x1", "150");
    gallowsVertical.setAttribute("y1", "48");
    gallowsVertical.setAttribute("x2", "150");
    gallowsVertical.setAttribute("y2", "350");
    gallowsVertical.setAttribute("stroke", "#000");
    
    hangmanSVG.appendChild(gallowsVertical);

    const gallowsVertical1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    gallowsVertical1.setAttribute("x1", "75");
    gallowsVertical1.setAttribute("y1", "48");
    gallowsVertical1.setAttribute("x2", "75");
    gallowsVertical1.setAttribute("y2", "100");
    gallowsVertical1.setAttribute("stroke", "#000");
    
    hangmanSVG.appendChild(gallowsVertical1);

    const gallowsHorizontal = document.createElementNS("http://www.w3.org/2000/svg", "line");
    gallowsHorizontal.setAttribute("x1", "50");
    gallowsHorizontal.setAttribute("y1", "350");
    gallowsHorizontal.setAttribute("x2", "200");
    gallowsHorizontal.setAttribute("y2", "350");
    gallowsHorizontal.setAttribute("stroke", "#000");
    hangmanSVG.appendChild(gallowsHorizontal);

    const gallowsHorizontal1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    gallowsHorizontal1.setAttribute("x1", "151");
    gallowsHorizontal1.setAttribute("y1", "50");
    gallowsHorizontal1.setAttribute("x2", "74");
    gallowsHorizontal1.setAttribute("y2", "50");
    gallowsHorizontal1.setAttribute("stroke", "#000");
    hangmanSVG.appendChild(gallowsHorizontal1);

   
    hangmanSVG.setAttribute("stroke-width", "4");
   
    if (incorrectGuesses >= 1) {
    // Draw head
    const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    head.setAttribute("cx", "75");
    head.setAttribute("cy", "125");
    head.setAttribute("r", "25");
    head.setAttribute("stroke", "#000");
    head.setAttribute("fill", "none");
    hangmanSVG.appendChild(head);
    }

    if (incorrectGuesses >= 2) {
    // Draw body
    const body = document.createElementNS("http://www.w3.org/2000/svg", "line");
    body.setAttribute("x1", "75");
    body.setAttribute("y1", "150");
    body.setAttribute("x2", "75");
    body.setAttribute("y2", "250");
    body.setAttribute("stroke", "#000");
    hangmanSVG.appendChild(body);
    }

    if (incorrectGuesses >= 3) {
    // Draw left arm
    const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "line");
    leftArm.setAttribute("x1", "50");
    leftArm.setAttribute("y1", "200");
    leftArm.setAttribute("x2", "75");
    leftArm.setAttribute("y2", "175");
    leftArm.setAttribute("stroke", "#000");
    hangmanSVG.appendChild(leftArm);
    }

    if (incorrectGuesses >= 4) {
    // Draw right arm
    const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "line");
    rightArm.setAttribute("x1", "75");
    rightArm.setAttribute("y1", "175");
    rightArm.setAttribute("x2", "100");
    rightArm.setAttribute("y2", "200");
    rightArm.setAttribute("stroke", "#000");
    hangmanSVG.appendChild(rightArm);
    }

    if (incorrectGuesses >= 5) {
    // Draw left leg
    const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "line");
    leftLeg.setAttribute("x1", "50");
    leftLeg.setAttribute("y1", "275");
    leftLeg.setAttribute("x2", "75");
    leftLeg.setAttribute("y2", "250");
    leftLeg.setAttribute("stroke", "#000");
    hangmanSVG.appendChild(leftLeg);
    }

    if (incorrectGuesses >= 6) {
    // Draw right leg
    const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "line");
    rightLeg.setAttribute("x1", "75");
    rightLeg.setAttribute("y1", "250");
    rightLeg.setAttribute("x2", "100");
    rightLeg.setAttribute("y2", "275");
    rightLeg.setAttribute("stroke", "#000");
    hangmanSVG.appendChild(rightLeg);
    }
    hangmanContainer.appendChild(hangmanSVG);

    if (incorrectGuesses >= 6){
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
