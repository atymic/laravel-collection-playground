<template>
  <div class="flex-1 flex flex-col justify-center align-center">
    <div class="text-center object-center">
      <spinner size="large"></spinner>
      <h3 class="text-2xl mt-3">Loading PHP</h3>
      <p class="mt-1">This may take up to <strong>30s</strong>, due to the large file size.</p>
      <p class="px-5 text-gray-600 text-sm mt-3" v-if="failed">It's been over 30 seconds and PHP still hasn't loaded.<br> Either you are on an
        unsupported platform, there was a network/javascript error. Check the developer console!</p>
    </div>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';

export default {
  name: 'PhpLoading',
  components: {
    Spinner,
  },
  data() {
    return {
      failed: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.failed = true;
    }, 30000);
  },
};
</script>

<style scoped>

</style>
