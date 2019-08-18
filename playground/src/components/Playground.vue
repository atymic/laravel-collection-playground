<template>
  <main>
    <div class="w-screen h-screen flex flex-col">
      <navbar
        :saveable="!isSavedPlayground"
        :forkable="isSavedPlayground"
        @save="save"
      ></navbar>
      <div class="flex-1 flex">
        <div class="flex flex-1 flex-row border-r">
          <json-input-editor
            title="Input JSON"
            :editable="true"
            v-model="input"
            :loading="loading"
          ></json-input-editor>

          <collection-editor
            v-model="code"
            :loading="loading"
          ></collection-editor>

          <php-output v-model="output"></php-output>
        </div>
      </div>
      <p-footer></p-footer>
    </div>
  </main>
</template>

<script>
import { debounce } from 'lodash';
import ApiClient from '../apiClient';
import defaults from '../defaults';

import CollectionEditor from './Editors/CollectionEditor.vue';
import JsonInputEditor from './Editors/JsonInputEditor.vue';
import Output from './Output/Output.vue';
import Navbar from './Nav/Navbar.vue';
import Footer from './Nav/Footer.vue';

export default {
  components: {
    'p-footer': Footer,
    Navbar,
    'php-output': Output,
    JsonInputEditor,
    CollectionEditor,
  },
  data() {
    return {
      phpLoaded: false,
      loading: false,
      id: null,
      input: null,
      code: null,
      output: '',
    };
  },
  watch: {
    $route() {
      this.onMount();
    },
    input(to, from) {
      this.onInputsChange(to, from);
    },
    code(to, from) {
      this.onInputsChange(to, from);
    },
  },
  methods: {
    execute: debounce(function () { // eslint-disable-line
      this.output = null;

      if (!this.phpLoaded) return;

      this.$root.$emit('php.run.collection', this.input, this.code);
    }, 500),
    load(data) {
      this.input = JSON.stringify(JSON.parse(data.input), null, 2);
      this.code = data.code;

      if (data.output) {
        this.output = JSON.stringify(JSON.parse(data.output), null, 2);
      }
    },
    save() {
      this.loading = true;
      ApiClient.save(this.input, this.code, this.output).then((id) => {
        this.id = id;
        this.$router.push(`/?p=${id}`);
      }).catch((err) => {
        alert(`Failed to save, response code ${err.response.status}`); // eslint-disable-line
        this.loading = false;
      });
    },
    localSave() {
      localStorage.setItem('playground-data', JSON.stringify({
        code: this.code,
        input: this.input,
      }));
    },
    onInputsChange(to, from) {
      if (!from) return;

      // If we have changed a saved playground, switch to editing mode
      if (this.isSavedPlayground && to.trim() !== from.trim()) {
        this.id = null;
        this.$router.push('/');
      }

      this.localSave();
      this.execute();
    },
    onMount() {
      const playgroundId = this.$route.query.p;

      // Handle route change where playground is already loaded
      if (playgroundId && this.id === playgroundId) {
        this.loading = false;
        return;
      }

      // Load isSavedPlayground playground
      if (playgroundId) {
        this.loading = true;
        ApiClient.load(playgroundId).then((data) => {
          this.id = data.id;
          this.loading = false;
          this.load(data);
        }).catch(() => {
          this.loading = false;
          this.$router.push('/');
        });

        return;
      }

      // Load from local storage if locally isSavedPlayground playground exists
      const localData = localStorage.getItem('playground-data');

      if (localData) {
        this.load(JSON.parse(localData));
        return;
      }

      // Load defaults
      this.load(defaults);
    },
  },
  computed: {
    isSavedPlayground() {
      return this.id !== null;
    },
  },
  mounted() {
    this.$root.$on('php.loaded', () => {
      this.phpLoaded = true;

      if (this.isSavedPlayground) {
        return;
      }

      setTimeout(() => {
        this.execute();
      }, 100);
    });
    this.onMount();
  },

};
</script>

<style scoped>

</style>
