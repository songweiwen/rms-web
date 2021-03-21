
// 添加修改视频
import { updatePageItem } from '@/api/home'
export const edit = {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    openEdit (item) {
      console.log(item)
      updatePageItem({ id: item.id })
        .then((res) => {
          const data = res.data
          switch (data.type) {
            // 文章
            case 'article':
              this.formArticle = Object.assign(data.jump, data.data)
              this.formArticle.type = data.type
              this.formArticle.id = data.id
              this.formArticle.permission_ids = data.permission_ids
              this.fileListArticle = [
                {
                  uid: '-1',
                  name: data.data.cover,
                  status: 'done',
                  url: data.data.cover,
                  thumbUrl: data.data.cover
                }
              ]
              this.openArticle()
              break
            // 分隔线
            case 'line':
              this.formLine = Object.assign(data.jump, data.data)
              this.formLine.type = data.type
              this.formLine.id = data.id
              this.formLine.permission_ids = data.permission_ids
              this.openLine()
              break
            // 广告图
            case 'banner':
              this.formAd = Object.assign(data.jump, data.data)
              this.formAd.type = data.type
              this.formAd.id = data.id
              this.heightAd = parseInt(data.data.height * 100)
              this.formAd.permission_ids = data.permission_ids
              this.fileListAd = [
                {
                  uid: '-1',
                  name: data.data.cover,
                  status: 'done',
                  url: data.data.cover,
                  thumbUrl: data.data.cover
                }
              ]
              this.openAd()
              break
            // 视频
            case 'video':
              this.formVideo = Object.assign(data.jump, data.data)
              this.formVideo.type = data.type
              this.formVideo.id = data.id
              this.formVideo.permission_ids = data.permission_ids
              this.fileListVideoCover = [
                {
                  uid: '-1',
                  name: data.data.cover,
                  status: 'done',
                  url: data.data.cover,
                  thumbUrl: data.data.cover
                }
              ]
              this.fileListVideoBg = [
                {
                  uid: '-1',
                  name: data.data.bg_image,
                  status: 'done',
                  url: data.data.bg_image,
                  thumbUrl: data.data.bg_image
                }
              ]
              this.openVideo()
              break
            // 导航菜单
            case 'menu':
              this.fileListNavmenu = {}
              this.dataNavmenu = []
              data.data.forEach((e, i) => {
                this.fileListNavmenu['file' + i] = []

                this.dataNavmenu.push({
                  index: i
                })

                this.fileListNavmenu['file' + i].push(
                  {
                    uid: '-1',
                    name: e.icon,
                    status: 'done',
                    url: e.icon,
                    thumbUrl: e.icon
                  }
                )

                console.log(e.jump, i)
                this.dataNavmenu[i] = e.jump
                this.dataNavmenu[i].index = i
                this.dataNavmenu[i].title = e.name
                this.dataNavmenu[i].icon = e.icon
                this.dataNavmenu[i].validate = {
                  validateStatus: 'success',
                  errorMsg: ''
                }
                this.dataNavmenu[i].validateUpload = {
                  validateStatus: 'success',
                  errorMsg: ''
                }
              })
              this.formNavmenu.type = data.type
              this.formNavmenu.id = data.id
              this.formNavmenu.permission_ids = data.permission_ids
              this.openNavmenu()
              break
              // 轮播
            case 'carousel':

              this.fileListSwiper = {}
              this.dataSwiper = []
              data.data.forEach((e, i) => {
                this.fileListSwiper['file' + i] = []

                this.dataSwiper.push({
                  index: i
                })

                this.fileListSwiper['file' + i].push(
                  {
                    uid: '-1',
                    name: e.image,
                    status: 'done',
                    url: e.image,
                    thumbUrl: e.image
                  }
                )

                console.log(e.jump, i)
                this.dataSwiper[i] = e.jump
                this.dataSwiper[i].index = i
                this.dataSwiper[i].title = e.name
                this.dataSwiper[i].image = e.image
                this.dataSwiper[i].validateUpload = {
                  validateStatus: 'success',
                  errorMsg: ''
                }
              })
              this.formSwiper.type = data.type
              this.formSwiper.id = data.id
              this.formSwiper.permission_ids = data.permission_ids
              this.openSwiper()
              break
          }
        })
    }
  }
}
