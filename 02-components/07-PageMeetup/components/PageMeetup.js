import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
//import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  watch: {
    meetupId: {
      handler(newValue, oldValue) {
        console.log(`${newValue} ${oldValue}`);
        /*
        try {
          fetchMeetupById(newValue).then((meetup) => {
            this.meetupTitle = meetup.title
          });
        } catch (err) {
          console.error(`Error while requesting meetup ${err}`);
        }
         */
      },
      immediate: true
    }
  },

  template: `
    <div class="page-meetup">

    <MeetupView :meetup="meetup" />

    <UiContainer>
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>

    <UiContainer>
      <UiAlert>error</UiAlert>
    </UiContainer>

    </div>
    <script>
    import MeetupView from "./MeetupView";
    export default {
      components: {MeetupView}
    }
    </script>`,
});
