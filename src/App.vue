<template>
  <!-- <div id="app"> -->
      <!-- <transition :name="transitionName">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition :name="transitionName">
        <router-view :key="key" v-if="!$route.meta.keepAlive"></router-view>
      </transition> -->
      <!-- <router-view /> -->

      <!-- <a-config-provider :locale="locale"> -->
        <div id="app">
          <router-view />
        </div>
      <!-- </a-config-provider> -->
  <!-- </div> -->
</template>

<script>
export default {
  data () {
    return {
      transitionInit: true,
      transitionName: 'slide'
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
    // const that = this
    // 禁止双指放大
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault()
    })
    // 禁止双击放大
    var lastTouchEnd = 0
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    })
    document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, false)

    window.onbeforeunload = function (e) {
      // that.$Cookies.remove('access_token')
    }
  },
  components: {

  },
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>
