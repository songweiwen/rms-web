<template>
  <div class="card" :style="'margin:' + m + 'px'">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: String,
    m: {
      type: Number,
      default: 0
    }
  }
}
</script>
