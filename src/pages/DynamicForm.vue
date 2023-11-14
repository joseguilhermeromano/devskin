<template>
  <q-page class="row align-items-start justify-evenly">
    <FormDynamic title="Formulário Dinâmico" icon="dynamic_form" template-color="red"></FormDynamic>
  </q-page>
</template>

<script lang="ts">
import FormDynamic from 'components/DynamicForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DynamicForm',
  components: {FormDynamic}
});
</script>
