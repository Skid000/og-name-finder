const axios = require('axios'),{parentPort} = require('worker_threads'), fs = require('fs')
parentPort.on('message',(e)=>{
    search(e.min,e.max,e.path,e.id,e.output);
})
var results = "",
req = async (e) => {
    var res = await axios.get(`https://api.ashcon.app/mojang/v2/user/${e}`, {
    }).catch(e => {})
    if (res == undefined){
        return results += `\n${e}`
    }
    return;
}
async function search(min,max,path,id,output){
    fs.writeFileSync(output,"");
    console.log(`Worker ${id} Starting!`)
    var words = JSON.parse(fs.readFileSync(path,'utf-8'));
    for(var i = min; i < max; i++){
        await req(words[i])
    }
    var lol = fs.readFileSync(output,'utf-8')
    fs.writeFileSync(output,`${lol}${results}`);
    console.log(`Worker ${id} Finished!`)
}