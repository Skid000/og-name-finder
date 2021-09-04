var wordlist = require('wordlist-english')['english'],
    fs = require('fs'),
    names = JSON.parse(fs.readFileSync('./resources/names.json')),
    custom = JSON.parse(fs.readFileSync('./resources/custom.json'));
for (var i = 4; i <= 16; i++) {
    fs.writeFileSync(`./resources/remaining${i}.json`, JSON.stringify([...new Set(names.filter(e => {
        return e.length == i
    }).concat(wordlist.filter(e => {
        return e.length == i
    })).concat(custom.filter(
        e => {
            return e.length == i
        }
    )).join(`+`).toLowerCase().split(`+`))]));
}
console.log("done");