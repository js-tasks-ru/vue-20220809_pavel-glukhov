import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from './MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      hasError: false,
      inProgress: true,
    };
  },
  watch: {
    meetupId: {
      handler(newValue) {
        this.meetup = null;
        this.inProgress = true;
        this.hasError = false;
        fetchMeetupById(newValue)
          .then((meetup) => {
            this.meetup = meetup;
            this.inProgress = false;
          })
          .catch(() => {
            this.inProgress = false;
            this.hasError = true;
          });
      },
      immediate: true,
    },
  },

  template: `
    <div class="page-meetup">
    <MeetupView v-if="meetup" :meetup="meetup"></MeetupView>

    <UiContainer v-if="inProgress">
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>

    <UiContainer v-if="hasError">
      <UiAlert>Test Error</UiAlert>
    </UiContainer>
    </div>`,
});
