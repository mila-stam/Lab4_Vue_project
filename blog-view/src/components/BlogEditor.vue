<template>
  <div class="blog-editor">
    <input v-model="title" placeholder="Title" />
    <input v-model="author" placeholder="Author's name" />
    <input v-model="id" placeholder="Blog ID" />
    <textarea v-model="content" placeholder="Blog content"></textarea>
    <button @click="saveBlog">Save Blog</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('');
const author = ref('');
const id = ref('');
const content = ref('');

const emit = defineEmits(['addNewItem']);

const saveBlog = () => {
  emit('addNewItem', {
    id: id.value,
    title: title.value,
    author: author.value,
    content: content.value,
    publishDate: new Date().toISOString(),
  });
  resetFields();
};

const resetFields = () => {
  title.value = '';
  author.value = '';
  id.value = '';
  content.value = '';
};
</script>

<style scoped>
.blog-editor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
}

input, textarea, button {
  padding: 10px;
  font-size: 16px;
}

textarea {
  height: 150px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
