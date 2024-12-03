// Create Arrays - From a text file

let dictionary;

fetch("dictionary.txt").then(convertData).then(processData);

function convertData(fileData) {
    return fileData.text();
}

function processData(strData){
    //might need to add "\r\n" or use regular expression: /\r?\n/ instead of just "\n"
    dictionary = strData.split("\r\n");
    console.log(dictionary);
}

const form = document.getElementById('SpellChecking');
const textBox = document.getElementById('word');
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const origWord = textBox.ariaValueMax;
    CheckSpelling(origWord);
});

function CheckSpelling(){
    
}