const puppeteer = require('puppeteer');
const codeObj = require('./codes');
let browserOpen = puppeteer.launch({
    headless:false , 
    args : ['--start-maximized'] ,
    defaultViewport : null 
})

let loginLink = "https://www.hackerrank.com/auth/login"
let email = "voweti9627@keagenan.com"
let password = "224455"

let page

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function(){
    let emailIsEntered = page.type("input[id = 'input-1']" , email , {delay : 50})
    return emailIsEntered
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']" , password , {delay : 50})
    return passwordIsEntered
}).then(function(){
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]' , {delay : 50})
    return loginButtonClicked
}).then(function(){
    let clickAndAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]' , page)
    return clickAndAlgoPromise
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]' , page)
    return getToWarmUp
}).then(function(){
    let waitFor3Seconds = page.waitFor(3000)
    return waitFor3Seconds
}).then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled')
    return allChallengesPromise
}).then(function(questionsArr){
    console.log("The numbers of questions are " , questionsArr.length)
    let questionsWillBeSolved = questionSolver(page , questionsArr[0] , codeObj.answers[0])
    return questionsWillBeSolved
})

function waitAndClick(selector , cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModal = cPage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}

function questionSolver(page , question , answer){
    return new Promise(function(resolve,reject){
        let questionsWillBeClicked = question.click()
        questionsWillBeClicked.then(function(){
            let editorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs',page);
            return editorInFocusPromise
        }).then(function(){
            return waitAndClick('.checkbox-input',page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput' , page)
        }).then(function(){
            return page.type('textarea.custominput' , answer , {delay : 10})
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A' , {delay : 100})
            return AisPressed
        }).then(function(){
            let XisPressed = page.keyboard.press('X' , {delay : 100})
            return XisPressed
        }).then(function(){
            let CtrlIsUnpressed = page.keyboard.up('Control')
            return CtrlIsUnpressed
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs' , page)
            return mainEditorInFocus
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A' , {delay : 100})
            return AisPressed
        }).then(function(){
            let VisPressed = page.keyboard.press('V' , {delay : 100})
            return VisPressed
        }).then(function(){
            let CtrlIsUnpressed = page.keyboard.up('Control')
            return CtrlIsUnpressed
        }).then(function(){
            return page.click('.hr-monaco-submit' , {delay : 50})
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })
})
}