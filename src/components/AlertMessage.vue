<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="alert">
      <q-card style="min-width: 33%;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6" style="color:grey">
            <q-icon :name="icon" :color="color" size="lg"/>&nbsp;{{ title }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section v-html:="message"/>
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
      icon: '', 
      color: '',
      message: '', 
    }
  },
  setup (props) {
    return {
      ...props, 
      alert: ref(false),
    }
  },
  methods:{
    show(title: string, icon: string, color:string,  message: string):void{
      this.title = title
      this.message = message
      this.icon = icon
      this.color = color
      this.alert = true
    }
  }
})
</script>