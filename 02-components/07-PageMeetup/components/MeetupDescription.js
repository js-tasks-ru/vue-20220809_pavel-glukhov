import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',
  // Компонент должен иметь входной параметр
  props: {
    description: {
      default: ``,
      type: String,
    },
  },

  template: `<p class="meetup-description">{{ description }}</p>`,
});
