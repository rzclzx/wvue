<template>
  <div class="flex-start-center">
    <div class="flex-center-center" :style="{flexGrow: 1,height:`${height}px`}"
      v-for="item in data"
      :key="item.key"
    >
      <div class="flex-center-center" style="height: 65%;width: 100%" :class="{borderRight: item.line}">
        <div class="flex-start-center">
          <img :style="{width: `${iconWidth}px`}" :src="item.icon" />
          <div style="margin-left: 15px;">
            <div :style="{fontSize: `${fontSize}px`,fontWeight:fontWeight,color:item.color}">{{ item.value }}</div>
            <div class="fontcolor" style="margin-top:5px;font-size:12px;padding-left:2px">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['data','height','iconWidth','fontSize','fontWeight'],
  data () {
    return {
      
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/public.scss";
  .borderRight {
    border-right: solid 1px $inputbordercolor;
  }
</style>
