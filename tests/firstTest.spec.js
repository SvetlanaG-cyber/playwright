// @ts-check
//https://www.qa-practice.com/
//https://pythontutor.com/render.html#mode=edit
//https://www.youtube.com/watch?v=JQsq5KOhRAY&ab_channel=SeniorTester%7C%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9%D0%9E%D0%BA%D1%83%D0%BB%D0%B8%D0%BA
//gitLab https://www.youtube.com/watch?v=McsNkmfFJK4&ab_channel=SeniorTester%7C%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9%D0%9E%D0%BA%D1%83%D0%BB%D0%B8%D0%BA
const { test, expect } = require('@playwright/test');

test('has title cat', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.locator('//*[@name="q"]').fill('cat')
  await page.locator('(//*[@name="btnK"])[2]').click()
  
    // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/cat/); //Playwright
});
test('drag and drop', async ({ page }) => {
    await page.goto('https://www.qa-practice.com/elements/dragndrop/boxes');
    const drop_here = await page.locator('#rect-droppable')
    await page.locator('#rect-draggable').dragTo(drop_here)
    
    await expect(drop_here).toContainText('Dropped!'); 
  });