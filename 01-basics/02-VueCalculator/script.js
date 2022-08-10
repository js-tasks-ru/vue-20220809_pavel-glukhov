import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      first: 1,
      second: 2,
      operator: `sum`,
    };
  },
  computed: {
    resultOfOperation() {
      switch (this.operator) {
        case `sum`:
          return this.first + this.second;
        case `subtract`:
          return this.first - this.second;
        case `multiply`:
          return this.first * this.second;
        case `divide`:
          return this.first / this.second;
        default:
          return 'Error';
      }
    },
  },
}).mount('#app');
