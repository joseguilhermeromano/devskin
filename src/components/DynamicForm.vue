<template>
  <h4><q-icon :name="icon" color="red"/>{{ title }}</h4>
  <div id="dynamicForm">
   <q-stepper
      v-model="step"
      ref="stepperRef"
      animated
    >
      <q-step
        :name="1"
        title="Contato"
        :done="step > 1"
      >
        <q-input
          ref="name"
          v-model="fullName"
          label="*Nome Completo"
          :rules="nameRules"
          required
        />
        <q-input
          ref="email"
          v-model="email"
          label="*E-mail"
          :rules="emailRules"
          required
        />
        <q-input
          ref="celular"
          v-model="celularNumber"
          label="Celular"
          mask="+## (##) # ####-####"
          :rules="phoneRules"
        />
      </q-step>

      <q-step
        :name="2"
        title="Endereço"
        :done="step > 2"
      >
        <q-input
          ref="step2Ref"
          v-model="step2"
          label="Any char in [a, b, c]"
          :rules="[(val) => ['a','b','c'].includes(val) || 'must be one of these characters: a, b, c']"
        />
      </q-step>

      <q-step
        :name="3"
        title="Formação"
        :done="step > 3"
      >
        <q-input
          ref="step3Ref"
          v-model="step3"
          label="Anything - no rules"
        />
      </q-step>

      <template v-slot:navigation >
        <q-stepper-navigation>
          <q-btn v-if="step > 1" flat :color="templateColor" @click="onBackStep" label="Voltar" class="q-ml-sm"></q-btn>
          <q-btn @click="onContinueStep" :color="templateColor" :label="step === 3 ? 'Enviar' : 'Próximo'"></q-btn>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref} from 'vue';

const stepperRef = ref<Ref | null>(null);
const step1Ref = ref<Ref | null>(null);
const step2Ref = ref<Ref | null>(null);
const step = ref<number>(1);
const step1 = ref<string>('');
const step2 = ref<string>('');
const step3 = ref<string>('');

const onContinueStep = () => {
  switch (step.value) {
    case 1:
      if (step1Ref.value) {
          step1Ref.value.validate();
        if (!step1Ref.value.hasError) {
          if (stepperRef.value) stepperRef.value.next();
        }
      }
      break;
    case 2:
      if (step2Ref.value) {
        step2Ref.value.validate();
        if (!step2Ref.value.hasError) {
          if (stepperRef.value) stepperRef.value.next();
        }
      }
      break;
    default:
      alert(`Valores recebidos: ${step1.value} - ${step2.value} - ${step3.value}`);
      break;
  }
};

const onBackStep = () => {
  if (stepperRef.value) stepperRef.value.previous();
};

const removeAccents = (str:string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default defineComponent({
  name: 'DynamicForm',
  props: {
    title: {
      type: String,
      default: 'Formulário Dinâmico',
      required: true,
    },
    icon:{
      type: String, 
      required: true,
    }
    ,templateColor:{
      type: String, 
      required: true,
    }
  },
  setup(props) {
    return { ...props, stepperRef, step, step1, step2, step3, onContinueStep, onBackStep };
  },
  data() {
    return {
      celularNumber: '', 
      fullName: '', 
      email: '',
      fields: {
        name: ref<Ref | null>(null),
        celular: ref<Ref | null>(null),
        email: ref<Ref | null>(null),
      }
    }
  },
  computed: {
    phoneRules() {
      return [
        (v:string) => /^\d{13}$/.test(v.replace(/\D/g, '')) || 'Número de celular inválido. Informe um número de 13 dígitos.',
      ]
    }, 
    nameRules(){
      return [
        (v:string) => !/^[a-zA-Z\s]+$/.test(removeAccents(v)) ? 'O nome deve conter apenas letras e espaços.' : true,
        (v:string) => v.length < 2 ? 'Nome inválido. É necessário ao menos 3 letras.' : true,
        (v:string) => ((v.split(/\s+|,\s*/)).filter(Boolean)).length >= 2  ? true : 'É necessário ao menos um sobrenome.',
        
      ]
    }, 
    emailRules() {
      return [
        (v:string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(v) || 'E-mail inválido.'
      ]
    }
  },
});
</script>

<style lang="sass">
#dynamicForm
  width: 100%
  height: 100vh
  margin: 20px

  .q-stepper
    &__tab--active 
      color: red
    &__tab--done
      color: red
    &__nav
      display: flex
      justify-content: end

  .q-input
    .q-field
      &__control
        color: red
</style>
