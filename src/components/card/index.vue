<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'card'
}
</script>
<style lang="less" scope>
.card {
  background-color: #fff;
  border-radius: 17px;
}
</style>
