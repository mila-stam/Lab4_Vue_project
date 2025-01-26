import { ref } from 'vue';

export function useListAction(initialList) {
  const list = ref(initialList);

  const addItem = (item) => {
    list.value.push(item);
  };

  const deleteItem = (id) => {
    list.value = list.value.filter(item => item.id !== id);
  };

  return { list, addItem, deleteItem };
}
