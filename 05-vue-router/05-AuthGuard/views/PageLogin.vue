<template>
  <div>
    PageLogin - только для гостей.
    <template v-if="$route.query.from">query.from === {{ $route.query.from }}</template>
  </div>
</template>

<script>
import {isAuthenticated, logout} from '../services/authService'
export default {
  name: 'PageLogin',
  beforeRouteEnter(to, from) {
    return logout() ? true : '/' ;
  },
};
</script>

<style scoped></style>
