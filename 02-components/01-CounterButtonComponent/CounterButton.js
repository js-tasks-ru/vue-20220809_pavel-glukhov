import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      default: 0,
      type: Number,
    },
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы

  methods: {
    componentIncrement() {
      this.$emit('update:count', this.count + 1);
    },
  },

  // Шаблон потребуется отредактировать
  template: `<button type="button" @click="componentIncrement">{{ count }}</button>`,
});
