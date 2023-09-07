import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul class="agenda">
      <li class="agenda__item" v-for="meetupAgenda in agenda" :key="meetupAgenda.id">
        <meetup-agenda-item :agenda-item="meetupAgenda"></meetup-agenda-item>
      </li>
    </ul>`,
});
