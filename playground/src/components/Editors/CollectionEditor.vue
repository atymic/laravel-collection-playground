<template>
  <div class="flex-1 flex flex-col">
    <div class="flex flex-wrap border-b border-l border-r text-sm select-none">
      <button
        class="py-2 px-3 focus:outline-none focus:bg-gray-200 text-gray-500">
        Collection Code
      </button>
    </div>
    <div class="flex-1 flex border-l border-r ">
      <div v-if="loading" class="flex-1 flex flex-col justify-center align-center">
        <spinner size="large"></spinner>
      </div>
      <codemirror v-else v-model="code" :options="editorOptions"></codemirror>
    </div>
  </div>
</template>

<script>
    import {codemirror} from 'vue-codemirror';
    import 'codemirror/mode/php/php.js';
    import Spinner from 'vue-simple-spinner'

    export default {
        name: 'CollectionEditor',
        components: {
            codemirror,
            Spinner
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
            }
        },
    };
</script>

<style scoped>

</style>
