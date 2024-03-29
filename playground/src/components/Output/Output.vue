<template>
  <div class="flex-1 flex flex-col w-1/3">
    <div class="flex flex-wrap border-b text-sm select-none">
      <span
        class="py-2 px-3 text-gray-500">
        Output
      </span>
      <button
        @click="download"
        class="ml-auto py-2 px-3 focus:outline-none border-b-3 transition border-transparent hover:bg-gray-200 focus:bg-gray-400">
        Download
      </button>
    </div>
    <div class="h-full">
      <php-loading v-if="!phpLoaded && !value"></php-loading>
      <php-error v-else-if="outputError" :error="outputError"></php-error>
      <codemirror v-else v-model="outputJson" :options="editorOptions"></codemirror>
    </div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver';
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript';
import PhpLoading from './PhpLoading.vue';
import PhpError from './PhpError.vue';

export default {
  name: 'Output',
  components: {
    PhpError,
    PhpLoading,
    codemirror,
  },
  props: {
    value: String,
  },
  data() {
    return {
      phpLoaded: false,
      outputJson: this.value || null,
      outputError: null,
      editorOptions: {
        readOnly: 'nocursor',
        tabSize: 2,
        lineNumbers: true,
        line: true,
        mode: 'application/json',
        lineWrapping: false,
      },
    };
  },
  watch: {
    value(data) {
      this.outputJson = data;
    },
  },
  methods: {
    formatJson(json) {
      if (!json) return '';

      return JSON.stringify(JSON.parse(json), null, 2);
    },
    download() {
      saveAs(new Blob([this.outputJson], {type: "application/json;charset=utf-8"}), 'output.json')
    }
  },
  created() {
    if (!window.isSupportedBrowser) {
      this.phpLoaded = true;
      this.outputError = {
        type: 'Browser Not Supported',
        message: `To use the playground, a recent desktop browser version supporting web assembly is required.

Chrome: >= v60
Firefox: >= v60
Safari: >= v13

Please try on one of the supported browsers. If you are still having issue, create a github issue.
`
      }
      return;
    }

    this.$root.$on('php.loaded', () => {
      this.phpLoaded = true;
    });

    this.$root.$on('php.print', (line) => {
      let res;

      try {
        res = JSON.parse(line);
      } catch (e) {
        return;
      }

      if (!res.result && !res.error) {
        return;
      }

      this.outputJson = this.formatJson(JSON.stringify(res.result));
      this.outputError = res.error;


      this.$emit('error', this.outputError);
      if (this.outputJson) this.$emit('input', this.outputJson);
    });
  },
};
</script>

<style scoped>
  .vue-codemirror {
    width: 100% !important;
    height: 100% !important;
  }

  .CodeMirror {
    width: 100% !important;
    height: 100% !important;
  }
</style>
