<template>
  <div class="flex-1 flex flex-col w-1/3 h-full">
    <div class="flex flex-wrap border-b border-l border-r text-sm select-none">
      <span
        class="py-2 px-3 text-gray-500">
        Collection Code
      </span>
    </div>
    <div class="h-full border-l border-r">
      <div v-if="loading" class="flex-1 flex flex-col justify-center align-center">
        <spinner size="large"></spinner>
      </div>
      <codemirror v-else v-model="code" :options="editorOptions"></codemirror>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/php/php';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'CollectionEditor',
  components: {
    codemirror,
    Spinner,
  },
  props: {
    value: String,
    loading: Boolean,
  },
  data() {
    return {
      code: this.value,
      editorOptions: {
        tabSize: 4,
        styleActiveLine: true,
        smartIndent: true,
        indentUnit: 4,
        lineNumbers: true,
        line: true,
        mode: 'text/x-php',
        lineWrapping: true,
      },
    };
  },
  watch: {
    value() {
      this.code = this.value;
    },
    code() {
      this.$emit('input', this.code);
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
