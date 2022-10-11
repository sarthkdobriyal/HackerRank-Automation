const puppeteer = require("puppeteer");

const loginLink = 'https://www.hackerrank.com/auth/login';
const codeObj = require('./code.js');


let email = 'regelab827@snece.com';
let password = 'automation';




//iify wahi par function initialize hoke run hojata hai
// using await-sync to to hackerrank
(async function(){
    try{
        let browserOpenInstance = await puppeteer.launch({
            headless:false,
            args: ['--start-maximized'],
            defaultViewport: null
        });
        
        let newTab = await browserOpenInstance.newPage() 
        await newTab.goto(loginLink);
        await newTab.type("input[id='input-1']", email, {delay:10});
        await newTab.type("input[id='input-2']", password, {delay:10});
        await newTab.keyboard.press('Enter');
        await waitandclick('.topic-name[data-automation="algorithms"]', newTab);
        await waitandclick('input[value="warmup"]', newTab);
        let allQues = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay:50});
        console.log(allQues.length);
        await qquestionSolver(newTab, allQues[0], codeObj.answers[0]);
    }catch{

    }
})()

async function qquestionSolver(page, question, answer){
    try{
        await question.click();
        await waitandclick("input[type = 'checkbox']", page);
        await waitandclick("#input-1",page);
        await page.type('#input-1',answer, {delay:5});
        await page.keyboard.down('Control')
        await page.keyboard.press('A', {delay:50})
        await page.keyboard.press('X', {delay:10})
        await page.keyboard.up('Control')
        await waitandclick('.monaco-editor.no-user-select.vs',page);
        await page.keyboard.down('Control')
        await page.keyboard.press('V', {delay:50})
        await page.keyboard.up('Control')
        await waitandclick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled", page);

    }catch{

    }
}

// browserOpen.then(function(browserObj){
//     let browserOpenP = browserObj.newPage();
//     return browserOpenP;
// }).then(function(newTab) {
//     page = newTab;
//     let hackerrankOpenP = page.goto(loginLink);
//     return hackerrankOpenP;
// }).then(function(){
//     let waitP = page.waitForSelector("input[id='input-1']", {visible:true});
//     return waitP
// }).then(function(){
//     let waitP = page.waitForSelector("input[id='input-2']", {visible:true});
//     return waitP
// })
// .then(function() {
//     let emailEnteredP = page.type("input[id='input-1']", email, {delay:10});
//     return emailEnteredP;
// }).then(function() {
//     let passwordEnteredP = page.type("input[id='input-2']", password, {delay:10});
//     return passwordEnteredP;
// }).then(function(){
//     let loginP = page.keyboard.press('Enter');
//     return loginP;
// })
// .then(function(){
//     let waitP = page.waitForSelector('.topic-name[data-automation="algorithms"]', {visible:true});
//     return waitP;
// }).then(function() {
//     let algorthimsTabP = page.click('.topic-name[data-automation="algorithms"]');
//     return algorthimsTabP;
// }).then(function() {
//     let warmUpP = waitandclick('input[value="warmup"]', page);
//     return warmUpP;
// }).then(function() {
//     let waitP = page.waitFor(3000);
//     return waitP;
// }).then(function() {
//     //document
//     let allQuesP = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay:50});
//     return allQuesP;
// }).then(function(quesArr){
//     console.log(quesArr.length);
//     let questionWillBeSolvedP = questionSolver(page, quesArr[0], codeObj.answers[0]);
//     return questionWillBeSolvedP;
// })





// function questionSolver(page, question, answer){
//     return new Promise(function(resolve, reject){
//         let quesClickedP = question.click();
//         quesClickedP.then(function(){
//             let textEditP = waitandclick(".monaco-editor.no-user-select.vs", page);
//             return textEditP;
//         }).then(function() {
//             return waitandclick("input[type = 'checkbox']", page);
//         }).then(function() {
//             return waitandclick("#input-1",page);
//         }).then(function() {
//             return page.type('#input-1',answer, {delay:5});
//         }).then(function() {
//             return page.keyboard.down('Control')
//         }).then(function() {
//             return page.keyboard.press('A', {delay:100})
//         })
//         .then(function() {
//             return page.keyboard.down('Control')
//         }).then(function() {
//             return page.keyboard.press('X', {delay:100})
//         }).then(function(){
//             return page.keyboard.up("Control");
//         }).then(function() {
//             return waitandclick('.monaco-editor.no-user-select.vs',page);
//         }).then(function() {
//             return page.keyboard.down('Control')
//         }).then(function() {
//             return page.keyboard.press('A', {delay:100})
//         }).then(function() {
//             return page.keyboard.down('Control')
//         }).then(function() {
//             return page.keyboard.press('v', {delay:100})
//         }).then(function(){
//             return page.keyboard.up("Control");
//         }).then(function() {
//                 let submitCodeP = waitandclick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled", page);
//                 return submitCodeP;
//         }).then(function() {
//             let nextQuesP = waitandclick('.ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled',page);
//             return nextQuesP;
//         })
//     });
// }


async function waitandclick(selector, cpage) {
    await cpage.waitForSelector(selector);
    let selectorClicked = cpage.click(selector);
    return selectorClicked;
}
