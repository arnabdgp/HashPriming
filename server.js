// https://hash-priming.herokuapp.com/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs'); 
app.use(express.static(__dirname+'/public'));

let qs = [["winter","BLANKET"],["food","RESTAURANT"],["bike","ROAD"],["door","HOUSE"],["chair","TABLE"],["Jungle","LION"],["Needle","THREAD"],["Branf","BRANT"],["Pipsi","PIPSO"],["Borel","BORET"],["বাগান","কমল"],["কাহিনি","কাব্য"],["ছাতা","বর্ষা"],["আহরণ","গল্প"],["ধ্বনি","শব্দ"],["প্রিয়জন","আত্মীয়"],["শয্যা","বালিস"],["সজেম","সজেত"],["তমাস","তমাক"],["কাতান","কাতাম"]];
let nqs = ["BLANKET","RESTAURANT","ROAD","HOUSE","TABLE","LION","THREAD","BRANT","PIPSO","BORET","কমল","কাব্য","বর্ষা","গল্প","শব্দ","আত্মীয়","বালিস","সজেত","তমাক","কাতাম"];

let eng_question = "Is this a real word or not?";
let beng_question = "এটি কি একটি অর্থপূর্ণ শব্দ? হ্যাঁ বা না";
let counter = 0;
let answers = [];
let keys = [1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0];
let start = 0;
let end = 0;
let eng_response = 0;
let beng_response = 0;
let eng_yes = "YES";
let eng_no = "NO";
let beng_yes = "হ্যাঁ";
let beng_no = "না";
let correct_eng = 0;
let correct_beng = 0;

let time = function(){
    let d = new Date();
    return d.getTime();
}

app.post('/PrimeYes',(req,res)=>{
    answers.push(1);
    counter++;
    if(counter==qs.length){
        end = time();
        beng_response+=(end-start-1350);
        let correct = 0;
        for(let j=0;j<qs.length;j++){
            if(j>=0&&j<=9 && answers[j]==keys[j]){
                correct_eng++;
            }
            else if(answers[j]==keys[j])
                correct_beng++;
        }
        counter = 0;
        answers=[];
        return res.render('result',{correct_eng: correct_eng,correct_beng:correct_beng,correct: correct,len: 10,eng_response:(eng_response/10).toFixed(2),beng_response:(beng_response/10).toFixed(2)});
    }
    else{
        end = time();
        if(counter>=0 && counter<=9)
            eng_response+=(end-start-1350);
        else
            beng_response+=(end-start-1350);
        start = time();
        if(counter>=0 && counter<=9)
            return res.render('frontend',{first:qs[counter][0],second:qs[counter][1],question:eng_question,pos:eng_yes, neg:eng_no});
        else
            return res.render('frontend',{first:qs[counter][0],second:qs[counter][1],question:beng_question,pos:beng_yes, neg:beng_no});
    }
})

app.post('/NoPrimeYes',(req,res)=>{
    answers.push(1);
    counter++;
    if(counter==qs.length){
        end = time();
        beng_response+=(end-start-1000);
        let correct = 0;
        for(let j=0;j<qs.length;j++){
            if(j>=0&&j<=9 && answers[j]==keys[j]){
                correct_eng++;
            }
            else if(answers[j]==keys[j])
                correct_beng++;
        }
        counter = 0;
        answers=[];
        return res.render('result',{correct_eng: correct_eng,correct_beng:correct_beng,correct: correct,len: 10,eng_response:(eng_response/10).toFixed(2),beng_response:(beng_response/10).toFixed(2)});
    }
    else{
        end = time();
        if(counter>=0 && counter<=9)
            eng_response+=(end-start-1000);
        else
            beng_response+=(end-start-1000);
        start = time();
        if(counter>=0 && counter<=9)
            return res.render('frontend_noprime',{first:nqs[counter],question:eng_question,pos:eng_yes, neg:eng_no});
        else
            return res.render('frontend_noprime',{first:nqs[counter],question:beng_question,pos:beng_yes, neg:beng_no});
    }
})

app.get('/',(req,res)=>{
    return res.render('index');
})

app.get('/withPrime',(req,res)=>{
    counter = 0;
    answers=[];
    start = time();
    return res.render('frontend',{first:qs[counter][0],second:qs[counter][1],question:eng_question,pos:eng_yes, neg:eng_no});
})

app.get('/withoutPrime',(req,res)=>{
    counter = 0;
    answers=[];
    start = time();
    return res.render('frontend_noprime',{first:nqs[counter],question:eng_question,pos:eng_yes, neg:eng_no});
})

app.post('/PrimeNo',(req,res)=>{
    answers.push(0);
    counter++;
    if(counter==qs.length){
        end = time();
        beng_response+=(end-start-1350);
        let correct = 0;
        for(let j=0;j<qs.length;j++){
            if(j>=0&&j<=9 && answers[j]==keys[j]){
                correct_eng++;
            }
            else if(answers[j]==keys[j])
                correct_beng++;
        }
        counter = 0;
        answers=[];
        return res.render('result',{correct_eng: correct_eng,correct_beng:correct_beng,len: 10,eng_response:(eng_response/10).toFixed(2),beng_response:(beng_response/10).toFixed(2)});
    }
    else{
        end = time();
        if(counter>=0 && counter<=9)
            eng_response+=(end-start-1350);
        else
            beng_response+=(end-start-1350);
        start = time();
        if(counter>=0 && counter<=9)
            return res.render('frontend',{first:qs[counter][0],second:qs[counter][1],question:eng_question,pos:eng_yes, neg:eng_no});
        else
            return res.render('frontend',{first:qs[counter][0],second:qs[counter][1],question:beng_question,pos:beng_yes, neg:beng_no});
    }
})

app.post('/NoPrimeNo',(req,res)=>{
    answers.push(0);
    counter++;
    if(counter==qs.length){
        end = time();
        beng_response+=(end-start-1000);
        let correct = 0;
        for(let j=0;j<qs.length;j++){
            if(j>=0&&j<=9 && answers[j]==keys[j]){
                correct_eng++;
            }
            else if(answers[j]==keys[j])
                correct_beng++;
        }
        counter = 0;
        answers=[];
        return res.render('result',{correct_eng: correct_eng,correct_beng:correct_beng,len: 10,eng_response:(eng_response/10).toFixed(2),beng_response:(beng_response/10).toFixed(2)});
    }
    else{
        end = time();
        if(counter>=0 && counter<=9)
            eng_response+=(end-start-1000);
        else
            beng_response+=(end-start-1000);
        start = time();
        if(counter>=0 && counter<=9)
            return res.render('frontend_noprime',{first:nqs[counter],question:eng_question,pos:eng_yes, neg:eng_no});
        else
            return res.render('frontend_noprime',{first:nqs[counter],question:beng_question,pos:beng_yes, neg:beng_no});
    }
})

app.listen(PORT,()=>{
    console.log("Server started");
})

