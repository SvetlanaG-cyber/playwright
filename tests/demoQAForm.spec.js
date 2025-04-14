
import { test, expect } from "@playwright/test";


test.skip("fill out automation practice form 1", async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form');

    // Fill out the form fields
    await page.fill('#firstName', 'John');
    //await page.getByPlaceholder('First Name').fill('John')
    const locator = page.locator('input[id="firstName"]');
    await expect(locator).toHaveValue('John');
 
    await page.fill('#lastName', 'Doe');
    await page.fill('#userEmail', 'john.doe@example.com');
    //await page.getByLabel('Email').fill('kkk')

    //await page.locator('input[id="gender-radio-1"]').click();
    //await page.locator('input[type=radio]')[0].setChecked()
    //await page.locator('input[type="radio"]').nth(1).setChecked();
    // await page.locator('input[type="radio"]').nth(1).check();// { exact: true }
    // const radioButton = await page.locator('input[type="radio"]').first();
    // await radioButton.setChecked();
    //await page.getByLabel('Female').check();
    //await page.locator('label').withText('Female').click();
    //await page.click('label', { text: 'Female' });
    //await page.getByRole('radio', { name: 'Female' }).check();
    await page.getByText('Female').click(); // works
    await expect(page.getByText('Female')).toBeChecked()
    //await page.locator('div').filter({ hasText: /^Female$/ }).click(); // works

    await page.fill('#userNumber', '1234567890');

    await page.fill('#dateOfBirthInput', '01 Jan 2000');
    //await page.fill('input[id="dateOfBirthInput"]', '01 Jan 2000');

    await page.getByText('Sports').click();
    //await page.click('#hobbies-checkbox-1');
    //await page.locator('input[id="hobbies-checkbox-1"]').setChecked();
    //await page.getByRole('checkbox', { name: 'Sports' }).check();
    await page.locator('.subjects-auto-complete__value-container').click();
    await page.locator('#subjectsInput').fill('M');
    await page.getByText('Maths', { exact: true }).click();
    //await page.attachFile('#uploadPicture', 'tests/responsibility.jpg');
    //await page.locator('input[id="uploadPicture"]').setInputFiles( 'tests/responsibility.jpg'); //works
    await page.setInputFiles('input[id="uploadPicture"]', 'tests/responsibility.jpg'); //works

    await page.fill('#currentAddress', '123 Main St, Anytown');
    // const address = page.locator('#currentAddress');
    // await expect(address).toHaveText('123 Main St, Anytown');
    await page.locator('#state svg').click();
    await page.getByText('Uttar Pradesh', { exact: true }).click();
    await page.locator('#city svg').click();
    await page.getByText('Lucknow', { exact: true }).click();
    // Submit the form
    //await page.getByRole('button').click(); //works
    // await page.getByText('Submit', { exact: true }).click(); //works
    await page.click('#submit');

    // Wait for the confirmation message
    await page.waitForSelector('.modal-body');

    // Assert that the confirmation message is displayed
    const confirmationMessage = await page.textContent('.modal-body');
    console.log('Confirmation Message:', confirmationMessage);

    // Close the browser
    //await browser.close();
});
//const { chromium } = require('@playwright/test');

test.skip("fill out automation practice form 2", async ({ page }) => {

    // Navigate to the demo page
    await page.goto('https://demoqa.com/automation-practice-form');

    // Fill out the form fields
    await page.fill('input[id="firstName"]', 'John');

    await page.fill('input[id="lastName"]', 'Doe');
    await page.fill('input[id="userEmail"]', 'john.doe@example.com');
    await page.locator('div').filter({ hasText: /^Female$/ }).click(); //await page.click('input[id="gender-radio-1"]');
    await page.fill('input[id="userNumber"]', '1234567890');
    await page.fill('input[id="dateOfBirthInput"]', '01 Jan 2000');
    await page.getByText('Sports').click(); //await page.click('input[id="hobbies-checkbox-1"]');
    await page.locator('.subjects-auto-complete__value-container').click();
    await page.locator('#subjectsInput').fill('M');
    await page.getByText('Maths', { exact: true }).click();
    await page.setInputFiles('input[id="uploadPicture"]', 'tests/responsibility.jpg');
    await page.fill('textarea[id="currentAddress"]', '123 Main St, Anytown');
    await page.locator('#state svg').click();
    await page.getByText('Uttar Pradesh', { exact: true }).click();
    await page.locator('#city svg').click();
    await page.getByText('Lucknow', { exact: true }).click();
    // Submit the form
    await page.click('button[id="submit"]');

    // Wait for the confirmation message
    await page.waitForSelector('.modal-body');

    // Assert that the confirmation message is displayed
    const confirmationMessage = await page.textContent('.modal-body');
    console.log('Confirmation Message:', confirmationMessage);

    // Close the browser
    //await browser.close();
});
//import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('Svetlana');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Gusachenko');
    await page.getByPlaceholder('name@example.com').click();
    await page.getByPlaceholder('name@example.com').fill('test@gmail.com');
    await page.locator('div').filter({ hasText: /^Female$/ }).click();
    await page.getByPlaceholder('Mobile Number').click();
    await page.getByPlaceholder('Mobile Number').fill('9165473034');
    await page.locator('#dateOfBirthInput').click();
    await page.locator('div').filter({ hasText: /^JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember$/ }).getByRole('combobox').selectOption('9');
    await page.getByRole('combobox').nth(1).selectOption('1971');
    await page.getByRole('option', { name: 'Choose Friday, October 15th, 1971' }).click();
    await page.locator('.subjects-auto-complete__value-container').click();
    await page.locator('#subjectsInput').fill('M');
    await page.getByText('Maths', { exact: true }).click();
    await page.getByText('Sports').click();
    await page.getByLabel('Select picture').click();
    await page.getByLabel('Select picture').setInputFiles('tests/responsibility.jpg');
    //await expect(page.getByText(/responsibility/)).toBeVisible()
    await page.getByPlaceholder('Current Address').click();
    await page.getByPlaceholder('Current Address').fill('123 ABC 92563');
    await page.locator('#state svg').click();
    await page.getByText('Uttar Pradesh', { exact: true }).click();
    await page.locator('#city svg').click();
    await page.getByText('Lucknow', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    const confirmationMessage = await page.textContent('.modal-body');
    //Confirmation Message: LabelValuesStudent NameSvetlana GusachenkoStudent Emailtest@gmail.comGenderFemaleMobile9165473034Date of Birth15 October,1971
    //SubjectsMathsHobbiesSportsPictureresponsibility.jpgAddress123 ABC 92563State and CityUttar Pradesh Lucknow
    console.log('Confirmation Message:', confirmationMessage);
  await expect(page.locator('.modal-title')).toHaveText('Thanks for submitting the form')
  await expect(page.locator('.table-responsive tbody tr').nth(7)).toContainText('responsibility.jpg')//.toHaveText(/responsibility.jpg/)
  await expect(page.locator('.modal-body')).toContainText('responsibility.jpg')

});
//https://playwright.dev/docs/test-assertions#auto-retrying-assertions
/**In Playwright, { exact: true } and { force: true } are options used in different contexts and have different purposes:

{ exact: true }:

This option is used in methods like page.click(), page.fill(), page.selectOption(), etc.
When { exact: true } is provided, Playwright will match elements exactly as specified, meaning it will consider only elements 
whose text content exactly matches the provided text.
For example, if you have an element with the text content "Hello World", and you pass "Hello" as the text to page.click(), 
without { exact: true }, it will match the element. With { exact: true }, it will not match the element because the text 
is not an exact match.
{ force: true }:

This option is used in methods like page.click().
When { force: true } is provided, Playwright will forcefully click on the element even if it is covered by another element
 or is not visible.
This is useful in cases where you want to interact with elements that may not be immediately clickable due to overlapping elements 
or other reasons.
In summary, { exact: true } is used for exact matching of text content, while { force: true } is used to force interactions with
 elements that might otherwise be inaccessible or not clickable. */
 test.skip('checkbox', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    //await page.getByRole('checkbox', { name: 'Home' }).check(); //не работает
    // await page.locator('#tree-node-home').check(); //не работает
    // await page.getByText('Home').check();
    await expect(page.locator('#tree-node-home')).toBeChecked();
})

test.skip('checkbox-2', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
    await page.getByText('Sports').check(); 
    
    await expect(page.locator('[for="hobbies-checkbox-1"]')).toBeChecked();
})

test('checkbox-3', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    const checkboxName1 = page.getByRole('checkbox').first(); 
    const checkboxName2 = page.getByRole('checkbox').nth(1); 

    await expect(checkboxName1).not.toBeChecked();
    await expect(checkboxName2).toBeChecked();

    await checkboxName1.check();
    await checkboxName2.click();
    await expect(checkboxName1).toBeChecked();
    await expect(checkboxName2).not.toBeChecked();
})

test('checkbox 4', async ({ page }) => {
    await page.goto('https://home.openweathermap.org/users/sign_in');
    const checkboxName = page.getByRole('checkbox', {name: 'Remember me'}); 
    // const checkboxName = page.getByLabel('Remember me');
    await checkboxName.check();
    await expect(checkboxName).toBeChecked();
})