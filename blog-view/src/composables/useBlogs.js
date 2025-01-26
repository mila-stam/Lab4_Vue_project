import { ref, computed } from 'vue';
import { useListAction } from './useListAction';
import { createClient } from 'contentful';

const client = createClient({
  space: 'hpr0uushokd4',
  accessToken: 'jwEHepvQx-kMtO7_2ldjhE4WMAsiDp3t1xxBT8aDp7U'
});

export function useBlogs() {
  const loading = ref(false);
  const error = ref(null);
  const { list: blogs, addItem, deleteItem } = useListAction([]);

  const fetchBlogs = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await client.getEntries({ content_type: 'blogPost' });
      blogs.value = response.items.map(item => ({
        id: item.sys.id,
        title: item.fields.title,
        description: item.fields.description,
        heroImage: item.fields.heroImage?.fields?.file?.url,
        publishDate: item.fields.publishDate,
      }));
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { blogs, loading, error, addItem, deleteItem, fetchBlogs };
}
