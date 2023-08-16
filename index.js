const easy = document.getElementById('buttonEasy'); 
const hard = document.getElementById('buttonHard'); 
const container = document.getElementById('boardContainer');
easy.addEventListener('click',easyRound); 
hard.addEventListener('click',hardRound);
//needs to be passed easy or hard 
function generateWord(difficulty){
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
function easyRound(){
    //clear board
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    easy.style.border = '2px solid black';
    hard.style.border=null;
    //gameboard 
    const gameboard = document.createElement('div');
    gameboard.setAttribute("id","gameboard");
    /*
    gameboard.style.border='2px solid black'; 
    gameboard.style.position = 'relative';
    gameboard.style.height = '75vh'; 
    gameboard.style.width = '100vh';
    gameboard.style.display='flex';
    gameboard.style.flexDirection='column';
    gameboard.style.justifyContent = 'center';
    gameboard.style.alignItems = 'center';
    */
    //container
    /*
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.height = '100vh';
    container.style.padding = '20px'; 
    */
    container.appendChild(gameboard);
    //x
    const exit = document.createElement('div');
    exit.setAttribute("id","exit");
    const x = "\u2716"
    exit.textContent = x;
    /*
    exit.style.position = 'absolute';
    exit.style.top = '0';
    exit.style.right = '0';
    exit.style.textAlign= 'center';
    exit.style.verticalAlign = 'top';
    exit.style.fontStyle = 'normal';
    exit.style.backgroundColor = '#eee';
    exit.style.color= '#888';
    exit.style.width= '16px';
    exit.style.height= '16px';
    exit.style.cursor= 'pointer';
    */
    gameboard.appendChild(exit);
    const clear = document.getElementById('exit');
    clear.addEventListener('click',clearBoard);
    //hangmanArt 
    var hangmanArt = 
        '    _____\n'+
        '   |     |\n'+
        '   |     o\n' +
        '   |    /|\\\n' + 
        '   |    / \\\n'+
        '   |\n'+
        '  / \\'+
        '\n\n';
    const hangman = document.createElement('pre');
    hangman.setAttribute('id','hangman'); 
    hangman.textContent = hangmanArt;
    //hangman.style.display= 'flex';
    gameboard.appendChild(hangman);
    //placeholder
    const word = generateWord('easy');
    var spaces = '';
    for(var i=0;i<word.length;i++)
    {
        spaces += '__ ';
    }
    const secret = document.createElement('pre');
    secret.setAttribute('id','secret'); 
    secret.textContent = spaces;
    //secret.style.display= 'flex';
    gameboard.appendChild(secret); 
}
function hardRound(){
    //clear board
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    hard.style.border = '2px solid black';
    easy.style.border=null;
    //gameboard 
    const gameboard = document.createElement('div');
    gameboard.setAttribute("id","gameboard");
    /*
    gameboard.style.border='2px solid black'; 
    gameboard.style.position = 'relative';
    gameboard.style.height = '75vh'; 
    gameboard.style.width = '100vh';
    gameboard.style.display='flex';
    gameboard.style.flexDirection='column';
    gameboard.style.justifyContent = 'center';
    gameboard.style.alignItems = 'center';
    */
    //container
    /*
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.height = '100vh';
    container.style.padding = '20px'; 
    */
    container.appendChild(gameboard);
    //x
    const exit = document.createElement('div');
    exit.setAttribute("id","exit");
    const x = "\u2716"
    exit.textContent = x;
    /*
    exit.style.position = 'absolute';
    exit.style.top = '0';
    exit.style.right = '0';
    exit.style.textAlign= 'center';
    exit.style.verticalAlign = 'top';
    exit.style.fontStyle = 'normal';
    exit.style.backgroundColor = '#eee';
    exit.style.color= '#888';
    exit.style.width= '16px';
    exit.style.height= '16px';
    exit.style.cursor= 'pointer';
    */
    gameboard.appendChild(exit);
    const clear = document.getElementById('exit');
    clear.addEventListener('click',clearBoard);
    //hangmanArt 
    var hangmanArt = 
        '    _____\n'+
        '   |     |\n'+
        '   |     o\n' +
        '   |    /|\\\n' + 
        '   |    / \\\n'+
        '   |\n'+
        '  / \\'+
        '\n\n';
    const hangman = document.createElement('pre');
    hangman.textContent = hangmanArt;
    //hangman.style.display= 'flex';
    gameboard.appendChild(hangman);
    //placeholder
    const word = generateWord('hard'); 
    //console.log(word);
    //var spaces = '';
    for(var i=0;i<word.length;i++)
    {
        //if (word[i] === ' ')
        //{
        //    spaces += ' '; 
        //}else{
            const temp = document.createElement('div');
            //temp.style.display = 'flex';
            temp.style.flex='1';
            temp.style.backgroundColor= '#eee';
            temp.style.height='20px';
            temp.style.width='20px';
            temp.style.padding='20px';
            gameboard.appendChild(temp);
        //}
    }
    /*
    const secret = document.createElement('pre');
    secret.setAttribute('id','secret');
    secret.textContent = spaces;
    //secret.style.display= 'flex';
    gameboard.appendChild(secret); 
    play(word,spaces); 
    */
}
function clearBoard(){
    //container.removeChild(container.firstChild);
    gameboard.remove();
    easy.style.border=null;
    hard.style.border=null;
    //createBoard(); 
}
function play(word, spaces){
    //input area 
    const charInput = document.createElement('input'); 
    charInput.setAttribute('id','charInput'); 
    charInput.type = "text";
    charInput.maxLength = 1;
    gameboard.appendChild(charInput); 
    const inputValue = document.getElementById('charInput'); 
    inputValue.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            const temp = inputValue.value;
            const alphabet = /[a-zA-Z]/.test(temp);
            if(alphabet){
                inputValue.value = '';
                //check if temp is in the word
                for(var i = 0; i < word.length; i++)
                {
                    if(word[i] === temp)
                    {
                        spaces[i] = temp;
                        console.log(spaces[i]);
                        console.log(temp); 
                    }
                }
                console.log(spaces);
            }
        }
    })
}




