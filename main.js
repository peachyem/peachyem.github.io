// Create Arrays - From a text file

let dictionary;

fetch("dictionary.txt").then(convertData).then(processData);

function convertData(fileData) {
    return fileData.text();
}

function processData(strData){
    dictionary = strData.split("\n");
    console.log(dictionary);
}