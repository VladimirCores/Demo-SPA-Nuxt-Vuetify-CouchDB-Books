<template>
  <div>
    <input
      ref="domInputFile"
      hidden
      type="file"
    >
    <v-btn
      block
      variant="plain"
      :loading="isUploading"
      @click="onUploadBooks"
    >
      Upload
    </v-btn>
  </div>
</template>
<script setup lang="ts">
const domInputFile = ref(null);
const emits = defineEmits(['upload']);
defineProps<{ isUploading: boolean }>();
const onUploadBooks = () => {
  console.log('> UploadBooks -> onUploadBooks');
  const input = (domInputFile.value! as HTMLInputElement);
  input.onchange = () => {
    const fileList = input.files as FileList;
    const selectedFile = fileList[0];
    console.log('> UploadBooks -> selectedFile:', selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      const books = JSON.parse(reader.result! as string);
      console.log('> UploadBooks -> onUploadBooks - selectedFile:', books);
      emits('upload', books);
      reader.onload = null;
    };
    reader.readAsText(selectedFile);
    input.onchange = null;
  };
  input.click();
};
</script>
<style scoped>

</style>
