<template>
  <div class="flex-1 flex flex-col align-center h-full">
    <div class="bg-red-700 text-white font-bold px-4 py-2">
      Execution Failed - {{ error.type }}
    </div>
    <div class=" border-red-400 bg-red-100 px-4 py-3 text-red-700 h-full">
      <p class="whitespace-pre-wrap">{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhpError',
  props: {
    error: Object,
  },
};
</script>

<style scoped>

</style>
