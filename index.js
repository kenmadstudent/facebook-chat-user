//      ************************************************ 
//      **            Code & Design by KenMad         **
//      **         Copyright®  KenMadGaming®          **
//      ** Https://www.facebook.com/kenmad.kenmad     **
//      **             Https://kenmad.xyz             **
//      **                 23/3/2017   :)             **
//      **                                            **
//      ************************************************ 



var login = require('facebook-chat-api');
var handleMessage = require('./src/handleMessage.js');
const fs = require("fs");

var request = require('request');  

var timeout = undefined; // 1000 for one second

var inTimeout = {};

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    api.setOptions({logLevel: "silent"});
    forceLogin
     api.setOptions({forceLogin: "true"});

          
    function sendMessage(str, id){
        return new Promise((resolve, reject) => {
            api.sendMessage(str, id, function(err){
                if(err){
                    reject(err);
                    return;
                }
                resolve('send str success');
            });
        });
    }

    api.listen(function(err, message){
        if(err){
           
             return;
        }

     

        var req = message.body ? message.body.toLowerCase() : ''; 
        var id = message.threadID;
       
               if(message.body === 'ID') {
                
                     api.sendMessage("ID của bạn là: "+id, message.threadID);
                    return(err)
                                         }
                if(message.body === '2') {
                      api.sendMessage("ID của bạn là: "+id, message.threadID);
                     return(err)
                                         }
                                         
           
        if(req && !inTimeout[id]){
            handleMessage(req, id, sendMessage);
            if(timeout){
                inTimeout[id] = true;
                setTimeout(function(){
                    inTimeout[id] = false;
                }, timeout);
            }
        }
    });

});

