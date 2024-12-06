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
    console.log("Submit Pressed");
    event.preventDefault();
    const textBox = document.getElementById("word");
    const origWord = textBox.value;
    //const origWord = textBox.value.toLowerCase();
    console.log(origWord);
    fetch("dictionary.txt").then(convertData).then(processData).then((dict) => {
    if(!dict) {
        console.error("Error loading dictionary:(");
        return;
    }
    CheckSpelling(origWord, dict);
    displayWords();
    })
    .catch((error) => {
        console.error("Error fetching or processing dictionary:", error);
    });
});

function CheckSpelling(origWord, dictionary){
    for(let i =0; i < dictionary.length; i++){
        console.log("Check Spelling loop");
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
    console.log("Added to map");
    if (bestValue.has(score) == true ){
        bestValue.get(score).push(dictionary);
    }
    else {
        bestValue.set(score, new Array(dictionary));
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
    //let lower = word.toLowerCase();
    let lower = word;
    var result = false;
    if(lower =="a" || lower =="e" || lower =="i" || lower =="o" || lower =="u" ||lower =="y" ){
        result = true;
    } 
    return result;
}

function displayWords(){
    console.log("display words");
    const wordLog = document.querySelector(".word");
    wordLog.innerHTML = "";
    console.log("Logging");
    let i = 1;
    let m = 0;
    let wordSet = new Set();
    console.log("before while loop");
    while(m < 11){
        while(bestValue.has(i)){
            console.log("in the while loop:)");
            for (const word of bestValue.get(i)) {
                console.log(word);
                wordSet.add(word);
                m++;
                if(m >= 11){
                    break;
                }
            }
        }
        i++;
    }
    
    for(const word of wordSet) {
        console.log(word);
        const wordElem = document.createElement("p");
        wordElem.textContent = word;
        wordLog.appendChild(wordElem);
    }
    
}
