<template>
  <q-page class="row align-items-start justify-evenly">
    <PanelApiComponent title="Painel/API" icon="apps"/>
  </q-page>
</template>

<script lang="ts">
import PanelApiComponent from 'components/PanelApi.vue';
import { defineComponent} from 'vue';

export default defineComponent({
  name: 'PanelApi',
  components: { PanelApiComponent },
});
</script>
  