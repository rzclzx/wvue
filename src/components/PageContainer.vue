<template>
    <div class="container">
        <header class="container__header">
            <slot name="header"></slot>
        </header>
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "PageContainer"
};
</script>
<style lang="scss" scoped>

</style>