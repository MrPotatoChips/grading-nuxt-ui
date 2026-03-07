# aljay-app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


Operating system    Windows 10.0.26200
CPU                         Intel(R) Core(TM)  i9-14900HX (32 cores)
Node.js version       v24.7.0
nuxt/cli version       3.31.3
Package manager   npm 11.5.1
Builder                    vite 6.4.1


1. GO TO node_modules/data-validation-xlsx/xlsx.js
2. find the function with a name of write_ws_xml_datavalidation
3. then add the code below after the if(validation.type=="list") statement
    else if(validation.type=="list-in-sheet"){
        o += '<dataValidation type="list" allowBlank="1" sqref="' + validation.sqref + '" showInputMessage="1" showErrorMessage="1">';
        o += '<formula1>' + validation.values + '</formula1>';
        o += '</dataValidation>';
    }
4. run build