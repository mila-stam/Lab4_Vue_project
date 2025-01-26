<template>
  <div class="blog-view">
    <div v-if="!showEditor">
      <button @click="showEditor = true">Add new blog</button>
    </div>
    <BlogEditor v-else @addNewItem="addItem" />
    
    <Blogs 
      :blogs="blogs" 
      :isLoading="loading" 
      :error="error"
      @deleteBlog="deleteItem"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useBlogs } from '../composables/useBlogs';
import BlogEditor from './BlogEditor.vue';
import Blogs from './Blogs.vue';

const showEditor = ref(false);
const { blogs, loading, error, addItem, deleteItem, fetchBlogs } = useBlogs();

onMounted(fetchBlogs);
</script>

<style scoped>
.blog-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

button:hover {
  background-color: #45a049;
}
</style>
