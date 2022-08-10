import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    incrementCounter() {
      this.counter++;
    },
  },
}).mount('#app');
