<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': previewLoading }"
      :style="{ '--bg-url': selectedFile }"
    >
      <span class="image-uploader__text">{{ title }}</span>
      <input
        v-bind="$attrs"
        type="file"
        :value="fileName"
        accept="image/*"
        class="image-uploader__input"
        @change="selectFile"
        @click="processImage"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },
  data() {
    return {
      file: null,
      uploadInProgress: false,
    };
  },
  emits: ['select', 'upload', 'error'],
  methods: {
    processImage() {
      if (this.previewLoading) {
        return;
      }
      if (this.file) {
        this.file = null;
        this.$emit('remove');
      }
    },
    selectFile() {
      this.file = event.target.files[0];
      this.$emit('select', event.target.files[0]);

      if (this.uploader) {
        this.uploadInProgress = true;
        this.uploader(this.file)
          .then((response) => {
            this.$emit('upload', response);
            this.uploadInProgress = false;
          })
          .catch((error) => {
            this.$emit('error', error);
            this.file = null;
            this.uploadInProgress = false;
          });
      }
    },
  },
  computed: {
    previewLoading() {
      return this.uploadInProgress;
    },
    selectedFile() {
      return this.file ? `url(${this.file})` : ``;
    },
    title() {
      if (this.previewLoading) {
        return 'Загрузка...';
      }
      if (!this.file) {
        if (this.preview) {
          return `Удалить изображение`;
        } else {
          return `Загрузить изображение`;
        }
      } else {
        if (!this.uploader) {
          return `Удалить изображение`;
        }
      }

      return `Загрузить изображение`;
    },
    fileName() {
      return this.file;
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
