<template>
  <div class="relative bg-laravel-red flex items-stretch select-none text-white">
    <div class="text-2xl font-semibold ml-3 self-center py-2 transition cursor-pointer flex-grow">
      Laravel Collection Playground
    </div>
    <button
      :disabled="!saveable"
      @click="$emit('save')"
      :class="save">
      <svg viewBox="0 0 24 24" class="fill-current h-5 mr-2">
        <path
          d="M20 15v4c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-14c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-4c0-0.552-0.448-1-1-1s-1 0.448-1 1v4c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-4c0-0.552-0.448-1-1-1s-1 0.448-1 1zM11 5.414v9.586c0 0.552 0.448 1 1 1s1-0.448 1-1v-9.586l3.293 3.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5-5c-0.096-0.096-0.206-0.168-0.324-0.217s-0.247-0.076-0.383-0.076c-0.13 0-0.261 0.025-0.383 0.076-0.118 0.049-0.228 0.121-0.324 0.217l-5 5c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z"></path>
      </svg>
      Save
    </button>
    <button
      :disabled="!forkable"
      @click="$emit('save')"
      :class="fork">
      <svg viewBox="0 0 16 28" class="fill-current h-5 mr-3">
        <path
          d="M4.5 23c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5zM4.5 5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5zM14.5 7c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5zM16 7c0 1.109-0.609 2.078-1.5 2.594-0.047 5.641-4.047 6.891-6.703 7.734-2.484 0.781-3.297 1.156-3.297 2.672v0.406c0.891 0.516 1.5 1.484 1.5 2.594 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-1.109 0.609-2.078 1.5-2.594v-12.812c-0.891-0.516-1.5-1.484-1.5-2.594 0-1.656 1.344-3 3-3s3 1.344 3 3c0 1.109-0.609 2.078-1.5 2.594v7.766c0.797-0.391 1.641-0.656 2.406-0.891 2.906-0.922 4.562-1.609 4.594-4.875-0.891-0.516-1.5-1.484-1.5-2.594 0-1.656 1.344-3 3-3s3 1.344 3 3z"></path>
      </svg>
      Fork
    </button>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    saveable: Boolean,
    forkable: Boolean,
  },
  computed: {
    save() {
      return [
        'ml-8',
        'flex',
        'items-center',
        'px-4',
        'transition',
        'py-2',
        this.saveable ? 'cursor-pointer' : 'cursor-not-allowed',
        this.saveable ? 'hover:bg-red-700' : 'opacity-25',
      ];
    },
    fork() {
      return [
        'flex',
        'items-center',
        'px-4',
        'transition',
        'py-2',
        this.forkable ? 'cursor-pointer' : 'cursor-not-allowed',
        this.forkable ? 'hover:bg-red-700' : 'opacity-25',
      ];
    },
  },
};
</script>

<style scoped>

</style>
