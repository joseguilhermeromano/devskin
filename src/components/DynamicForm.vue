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
        <q-form ref="formStep1">
          <q-input
            v-model="fullName"
            label="Nome Completo"
            :rules="nameRules"
            required
          />
          <q-input
            v-model="email"
            label="E-mail"
            :rules="emailRules"
            required
          />
          <q-input
            v-model="celularNumber"
            label="Celular"
            mask="+## (##) # ####-####"
            :rules="phoneRules"
          />
        </q-form>
      </q-step>

      <q-step
        :name="2"
        title="Endereço"
        :done="step > 2"
      >
        <q-form ref="formStep2" id="formStep2">
          <q-input
            v-model="cep"
            label="CEP"
            :rules="cepRules"
            mask="#####-###"
            v-on:blur="onGetAddress"
            required
          />
          <q-input
            v-model="cepRua"
            label="Rua"
            disable
          />
          <q-input
            v-model="cepNumero"
            label="Número"
            :rules="numberRules"
          />
          <q-input
            v-model="cepComplemento"
            label="Complemento"
          />
          <q-input
            v-model="cepBairro"
            label="Bairro"
            disable
          />
          <q-input
            v-model="cepCidade"
            label="Cidade"
            disable
          />
          <q-input
            v-model="cepEstado"
            label="Uf"
            disable
          />
          
        </q-form>
      </q-step>

      <q-step
        :name="3"
        title="Formação"
        :done="step > 3"
      >
      <q-form ref="formStep3" id="formStep3">
        <q-input
          v-model="instituicao"
          label="Instituição"
          :rules="school"
        />
        <q-input
          v-model="curso"
          label="Curso"
          :rules="course"
        />
        <q-input
          v-model="dataInicio"
          label="Início"
          mask="##/##/####"
          :rules="validateDateIni"
        />
        <q-input
          v-model="dataFinal"
          label="Final"
          mask="##/##/####"
          :rules="validateDateFim"
        />
      </q-form>
      </q-step>

      <template v-slot:navigation >
        <q-stepper-navigation>
          <q-btn v-if="step > 1" flat :color="templateColor" @click="onBackStep" label="Voltar" class="q-ml-sm"></q-btn>
          <q-btn @click="onContinueStep" :color="templateColor" :label="step === 3 ? 'Enviar' : 'Próximo'"></q-btn>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
  <AlertMessage ref="msgRef"/>
</template>

<script lang="ts">
import { defineComponent, ref, Ref} from 'vue';
import { QForm } from 'quasar';
import AlertMessage from './AlertMessage.vue';

const stepperRef = ref<Ref | null>(null);
const step = ref<number>(1);
const step1 = ref<string>('');
const step2 = ref<string>('');
const step3 = ref<string>('');

const removeAllChars = (str:string):string => {
  return str.replace(/\D/g, '')
}

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
  components: {
    AlertMessage,
  },
  data() {
    return {
      fullName: '', 
      email: '',
      celularNumber: '', 
      cep: '', 
      cepRua:'', 
      cepNumero: '',
      cepComplemento: '', 
      cepBairro:'', 
      cepCidade:'', 
      cepEstado:'', 
      instituicao: '', 
      curso: '', 
      dataInicio: '', 
      dataFinal: '',
      message: '',
    }
  },
  setup(props) {
    return { ...props, stepperRef, step, step1, step2, step3, AlertMessage, onBackStep };
  },
  computed: {
    school() {
      return [
        (v:string) => !!v || 'A instituição é obrigatória',
      ]
    },
    course() {
      return [
        (v:string) => !!v || 'O curso é obrigatória',
      ]
    },
    validateDateIni() {
      return [
        (v:string) => !!v || 'A data inicial é obrigatória',
      ]
    },
    validateDateFim() {
      return [
        (v:string) => !!v || 'A data final é obrigatória',
      ]
    },
    phoneRules() {
      return [
        (v:string) => /^\d{13}$/.test(removeAllChars(v)) || 'Número de celular inválido. Informe um número de 13 dígitos.',
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
    },
    cepRules() {
      return [
        (v:string) => !!v || 'CEP é obrigatório',
        (v:string) => /^\d{8}$/.test(removeAllChars(v)) || 'CEP inválido (digite 8 números)',
      ];
    },
    numberRules() {
      return [
        (v:string) => !!v || 'O Número é obrigatório',
        (v:string) => /^\d+$/.test(v) || 'Digite apenas números',
      ];
    },
  },
  methods:{
    async onContinueStep() {
      switch (step.value) {
        case 1:
          const formStep1 = this.$refs['formStep1'] as QForm | undefined;
          if (formStep1) {
            if (await formStep1.validate()) {
              if (stepperRef.value) stepperRef.value.next()
            }
          }
          break;
          case 2:
          const formStep2 = this.$refs['formStep2'] as QForm | undefined;
          if (formStep2) {
            if (await formStep2.validate()) {
              if (stepperRef.value) stepperRef.value.next()
            }
          }
          break;
        default:
          const alertMsg = this.$refs.msgRef as typeof AlertMessage;
          const msg = `
          <br><b>Contato</b><br><br>
          <b>Nome Completo</b>: ${this.fullName}<br>
          <b>E-mai</b>l:${this.email}<br>
          <b>Celular</b>: ${this.celularNumber}<br>
          <br><b>Endereço</b><br><br>
          <b>CEP</b>: ${this.cep}<br>
          <b>Rua</b>: ${this.cepRua}<br>
          <b>Número</b>: ${this.cepNumero}<br>
          <b>Complemento</b>: ${this.cepComplemento}<br>
          <b>Bairro</b>: ${this.cepBairro}<br>
          <b>Cidade</b>: ${this.cepCidade}<br> 
          <b>Estado</b>: ${this.cepEstado}<br> 
          <br><b>Formação</b><br><br>
          <b>Instituição</b>: ${this.instituicao}<br>
          <b>Curso</b>: ${this.curso}<br>
          <b>Data Inicial</b>: ${this.dataInicio}<br>
          <b>Data Final</b>: ${this.dataFinal}.`
          if (alertMsg) alertMsg.show('Dados Recebidos', 'check_circle', 'green', msg);
          break;
      }
    },
    async onGetAddress() {
      try {
        const str = removeAllChars(this.cep);
        const response = await fetch(`https://viacep.com.br/ws/${str}/json/`);
        const data = await response.json();

        if (data.erro) throw new Error;
        
        this.cepRua = data.logradouro;
        this.cepBairro = data.bairro;
        this.cepCidade = data.localidade;
        this.cepEstado = data.uf;
      } catch (error) {
        const alertMsg = this.$refs.msgRef as typeof AlertMessage;
        const msg = 'Ooops, o servidor retornou um erro. Tente novamente mais tarde.'
        if (alertMsg) alertMsg.show('Erro', 'error', 'red',  msg);
      }
    },

  }
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
      gap: 10px

  .q-input
    .q-field
      &__control
        color: red

#formStep2
  display: flex
  justify-content: space-between
  flex-direction: row
  flex-wrap: wrap
  .q-input
    width: 33%
</style>
