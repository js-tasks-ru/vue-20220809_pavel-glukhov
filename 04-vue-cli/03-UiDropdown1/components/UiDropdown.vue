<template>
  <div class="dropdown" :class="{ '.dropdown_opened': opened }">
    <button type="button" class="dropdown__toggle dropdown__toggle_icon" @click="openMenu">
      <ui-icon v-if="active.icon" :icon="active.icon" class="dropdown__icon" />
      <span>{{ getTitle }}</span>
    </button>

    <div v-show="opened" :class="{ dropdown__menu: opened }" role="listbox">
      <template v-for="option in options">
        <button class="dropdown__item" :class="{ dropdown__item_icon : hasIcon}" role="option" type="button" @click="itemSelect(option)">
          <ui-icon v-if="option.icon" :icon="option.icon" class="dropdown__icon" />
          {{ option.text }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'UiDropdown',

  components: { UiIcon },
  props: {
    options: {
      required: true,
      type: Array,
    },
    modelValue: {},
    title: {
      required: true,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      opened: false,
      print: true,
      active: { text: this.title },
      hasIcon: true,
    };
  },
  computed: {
    isOpened() {
      return this.opened;
    },
    getTitle() {
      return this.active.text || this.title;
    },
  },
  watch: {
    options: {
      handler(newValue) {
        if (newValue.length === 0) {
          this.hasIcon = false;
        }
        this.hasIcon = newValue.filter((item) => item.icon).length > 0;

      },
      immediate: true,
    },

    modelValue: {
      handler(newValue) {
        if (!newValue) {
          return;
        }
        console.log(`modelValue ` + newValue);
        this.options.forEach((item)=>{console.log(`item `, JSON.stringify(item))} );
        const element = this.options.find((item) => item.value === newValue);
        if (element) {
          this.active.text = element.text;
          this.active.icon = element.icon;
        }
      },
      immediate: true,
    }

  },
  methods: {
    getPrint() {
      if (this.print) {
        this.print = false;
        return true;
      }
      return false;
    },
    openMenu() {
      this.opened = !this.opened;
    },
    itemSelect(element) {
      this.active.text = element.text;
      this.active.icon = element.icon;
      this.$emit('update:modelValue', element.text);
      this.opened = false;
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown__toggle {
  display: inline-block;
  background-color: var(--white);
  background-position: calc(100% - 10px) calc(100% - 10px);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 10px 56px 10px 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  transition-duration: 0.2s;
  transition-property: background-color, fill, color;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  text-decoration: none;
}

.dropdown__toggle:after {
  content: '';
  position: absolute;
  top: 15px;
  right: 16px;
  transform: none;
  background: url('@/assets/icons/icon-chevron-down.svg') no-repeat;
  background-size: cover;
  display: block;
  width: 24px;
  height: 24px;
  transition: 0.2s transform;
}

.dropdown__toggle_icon {
  padding-left: 56px;
}

.dropdown_opened .dropdown__toggle {
  border-color: var(--blue);
  border-bottom-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.dropdown_opened .dropdown__toggle:after {
  transform: rotate(180deg);
}

.dropdown__menu {
  background-clip: padding-box;
  border-radius: 0 0 8px 8px;
  border: 2px solid var(--blue);
  border-top: none;
  bottom: auto;
  display: flex;
  flex-direction: column;
  left: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: auto;
  top: -1px;
  transform: translate3d(0px, 52px, 0px);
  width: 100%;
  will-change: transform;
  z-index: 95;
}

.dropdown__item {
  padding: 8px 16px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  background-color: var(--white);
  box-shadow: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  text-decoration: none;
}

.dropdown__item:hover,
.dropdown__item:focus {
  background-color: var(--grey-light);
}

.dropdown__item_icon {
  padding-left: 56px;
  position: relative;
}

.dropdown__item_icon .dropdown__icon,
.dropdown__toggle_icon .dropdown__icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}
</style>
