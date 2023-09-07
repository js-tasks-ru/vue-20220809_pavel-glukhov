<template>
  <div>PageCreateMeetup - только для авторизованных пользователей</div>
</template>

<script>
import { login } from "../services/authService";

export default {
  name: 'PageCreateMeetup',
  beforeRouteEnter(to, from) {
    return login() ? true : '/login' ;
  },
};
</script>

<style scoped></style>
