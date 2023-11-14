import { defineStore, createPinia, Store } from 'pinia';
import { ref, Ref } from 'vue';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface State {
  posts: Post[];
  loading: Ref<HTMLFormElement>;
}

export const useApiStore = defineStore('api', {
  state: (): State => ({
    posts: [],
    loading: ref(new HTMLFormElement),
  }),
  actions: {
    async fetchPosts(): Promise<void> {
      this.loading.value = true;
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        this.posts = posts
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      } finally {
        this.loading.value = false;
      }
    },
  },

});

export const pinia = createPinia();

export function setupStore(): Store {
  return useApiStore(pinia);
}