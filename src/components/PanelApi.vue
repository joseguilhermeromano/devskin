<template>
  <div class="q-pa-md">
  <h4><q-icon :name="icon" color="red"/>{{ title }}</h4>
  <q-page class="q-pa-md">
    <q-table
      :rows="posts"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[5, 10, 20, 50]"
      :filter="filter"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-author="props">
        {{ props.row.user.name }}
      </template>
    </q-table>
  </q-page>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PanelApi',
  props:{
    title:{
      type: String, 
      value: '',
    }, 
    icon: {
      type: String, 
      value: '',
    }
  },
  setup(props){
    return {
      props
    }
  },
  data() {
    return {
      posts: [],
      columns: [
        { name: 'title', label: 'Título', align: 'left', field: 'title', sortable: true },
        { name: 'body', label: 'Corpo', align: 'left', field: 'body', sortable: true },
        { name: 'author', label: 'Autor', align: 'left', field: 'user', sortable: true },
      ],
      pagination: { sortBy: 'title', descending: false, page: 1, rowsPerPage: 10 },
      filter: '',
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_embed=user');
        this.posts = response.data.map(post => ({
          ...post,
          user: post._embedded.user,
        }));
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    },
  },
  watch: {
    pagination: {
      handler() {
        this.fetchPosts();
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchPosts();
  },
});
</script>