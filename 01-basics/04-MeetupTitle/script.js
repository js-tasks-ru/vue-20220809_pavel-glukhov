import {createApp} from './vendor/vue.esm-browser.js';


const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
createApp({
  data() {
    return {
      meetup: 1,
      meetupTitle: ``,
    };
  },
  watch: {
    meetup: {
      handler(newValue, oldValue) {
        try {
          fetchMeetupById(newValue).then((meetup) => {
            this.meetupTitle = meetup.title
          });
        } catch (err) {
          console.error(`Error while requesting meetup ${err}`);
        }
      },
      immediate: true
    }
  },
}).mount('#app');
