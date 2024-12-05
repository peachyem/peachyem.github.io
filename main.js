// Create Arrays - From a text file

let dictionary;
var bestValue = new Map();

function convertData(fileData) {
    return fileData.text();
}

function processData(strData){
    //might need to add "\r\n" or use regular expression: /\r?\n/ instead of just "\n"
    dictionary = strData.split("\r\n");
    console.log(dictionary);
    return dictionary;
}

const form = document.getElementById('SpellChecking');
const textBox = document.getElementById('word');
form.addEventListener('submit', (event) =>{
    dict = fetch("dictionary.txt").then(convertData).then(processData);
    event.preventDefault();
    const origWord = textBox.value;
    CheckSpelling(origWord, dict);
});

function CheckSpelling(origWord, dictionary){
    for(let i =0; i < dictionary.length; i++){
        let score = 0;

        for(let j = 0; j < dictionary[i].length; j++){
            if(origWord.at(j) != dictionary[i].at(j)){
                score += Math.min(mismatch(origWord.at(j), dictionary[i].at(j)))
            }
        }
    }
}

function addToMap(score, dictionary){
    for(let i = 0; i < 9; i++){
        
    }
}

function mismatch(orig, dict){
    if(isVowel(orig) == true){
        if(isVowel(dict) == true){
            return 1;
        } else {
            return 3;
        }
    }else {
        if(isVowel(dict) == false){
            return 1;
        } else {
            return 3;
        }
    }
}

function isVowel(word){
    lower = word.toLowerCase();
    var result = false;
    if(lower =="a" || lower =="e" || lower =="i" || lower =="o" || lower =="u" ||lower =="y" ){
        result = true;
    } 
    return result;
}