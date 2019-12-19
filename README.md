# Random calculate
###### Vue.js + TypesScript
# [DEMO](https://random-calculate.herokuapp.com/)

```
###### Application with two pages.
1. First should be on url '/'

- On load this page should show 10 fields marked as A, B, C, D .... with value 3.

- After page load every 2 seconds all field values should be changed randomly. Change is randomly calculated as a number between 1 and 2, with a random sign (-, +).

- When adding the change to the previous value you should show an arrow pointing up or down, depending on the change sign  (arrow down is for -, arrow up is for +).

- Under each field there should be a toggle button to disable/enable the change on that field.

2. Second should be on url '/statistics'

- This page should show change statistics for all 10 fields.

- Chart should show value changes in time.

3 .When going from '/' to '/statistics' all the changing should be paused, and on returning back it should be resumed.

```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
