//import browsers from 'playwright';
import { expect, test} from '@playwright/test';

const sleep = async (ms) => { return new Promise ((resolve) => {
   return setTimeout(resolve, ms);});};
// let page;
// let context;
// let browser;
// let browserType;

test.describe('Simple login to MERN Store', () => {
    test.afterEach(async () => {
        await sleep(2000)
    })
   
    // test.beforeEach(async () => {
    //     browserType = browsers['chromium'];
    //     browser = await browserType.launch({headless: false});
    //     context = await browser.newContext({
    //         viewport:{
    //             width: 1800,
    //             height: 900
    //         }
    //     });
    // });
    // test.afterEach(async () => {
    //   await sleep(3000);
    //   await page.close();
    //   await browser.close();
    // });
    //test.use({viewport:{ width: 600, height: 900 }})
    //test.fixme()
    //test.skip(browserName === 'webkit', 'This fiature is not implemented for Mac')
    //test.fail() // if test should fail , useful for documentation
    //test.step()
    //test.slow()
test('Should login to store', async ({ page }) => {
 const userName = 'Jerome50@hotmail.com';
 const password = 'wrongPassword';
 //page = await context.newPage();
 await page.goto('/')
})
});