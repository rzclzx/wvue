<template>
  <svg :style="styleObj" class="svg-icon" aria-hidden="true">
    <use :xlink:href="url" />
  </svg>
</template>

<script>
export default {
  props: ['name', 'styleObj'],
  computed: {
    url () {
      return `#icon-${this.name}`;
    }
  }
};
</script>
<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
