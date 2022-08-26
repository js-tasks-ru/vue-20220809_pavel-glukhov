<template>
  <div class="toasts">
    <template v-for="toaster in toasters">
      <div v-if="toaster.type==='success'" class="toast toast_success">
        <ui-icon class="toast__icon" icon="check-circle"/>
        <span>{{ toaster.message }}</span>
      </div>

      <div v-if="toaster.type==='error'" class="toast toast_error">
        <ui-icon class="toast__icon" icon="alert-circle"/>
        <span>{{ toaster.message }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

const Status = {
  success: `success`,
  error: `error`
};

export default {
  name: 'TheToaster',

  components: {UiIcon},
  data() {
    return {
      id: 0,
      toasters: []
    }
  },

  methods: {
    success(message) {
      this.toasters.push(this.createElement(`success`, message));
    },
    error(message) {
      this.toasters.push(this.createElement(`error`, message));
    },
    generateNewId() {
      return ++this.id;
    },
    remove(id) {
      const element = this.toasters.find(item => item.id === id);
      if (!element) {
        return;
      }
      clearTimeout(element.timerEvent);
      this.toasters = this.toasters.filter(item => item.id !== id);
    },
    createElement(elementType, message) {
      const id = this.generateNewId();

      const timerEvent = setTimeout(() => {
        this.remove(id);
      }, 5000);

      return {type: elementType, message: message, id: id, timerEvent: timerEvent};
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
