import { test, expect} from '@playwright/test'
//const { test, expect } = require('@playwright/test');
// Set the log level to 'verbose'
//setLogLevel('verbose');

test('Webtables', async ({page }) => {
  await page.goto('https://demoqa.com/webtables');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DEMOQA/);
});

test('Verify that title is "Web Tables"' ,{ tag: '@fast' }, async ({ page }) => {
 
  await page.goto('https://demoqa.com/webtables');
  const head = await page.locator('h1');
  //const head = await page.locator('heading:has-text("Web Tables")');
  // const head =await page.getByRole('heading', { name: 'Web Tables' })
  await expect(head).toContainText("Web Tables");
  await expect(page.getByRole('heading', { name: 'Web Tables' })).toBeVisible();
  //await expect(page.getByText('Web Tables', { exact: true })).toBeVisible(); doesnt work
  console.log(await head.innerText());
});

test('Verify that table contains 10 rows by default', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');
  //.rt-tbody>div   => 10 строк в таблице
  // const elements = await page.locator('.rt-tbody > div').elements(); doesnt work
  // await expect(elements.length).toBe(10);
  // const length1 = await page.locator('.rt-tbody > div').length; doesnt work
  // await expect(length1).toBe(10);
  //const rowLocator = page.getByRole('listitem'); => li
  const count = await page.locator('.rt-tbody > div').count();
  await expect(count).toBe(10);
  await expect(page.locator('.rt-tbody').getByRole('row')).toHaveCount(10); // or 11 with thead
  /* .count(): This method directly returns the count of elements matching the locator.
     .elements(): This method returns an array of ElementHandles, representing the matching 
 elements. So, to get the count, you would need to get the length of this array, which you attempted with elements.length. 
 However, elements is not an array but a Promise. To resolve it to an array, you need to await it, like 
 const elements = await page.locator('.rt-tbody > div').elements();.
     .length: This property is not available directly on the Locator object. It seems like you tried to use it as
  if it's a property of Locator, which is why it didn't work.*/

  //cy.get('.rt-tbody div.rt-tr[role="row"]:not(.-padRow)').should('have.length', 1)
  //заполнены строки .rt-tbody div.rt-tr[role="row"]:not(.-padRow)
});

test.skip('Verify that table has 3 fill out rows by default', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  const countNotEmpty = await page.locator('.rt-tbody [role="row"]:not(.-padRow)').count();
  await expect(countNotEmpty).toBe(3);
  console.log(countNotEmpty)
});

test('Verify that first row has correct data', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');
  const row = page.locator('.rt-tbody').getByRole('row').first()

  console.log(await row.innerText())
  const result = await row.innerText()
  const resultArray = result.split('\n')
  console.log(result.split('\n'))
  const expectedArray = ['Cierra', 'Vega', '39', 'cierra@example.com', '10000', 'Insurance', ' '];
  // Compare arrays
  expect(resultArray).toEqual(expectedArray);
  await expect(row).toHaveText(['Cierra', 'Vega', '39', 'cierra@example.com', '10000', 'Insurance', ' '].join(''))
  console.log(resultArray.every((el, i) => el === expectedArray[i]))
  const areEqual = await resultArray.every((value, index) => value === expectedArray[index]);
  console.log(areEqual); // Output: true 
  const hasCommonElements = resultArray.some(value => expectedArray.includes(value));
  console.log(hasCommonElements); // Output: true
});

test('Verify that specific row has correct data', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');
  // const row = page.locator('.rt-tbody').getByRole('row').first()
  const row = page.locator('.rt-tbody').getByRole('row', { name: 'Kierra', force: true })
  console.log(await row.innerText())
  const result = await row.innerText()
  const resultArray = result.split('\n')
  const expectedArray = ["Kierra", "Gentry", "29", "kierra@example.com", "2000", "Legal", " "];
  // Compare arrays
  expect(resultArray).toEqual(expectedArray);
  console.log(resultArray.every((el, i) => el === expectedArray[i]))
});

test('Add new row', { tag: '@slow' }, async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');
  const countNotEmpty = await page.locator('.rt-tbody [role="row"]:not(.-padRow)').count();
  await expect(countNotEmpty).toBe(3);
  console.log(countNotEmpty)
  await page.getByRole('button', { name: 'Add' }).click();
  
  await page.getByPlaceholder('First Name').fill('Lana');

  await page.getByPlaceholder('Last Name').fill('Guss');

  await page.getByPlaceholder('name@example.com').fill('test@test.com');

  await page.getByPlaceholder('Age').fill('15');
  
  await page.getByPlaceholder('Salary').fill('100000');
  //   const locator = page.locator('input[type=number]');
  // await expect(locator).toHaveValue(/[0-9]/);
  await page.getByPlaceholder('Department').click();
  await page.getByPlaceholder('Department').fill('QA');
  await page.getByRole('button', { name: 'Submit' }).click();
  const countNotEmptyNew = await page.locator('.rt-tbody [role="row"]:not(.-padRow)').count();
  await expect(countNotEmptyNew).toBe(countNotEmpty + 1);
  console.log(countNotEmptyNew)
});

test('Edit row', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');
  //'Lana Guss 15 test@test.com 100000 QA Edit Delete' 
  await page.getByRole('row', { name: 'Kierra' }).getByTitle('Edit').locator('path').click();
  await page.getByPlaceholder('Age').click();
  await page.getByPlaceholder('Age').fill('25');
  await page.getByRole('button', { name: 'Submit' }).click();
  //to do verify that age === 25
  await page.getByTitle('Edit').getByRole('img').first().click();
  await page.getByPlaceholder('Department').click();
  await page.getByPlaceholder('Department').fill('dev');
  await page.getByRole('button', { name: 'Submit' }).click();
  //to do verifi that department is dev
});
test('Delete row', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  await page.getByPlaceholder('Type to search').click();
  await page.getByPlaceholder('Type to search').fill('kierra');
  const countNotEmpty = await page.locator('.rt-tbody [role="row"]:not(.-padRow)').count();
  await expect(countNotEmpty).toBe(1);
  console.log(countNotEmpty)
  const row = await page.getByRole('gridcell').first();
  console.log(await row.innerText())
  //'Kierra Gentry 29 kierra@example.com 2000 Legal Edit Delete' 
 // await page.getByRole('row', { name: 'Kierra' }).getByTitle('Delete').locator('path').click();
  await page.getByTitle('Delete').locator('path').click();
  const rowEmpty = await page.getByRole('gridcell').first();
  console.log(await rowEmpty.innerText())
  const rowInnerText = await rowEmpty.innerText();

  // Check if the row is empty (contains only whitespace)
  const isEmpty = !rowInnerText.trim();

  // Assert that the row is empty
  expect(isEmpty).toBe(true);
  const countNotEmptyAfterDelete = await page.locator('.rt-tbody [role="row"]:not(.-padRow)').count();
  await expect(countNotEmptyAfterDelete).toBe(0);
  console.log(countNotEmptyAfterDelete)
//   const row = await page.getByRole('row', { name: 'Kierra' });
//   page.waitForTimeout(100)
//  // Assert that the row does not exist
//  if (row === null || row === undefined) {
//   console.log('Row with name "Kierra" does not exist.');
// } else {
//   console.error('Row with name "Kierra" exists:', row);
// }
});

test.skip('Verify that pagination section works properly', async ({page }) => {
  await page.goto('https://demoqa.com/webtables');
 const nextButton = await page.getByRole('button', {name:'Next'});
 await expect(nextButton).toBeDisabled()
 // Loop to add 10 users
 let user = 'User' //to do generate rundom string with length
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
   //   const locator = page.locator('input[type=number]');
   // await expect(locator).toHaveValue(/[0-9]/);
   await page.getByPlaceholder('Department').click();
   await page.getByPlaceholder('Department').fill('QA');
   await page.getByRole('button', { name: 'Submit' }, {force: true}).click();
 }
 await nextButton.click()
 
 const pageNumber =  page.getByRole('spinbutton', { name: 'jump to page' })
 expect(pageNumber).toHaveValue('2')

 const page2 = await page.getByText('2', { exact: true })
  expect(page2).toHaveText('2')
 const previousButton = page.getByRole('button', {name:'Previous'});
 await  expect(previousButton).toBeEnabled()
 await previousButton.click()
 await  expect(previousButton).toBeDisabled()
 expect(pageNumber).toHaveValue('1')

 const nextButton1 = await page.getByRole('button', {name:'Next'});
 await expect(nextButton1).toBeEnabled()


 // Delete all generated users
//   const row = page.getByRole('row', { name: 'User' }).getByTitle('Delete').locator('path')//await page.getByRole('gridcell').first();
  
//   while(row){
//     console.log(await row)
//  const deleteButton = await page.getByRole('row', { name: 'User' }).getByTitle('Delete').locator('path')
//  await deleteButton.click()
//   }

  await page.getByPlaceholder('Type to search').click();
  await page.getByPlaceholder('Type to search').fill('user');
  const countNotEmpty = await page.locator('.rt-tbody [role="row"]:not(.-padRow)').count();
  await expect(countNotEmpty).toBe(10);
  console.log(countNotEmpty)
  const row = await page.getByRole('gridcell').first();
  console.log(await row.innerText())
  // for (let i = 1; i <= 10; i++){
    
  //   let deleteButton = await page.getByTitle('Delete').locator('path')
  //   deleteButton.click();
  // }\
  await page.locator([id*="delete-record-${i+1}"])
  console.log(await row.innerText())
  for(let i = 0; i < 10; i++) {
    await page.locator([id*="delete-record-${i+1}"]).click();
}

await expect(page.getByText('No rows found')).toBeVisible();

  const rowEmpty = await page.getByRole('gridcell').first();
  console.log(await rowEmpty.innerText())
  const rowInnerText = await rowEmpty.innerText();

  // Check if the row is empty (contains only whitespace)
  const isEmpty = !rowInnerText.trim();

  // Assert that the row is empty
  expect(isEmpty).toBe(true);
  const countNotEmptyAfterDelete = await page.locator('.rt-tbody [role="row"]:not(.-padRow)').count();
  await expect(countNotEmptyAfterDelete).toBe(0);
  console.log(countNotEmptyAfterDelete)
  /* // Ищем созданных пользователей в поле Search
    await page.getByPlaceholder('Type to search').fill('User');
    // Считаем количество созданных пользователей, которые не пустые строки
    const rowUsers = await page.locator(".rt-tbody [role='row']:not(.-padRow)").count();
    expect(rowUsers).toBe(3);
    // Для удаления трех последних пользователей
    for (let i = 1; i <= 3; i++) {
      await page.locator('span[title="Delete"]').last().click();
    }
    // Проверяем, что пользователи удалены
    expect(rowUsers).not.toBe();
  })*/
  //delete maria
//   test.only('webtables - delete rows', async ({ page }) => {
//     await page.goto('https://demoqa.com/webtables');
//     let i = 1;
//         while(await page.locator([id*="delete-record-${i}"]).isVisible()){
//             await page.locator([id*="delete-record-${i}"]).click();
//             i++;
//         }

//    await expect(page.getByText('No rows found')).toBeVisible();
// })
/**await page.goto('https://demoqa.com/webtables');
        const rowCount = await page.locator('.rt-tbody>[role="rowgroup"]>[role="row"]:not(.-padRow)').count();
        console.log(rowCount)          
        for(let i = 1; i <= rowCount; i++) {
                await page.locator([id*="delete-record-${i+1}"]).click();
        }

       await expect(page.getByText('No rows found')).toBeVisible();
    //}) */
//  // Close the browser
//  await browser.close();
});
/**  const row1 = page.getByRole('row').first();
  //console.log(await row1.allInnerTexts()) //[ 'First Name\nLast Name\nAge\nEmail\nSalary\nDepartment\nAction' ]
  const nameRow = page.getByRole('gridcell', { name: 'Kierra', exact: true })
  const rowFirst = page.getByRole('gridcell').first();
  console.log(await rowFirst.innerText())// Cierra
  // console.log(await nameRow.allInnerTexts()) //[ 'Kierra' ]
  // console.log(await nameRow.innerText())     //'Kierra'
  // console.log(await nameRow.allTextContents()) //[ 'Kierra' ]
 
  // await page
  //     .getByRole('listitem')
  //     .filter({ hasText: 'orange' })
  //     .click(); */
// page.getByRole('columnheader')

// page.getByRole('rowgroup')

// page.getByRole('gridcell')