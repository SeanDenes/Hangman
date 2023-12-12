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
        return word; 
    }else{
        const wordsHard = ['tell a tale','lost and found','easy does it','spectacular','lacrosse','premium','fracture','jingle bell','phoenix','rye']
        const indexHard = Math.floor(Math.random() * 10);
        const wordhard = wordsHard[indexHard]; 
        wordsHard.splice(indexHard,1); 
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
            //secret.setAttribute('id','secret');
            //secret.style.display = 'flex';
            secret.style.backgroundColor= '#eee';
            secret.style.height='15px';
            secret.style.width='15px';
            secret.style.padding='5px';
            secret.style.flexDirection='row';
            secretContainer.appendChild(secret);
            const space = document.createElement('div');
            //secret.setAttribute('id','secret');
            //secret.style.display = 'flex';
            space.style.backgroundColor= '#fff';
            space.style.height='3px';
            space.style.width='3px';
            space.style.padding='5px';
            space.style.flexDirection='row';
            secretContainer.appendChild(space);
        }
        else
        {
            const secret = document.createElement('div');
            //secret.setAttribute('id','secret');
            //secret.style.display = 'flex';
            secret.style.backgroundColor= '#fff';
            secret.style.height='15px';
            secret.style.width='8px';
            secret.style.padding='15px';
            secret.style.flexDirection='row';
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
    //createBoard(); 
}

function generateAlphabetButtons(alphabetContainer,word) {
    for (let i = 65; i <= 90; i++) { 
      const letter = String.fromCharCode(i);
      const button = document.createElement("button");
      button.textContent = letter;
      button.addEventListener("click", () => makeGuess(letter,word));
      alphabetContainer.appendChild(button);
    }
  }

//need to pass as arguments the word, the letter, and the div bc they're not in scope 
//the div exists in the scope of the generateSecret function
function makeGuess(letter,word) {
    //scan the word, check if the selected letter is in the word
    for(let i = 0; i < word.length(); i++) {
        //conditional
        if(letter == word.charAt(i)) {
            //replace the div content with the selected letter

        }
    }
}



easy.addEventListener('click',easyRound); 
hard.addEventListener('click',hardRound);


