<template>
  <img :src="url" :style="{width: `${size}px`}" />
</template>

<script>
export default {
  props: ['name', 'type', 'size'],
  computed: {
    url () {
      return require(`@/assets/images/${this.name}.${this.type || 'png'}`);
    }
  }
}
</script>

<style scoped>

</style>
