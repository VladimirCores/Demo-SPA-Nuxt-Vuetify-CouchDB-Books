<template>
  <div>
    <input
      ref="domInputFile"
      hidden
      type="file"
    >
    <v-btn
      block
      variant="text"
      :loading="isBooksUploading"
      @click="onUploadBooks"
    >
      Upload
    </v-btn>
  </div>
</template>
<script setup lang="ts">
const domInputFile = ref(null);
const isBooksUploading = ref(false);
const emits = defineEmits(['upload']);
const onUploadBooks = () => {
  console.log('> UploadBooks -> onUploadBooks');
  const input = (domInputFile.value! as HTMLInputElement);
  input.onchange = () => {
    const fileList = input.files as FileList;
    const selectedFile = fileList[0];
    console.log('> UploadBooks -> selectedFile:', selectedFile);
    const reader = new FileReader();
    isBooksUploading.value = true;
    reader.onload = async() => {
      const books = JSON.parse(reader.result! as string);
      console.log('> UploadBooks -> onUploadBooks - selectedFile:', books);
      await emits('upload', books);
      reader.onload = null;
      isBooksUploading.value = false;
    };
    reader.readAsText(selectedFile);
    input.onchange = null;
  };
  input.click();
};
</script>
<style scoped>

</style>
