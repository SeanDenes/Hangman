//initialize html elements 
const easy = document.getElementById('buttonEasy'); 
const hard = document.getElementById('buttonHard'); 
const container = document.getElementById('boardContainer');
//word generator
const generateWord = function(difficulty){
    if(difficulty === 'easy')
    {
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
};
//generate board
const generateBoard = function(word){
    const gameboard = document.createElement('div');
    const secretContainer = document.createElement('div'); 
    const exit = document.createElement('div');
    const hangman = document.createElement('pre');
    const alphabetContainer = document.createElement('div');
    const x = "\u2716"
    const clear = document.getElementById('exit');
    var hangmanArt = 
    '    _____\n'+
    '   |     |\n'+
    '   |     o\n' +
    '   |    /|\\\n' + 
    '   |    / \\\n'+
    '   |\n'+
    '  / \\'+
    '\n\n';
    hangman.setAttribute('id','hangman'); 
    gameboard.setAttribute('id',"gameboard");
    secretContainer.setAttribute('id','secretContainer');
    exit.setAttribute("id","exit");
    alphabetContainer.setAttribute('id','alphabetContainer');
    exit.textContent = x;
    hangman.textContent = hangmanArt;
    gameboard.appendChild(hangman);
    container.appendChild(gameboard);
    gameboard.appendChild(exit);
    //container.appendChild(secretContainer);
    //exit.addEventListener('click',clearBoard);
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
const easyRound = function(){
    //clear board
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
function hardRound(){
    //clear board
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
function clearBoard(){
    //container.removeChild(container.firstChild);
    gameboard.remove();
    easy.style.border=null;
    hard.style.border=null;
}

function generateAlphabetButtons(alphabetContainer,word) {
    for (let i = 65; i <= 90; i++) { 
      const uppercaseLetter = String.fromCharCode(i);
      const button = document.createElement("button");
      button.textContent = uppercaseLetter;
      const letter = uppercaseLetter.toLowerCase()
      button.addEventListener("click", () => makeGuess(letter,word));
      alphabetContainer.appendChild(button);
    }
}
function makeGuess(letter, word) {
    console.log("makeGuess called");
    console.log(letter);
    //scan the word, check if the selected letter is in the word
    for(let i = 0; i < word.length; i++) {
        let currentChar = word.charAt(i)
        if(letter == currentChar) {
            //replace the div content with the selected letter
            secretContainer.innerHTML = ''; //delete children of secretContainer
            updateSecret(word, currentChar)
            //exit the loop to make sure updateSecret is only called 1 time 
            break;
        }
    }
}
function updateSecret(word, currentChar) {
    console.log("update secret called");
    for(var i = 0; i < word.length; i++){
        let char = word.charAt(i);
        if(char !== ' ' && char !== currentChar) {
            //grey boxes
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
        }else if(char !== ' ' && char == currentChar){
            const letterDiv = document.createElement('div');
            letterDiv.textContent = currentChar.toUpperCase();
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
easy.addEventListener('click',easyRound); 
hard.addEventListener('click',hardRound);


