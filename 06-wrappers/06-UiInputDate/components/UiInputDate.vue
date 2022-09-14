<template>
  <ui-input v-bind="$attrs" v-model="modelValueProxy" :type="type"> </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      newValue: null,
      showIcons: true,
    };
  },
  methods: {
    extractDateTime(dateValue, from, to) {
      if (!dateValue) {
        return '';
      }
      const dateAsStr = new Date(dateValue).toISOString();
      return dateAsStr.slice(from, to);
    },
    parseTime(timeValue) {
      const timeArr = timeValue.split(':');
      const timeRetuenValue = 60 * timeArr[1] + 3600 * timeArr[0];
      return timeRetuenValue * 1000;
    },
    parseDateTimeExt(initialDate, type) {
      switch (type) {
        case 'date': {
          return Date.parse(initialDate);
        }
        case 'time': {
          return this.parseTime(initialDate);
        }
        case 'datetime-local': {
          const dateValue = Date.parse(initialDate);
          const timeValue = initialDate.split('T')[1];
          return dateValue + this.parseTime(timeValue);
        }
        default:
          return 0;
      }
    },
  },
  emits: ['update:modelValue'],
  computed: {
    modelValueProxy: {
      get() {
        switch (this.type) {
          case 'date': {
            return this.extractDateTime(this.modelValue, 0, 10);
          }
          case 'time': {
            return this.extractDateTime(this.modelValue, 11, 16);
          }
          case 'datetime-local': {
            return this.extractDateTime(this.modelValue, 0, 16);
          }
          default: {
            return '';
          }
        }
      },
      set(value) {
        this.newValue = value;
        if (!this.newValue) {
          return;
        }
        const valueAsNumber = this.parseDateTimeExt(this.newValue, this.type);
        this.$emit('update:modelValue', valueAsNumber);
      },
    },
  },
  components: { UiInput },
};
</script>
