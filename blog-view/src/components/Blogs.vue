<template>
  <div class="blogs">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <div class="search-section">
        <input v-model="searchTerm" placeholder="Search blogs" />
        <fieldset>
          <legend>Filter by:</legend>
          <label>
            <input type="checkbox" v-model="filters" value="title" /> By title
          </label>
          <label>
            <input type="checkbox" v-model="filters" value="description" /> By content
          </label>
        </fieldset>
      </div>
      <div v-for="blog in filteredItems" :key="blog.id" class="blog-item">
        <h2>{{ blog.title }}</h2>
        <p>{{ blog.description }}</p>
        <img v-if="blog.heroImage" :src="blog.heroImage" :alt="blog.title" />
        <p>Published: {{ new Date(blog.publishDate).toLocaleDateString() }}</p>
        <button @click="$emit('deleteBlog', blog.id)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSearch } from '../composables/useSearch';

const props = defineProps({
  blogs: Array,
  isLoading: Boolean,
  error: String,
});

const emit = defineEmits(['deleteBlog']);

const blogsList = computed(() => props.blogs);
const { searchTerm, filters, filteredItems } = useSearch(blogsList);
</script>

<style scoped>
.blogs {
  max-width: 800px;
  margin: 0 auto;
}

.search-section {
  margin-bottom: 20px;
}

.blog-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
}

img {
  max-width: 100%;
  height: auto;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}
</style>
