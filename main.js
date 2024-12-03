// Create Arrays - From a text file

let dictionary;

fetch("dictionary.txt").then(convertData).then(processData);

function convertData(fileData) {
    return fileData.text();
}

function processData(strData){
    console.log(strData);
}