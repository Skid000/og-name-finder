const filter = require('bad-words')
const fs = require('fs');
var customF = new filter({placeHolder: ""})
var e = fs.readFileSync(process.argv[2],'utf-8');
e = customF.clean(e).split("\n").filter(f=>{
    return f.charAt(0) != " "
}).filter(f=>{
    return /^[a-zA-Z0-9]*$/.test(f)
}).join('\n')
fs.writeFileSync(process.argv[2],e);