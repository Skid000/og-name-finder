var {
    Worker
} = require('worker_threads'), wordlist = require('wordlist-english')['english'], arguments = process.argv.slice(2), fs = require('fs'), workload;
if (arguments.length != 3 || isNaN(parseInt(arguments[0])) || isNaN(parseInt(arguments[1]))) console.log(`
Proper use of this command is as followed
node index.js name-length threads output
`), process.exit(1);
path = `./resources/remaining${arguments[0]}.json`;
arguments[0] = parseInt(arguments[0]);
arguments[1] = parseInt(arguments[1]);
if (arguments[0] < 4 || arguments[0] > 16) console.log("Num not in range defaulting to 4"), arguments[0] = 4;
async function p(arguments) {
    if (fs.existsSync(path)) {
        console.log("file found proceeding")
    } else {
        console.log("file not found use generate.js");
        process.exit(0);
    }
    words = JSON.parse(fs.readFileSync(path, 'utf-8'));
    console.log(`their are ${words.length} names to check
estimated time ${words.length / arguments[1]}ish seconds?
idfk its a stupid guess
using ${arguments[1]} threads 
`);
    workload = Math.floor(words.length / arguments[1])
    var e = 0;
    for (var i = 1; i <= arguments[1]; i++) {
        e = e + workload;
        var worker = new Worker('./worker.js');
        worker.postMessage({
            min: e - workload,
            max: e,
            path: path,
            id: i,
            output: arguments[2]
        })
    }
}
p(arguments);