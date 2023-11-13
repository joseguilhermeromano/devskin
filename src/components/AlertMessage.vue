<template>
  <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6" style="color:grey">
            <q-icon name="error" color="red" size="lg"/>&nbsp;{{ title }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          {{ message }}
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'AlertMessage',
  data(){
    return {
      title: '', 
      message: ''
    }
  },
  setup (props) {
    return {
      ...props, 
      alert: ref(false),
    }
  },
  methods:{
    show(title: string, message: string):void{
      this.title = title
      this.message = message
      this.alert = true
    }
  }
})
</script>