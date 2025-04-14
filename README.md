# playwright
<!-- tutorials:
https://testengineer.ru/playwright-tutorial/#architecture 
https://habr.com/ru/articles/597293/
https://anandhik.medium.com/authentication-in-playwright-356f6638ed56-->
## Overview
This project contains automated tests using Playwright for testing web applications. The test suite focuses on form interactions and validations using the DemoQA website.

## Prerequisites
- Node.js (Latest LTS version)
- npm (Node Package Manager)
- Playwright Test Runner

## Setup
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests
Execute all tests:
```bash
npx playwright test
```

Run tests with UI mode:
```bash
npx playwright test --ui
```

## Test Files
- `tests/demoQAForm.spec.js` - Contains form submission tests including:
  - Form field validations
  - File upload tests
  - Checkbox interactions
  - Dropdown selections

## Project Structure
```
playwright/
├── tests/
│   └── demoQAForm.spec.js
├── package.json
└── playwright.config.js
```

## CI/CD Integration
The project uses GitHub Actions for continuous integration. The workflow:
- Runs on push to main/master branches
- Runs on pull requests
- Executes all Playwright tests
- Uploads test reports as artifacts

View test reports in the Actions tab of the repository.