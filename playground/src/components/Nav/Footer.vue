<template>
  <div class="px-3 py-1 text-sm border-t flex">
    <div>PHP: {{ loadTime ? `Loaded in ${loadTime}s` : 'Loading'}}</div>
    <div class="ml-auto">Github:
      <a class="text-blue-700" href="https://github.com/atymic/laravel-collection-playground">
        atymic/laravel-collection-playground
      </a>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                mountedAt: Date.now(),
                loadTime: null,
            }
        },
        created() {
            this.$root.$on('php.loaded', () => {
                this.loadTime = ((Date.now() - this.mountedAt) / 1000).toFixed(1);
            })
        }
    }
</script>

<style scoped>

</style>
