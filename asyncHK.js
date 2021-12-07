const puppeteer = require('puppeteer');
const codeObj = require('./codes');

let loginLink = "https://www.hackerrank.com/auth/login"
let email = "voweti9627@keagenan.com"
let password = "224455";


(async function(){
    try {
        const browserOpenInstance = await puppeteer.launch({
            headless:false , 
            args : ['--start-maximized'] ,
            defaultViewport : null 
        }) //  newtab

        const newTab = await browserOpenInstance.newPage();
        await newTab.goto(loginLink);
        await newTab.type("input[id = 'input-1']" , email , {delay : 50})
        await newTab.type("input[type='password']" , password , {delay : 50})
        await newTab.click('button[data-analytics="LoginPassword"]' , {delay : 50})
        await waitAndClick('.topic-card a[data-attr1="algorithms"]' , newTab)
        await waitAndClick('input[value="warmup"]' , newTab)
        // await newTab.waitFor(3000)
        let allChallenges = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled')
        await questionSolver(newTab , allChallenges[0] , codeObj.answers[0])


        
    } catch (error) {
        console.log(error)
    }
})()

    async function waitAndClick(selector , cPage){
        await cPage.waitForSelector(selector)
        let selectorClicked = cPage.click(selector)
        return selectorClicked
    }

    async function questionSolver(page , question , answer){
    
                try {
                    await question.click()
                    await waitAndClick('.monaco-editor.no-user-select.vs',page);
                    await waitAndClick('.checkbox-input',page)
                    await page.waitForSelector('textarea.custominput' , page)
                    await page.type('textarea.custominput' , answer , {delay : 10})
                    await page.keyboard.down('Control')
                    await page.keyboard.press('A' , {delay : 100})
                    await page.keyboard.press('X' , {delay : 100})
                    await page.keyboard.up('Control')
                    await waitAndClick('.monaco-editor.no-user-select.vs' , page)
                    await page.keyboard.down('Control')
                    await page.keyboard.press('A' , {delay : 100})
                    await page.keyboard.press('V' , {delay : 100})
                    await page.keyboard.up('Control')
                    await page.click('.hr-monaco-submit' , {delay : 50})
                } catch (error) {
                    console.log(error)
                }
        }