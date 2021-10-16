// https://hash-priming.herokuapp.com/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs'); 
app.use(express.static(__dirname+'/public'));

let qs = [["winter","BLANKET"],["food","RESTAURANT"],["bike","ROAD"],["door","HOUSE"],["chair","TABLE"],["Jungle","LION"],["Needle","THREAD"],["Branf","BRANT"],["Pipsi","PIPSO"],["Borel","BORET"],["বাগান","কমল"],["কাহিনি","কাব্য"],["ছাতা","বর্ষা"],["আহরণ","গল্প"],["ধ্বনি","শব্দ"],["প্রিয়জন","আত্মীয়"],["শয্যা","বালিস"],["সজেম","সজেত"],["তমাস","তমাক"],["কাতান","কাতাম"]];
let counter = 0;
let answers = [];
let keys = [1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0];
let response = 0;
let start = 0;
let end = 0;

let time = function(){
    let d = new Date();
    return d.getTime();
}

app.post('/Yes',(req,res)=>{
    answers.push(1);
    counter++;
    if(counter==qs.length){
        end = time();
        // console.log("end: "+end);
        response+=(end-start-1800);
        // console.log("response: "+response);
        let correct = 0;
        for(let j=0;j<qs.length;j++){
            if(answers[j]==keys[j]){
                correct++;
            }
        }
        counter = 0;
        answers=[];
        return res.render('result',{correct: correct,len: qs.length,response:(response/qs.length).toFixed(2)});
    }
    else{
        end = time();
        // console.log("end: "+end);
        response+=(end-start-1800);
        // console.log("response: "+response);
        start = time();
        // console.log("start: "+start);
        return res.render('frontend',{first:qs[counter][0],second:qs[counter][1]});
    }
})

app.get('/',(req,res)=>{
    counter = 0;
    answers=[];
    start = time();
    // console.log("start: "+start);
    return res.render('frontend',{first:qs[counter][0],second:qs[counter][1]});
})

app.post('/No',(req,res)=>{
    answers.push(0);
    counter++;
    if(counter==qs.length){
        end = time();
        // console.log("end: "+end);
        response+=(end-start-1800);
        // console.log("response: "+response);
        let correct = 0;
        for(let j=0;j<qs.length;j++){
            if(answers[j]==keys[j]){
                correct++;
            }
        }
        counter = 0;
        answers=[];
        return res.render('result',{correct: correct,len: qs.length,response:(response/qs.length).toFixed(2)});
    }
    else{
        end = time();
        // console.log("end: "+end);
        response+=(end-start-1800);
        // console.log("response: "+response);
        start = time();
        // console.log("start: "+start);
        return res.render('frontend',{first:qs[counter][0],second:qs[counter][1]});
    }
})

app.listen(PORT,()=>{
    console.log("Server started");
})

