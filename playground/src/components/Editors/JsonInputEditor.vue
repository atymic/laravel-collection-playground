<template>
  <div class="flex-1 flex h-full flex-col w-1/3">
    <div class="flex flex-wrap border-b text-sm select-none">
      <span
        class="py-2 px-3 text-gray-500">
        Input Json
      </span>
      <button
        @click="tidy"
        class="ml-auto py-2 px-3 focus:outline-none border-b-3 transition border-transparent hover:bg-gray-200 focus:bg-gray-400">
        Tidy
      </button>
    </div>
    <div class="h-full">
      <div v-if="loading" class="flex justify-center align-center">
        <spinner size="large"></spinner>
      </div>
      <codemirror v-else v-model="json" :options="editorOptions"></codemirror>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'JsonInputEditor',
  components: {
    codemirror,
    Spinner,
  },
  props: {
    value: String,
    loading: Boolean,
  },
  watch: {
    value() {
      this.json = this.value;
    },
    json() {
      this.$emit('input', this.json);
    },
  },
  data() {
    return {
      json: this.value,
      editorOptions: {
        tabSize: 2,
        lineNumbers: true,
        line: true,
        mode: 'application/json',
        lineWrapping: false,
      },
    };
  },
  methods: {
    tidy() {
      this.json = this.tidyJson(this.json);
    },
    tidyJson(data) {
      let parsed;
      try {
        parsed = JSON.parse(data);
      } catch (e) {
        return data;
      }

      return JSON.stringify(parsed, null, 2);
    },
  },
};
</script>

<style scoped>
  .vue-codemirror {
    width: 100% !important;
    height: 100% !important;
  }
</style>


<style>
  .CodeMirror {
    height: 100% !important;
    width: 100% !important;
  }
</style>
