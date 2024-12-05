// Create Arrays - From a text file

let dictionary;
const bestValue = new Map();


function convertData(fileData) {
    return fileData.text();
}

function processData(strData){
    //might need to add "\r\n" or use regular expression: /\r?\n/ instead of just "\n"
    dictionary = strData.split("\r\n");
    console.log(dictionary);
    return dictionary;
}

const form = document.getElementById("SpellChecking");
form.addEventListener("submit", (event) =>{
    const textBox = document.getElementById("word");
    dict = fetch("dictionary.txt").then(convertData).then(processData);
    event.preventDefault();
    const origWord = textBox.value;
    CheckSpelling(origWord, dict);
    displayWords();
});

function CheckSpelling(origWord, dictionary){
    for(let i =0; i < dictionary.length; i++){
        let score = 0;

        for(let j = 0; j < dictionary[i].length; j++){
            if(origWord.at(j) != dictionary[i].at(j)){
                score += Math.min(mismatch(origWord.at(j), dictionary[i].at(j)));
            }
        }
        addToMap(score, dictionary[i]);
    }
}

function addToMap(score, dictionary){
    if (bestValue.has(score) == true ){
        bestValue.get(score).add(dictionary);
    }
    else {
        bestValue.set(score, new Set(dictionary));
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

function displayWords(){
    const wordLog = document.querySelector(".words");
    let i = 0;
    let m = 0;
    let wordSet = new Set();
    let w = new Set();
    while(i < 10){
        while(bestValue.has(i) == false){
            i++;
        }
        for(let l = 0; l < bestValue.get(i).size; l++){
            w.add(bestValue.get(i).at[l]);    
        }
        for(let j = 0; j < w.size; j++){
            wordSet.add(j);
            m++;
        }
        
    }
    for(let j = 0; j < wordSet.size; j++){
        wordLog.innerHTML += `${wordSet[j]}<br/>`;
    }
}