import test, { expect } from "@playwright/test";

test('Verify that pagination section works properly', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');
    const nextButton = await page.getByRole('button', { name: 'Next' });
    await expect(nextButton).toBeDisabled()
    // Loop to add 10 users
    let user = 'User'
    for (let i = 1; i <= 10; i++) {
        // Click on the "Add" button
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByPlaceholder('First Name').click();
        await page.getByPlaceholder('First Name').fill(user + i);
        await page.getByPlaceholder('Last Name').click();
        await page.getByPlaceholder('Last Name').fill('Guss');
        await page.getByPlaceholder('name@example.com').click();
        await page.getByPlaceholder('name@example.com').fill(user + i + '@test.com');
        await page.getByPlaceholder('Age').click();
        await page.getByPlaceholder('Age').fill('15');
        await page.getByPlaceholder('Salary').click();
        await page.getByPlaceholder('Salary').fill('100000');

        await page.getByPlaceholder('Department').click();
        await page.getByPlaceholder('Department').fill('QA');
        await page.getByRole('button', { name: 'Submit' }, { force: true }).click();
    }
    await nextButton.click()

    const pageNumber = page.getByRole('spinbutton', { name: 'jump to page' })
   await expect(pageNumber).toHaveValue('2')

    const page2 = await page.getByText('2', { exact: true })
    await expect(page2).toHaveText('2')
    const previousButton = await page.getByRole('button', { name: 'Previous' });
    await expect(previousButton).toBeEnabled()
    await previousButton.click()
    await expect(previousButton).toBeDisabled()
    await expect(pageNumber).toHaveValue('1')

    const nextButton1 = await page.getByRole('button', { name: 'Next' });
    await expect(nextButton1).toBeEnabled()


    await page.getByPlaceholder('Type to search').click();
    await page.getByPlaceholder('Type to search').fill('user');
    const countNotEmpty = await page.locator('.rt-tbody [role="row"]:not(.-padRow)').count();
    await expect(countNotEmpty).toBe(10);
    console.log(countNotEmpty)
    const row = await page.getByRole('gridcell').first();
    console.log(await row.innerText())
  
    //let deletebtn = await page.getByTitle('Delete').first() //
    let count = await page.locator(`[id^= "delete-record-"]`).count();
    //console.log(await row.innerText())
    for (let i = 0; i < count; i++) {
        
       // await expect(deletebtn).toBeVisible()
        await page.getByTitle('Delete').first().click() //locator(`[id *= "delete-record-${i+1}"]`).click();
    }
})