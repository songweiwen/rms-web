<template>
    <div class="ts-img" @click="onClick">
      <img :src="src"
            :alt="alt"
            :style="{'object-fit': mode}"
            @load="onLoad"
            @error="onError">
      <div v-if="this.loading" class="tm-image-load">
          <slot name="loading">加载中</slot>
      </div>
      <div v-if="this.error" class="tm-image-error">
          <slot name="error">加载出错</slot>
      </div>
    </div>
</template>

<script>

export default {
  name: 'tm-image',
  data () {
    return {
      loading: true,
      error: false
    }
  },
  props: {
    src: String,
    alt: String,
    mode: { // 模式：https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit
      type: String,
      default: 'fill',
      validator (value) {
        return ['contain', 'cover', 'fill', 'none', 'scale-down'].includes(value)
      }
    },
    width: [String, Number],
    height: [String, Number]
  },
  computed: {
  },
  methods: {
    onClick (event) {
      this.$emit('click', event) // 向父节点传递一个自定义事件
    },
    onLoad (event) {
      this.loading = false
      this.$emit('loading', event) // 向父节点传递一个自定义事件
    },
    onError (event) {
      this.loading = false
      this.error = true
      this.$emit('error', event) // 向父节点传递一个自定义事件
    }
  }
}
</script>
