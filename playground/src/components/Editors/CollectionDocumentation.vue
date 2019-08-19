<template>
  <div>
    <div class="flex flex-wrap border-b border-l border-t border-r text-sm select-none">
      <span
        class="py-2 px-3 text-gray-500">
        Collection Documentation
      </span>
      <multiselect class="ml-20 lg:ml-auto lg:w-1/2 lg:flex-grow-0 inline border-none flex-grow" placeholder="Search for a method" label="method" :options="methods" @input="showMethod"></multiselect>
      <button
        @click="toggleDocs"
        class="py-2 px-3 focus:outline-none border-b-3 transition border-transparent hover:bg-gray-200">
        {{ docs ? 'Hide' : 'Show' }}
      </button>
    </div>
    <div v-if="docs" class="border-l border-r">
      <div class="method-docs">
        <div class="docs px-5" v-html="methodDocs"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import methodsHtml from './../../docs/methods.md';
  import 'highlight.js/styles/github.css';
  import methods from '../../docs/methods.json'
  import Multiselect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css'


  export default {
    name: 'CollectionDocumentation',
    components: {
      Multiselect
    },
    data() {
      return {
        methodDocs: methodsHtml,
        docs: true,
        methods: methods,
      }
    },
    methods: {
      toggleDocs () {
        this.docs = !this.docs
      },
      showMethod(data) {
        if (!this.docs) this.toggleDocs();

        this.$nextTick(() => {
          this.$el.querySelector(`#${data.id}`).scrollIntoView();
        })
      }
    },
  }
</script>

<style scoped>
  .method-docs {
    height: 40vh;
    overflow-y: scroll;
  }
</style>

<style>
  .multiselect {
    width: auto;
  }

  .multiselect__tags {
    border: none;
  }
</style>
