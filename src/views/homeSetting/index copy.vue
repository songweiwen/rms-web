<template>
  <div class="homeSetting page">
      <!-- style="border: 1px solid rgb(235, 237, 240)" -->
    <div class="page-container">

      <div class="">
        <img :src="form.bgImg" alt="">
        <a-upload
          :showUploadList="false"
          @preview="handlePreview"
          :beforeUpload="beforeUpload"
          :customRequest="customRequest"
      >
        <a-button> <a-icon type="upload" /> 上传背景图片 </a-button>
      </a-upload>
      </div>

      <!-- <a-upload
        list-type="picture"
        :default-file-list="fileList"
      >
        <a-button> <a-icon type="upload" /> 上传封面图片 </a-button>
      </a-upload> -->

      <a-form-model
          class="m-t-lg"
          ref="ruleForm"
          layout="vertical"
          :model="form"
          :rules="rules"
        >
          <a-form-model-item ref="videoUrl" label="视频地址" prop="videoUrl">
            <a-input
              v-model="form.videoUrl"
              @blur="
                () => {
                  $refs.videoUrl.onFieldBlur();
                }
              "
            />
          </a-form-model-item>
        </a-form-model>

      <a-button type="primary" @click="onSubmit">
        添加
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      menus: [
        {
          name: '添加图片',
          key: '1',
          icon: 'file-image'
        },
        {
          name: '添加文本',
          key: '2',
          icon: 'file-text'
        },
        {
          name: '添加视频',
          key: '3',
          icon: 'video-camera'
        },
        {
          name: '添加轮播图',
          key: '4',
          icon: 'switcher'
        }
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        bgImg: '',
        videoUrl: ''
      },
      rules: {
        videoUrl: [
          { required: true, message: '请输入视频地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    beforeUpload (file) {
      console.log(file)
      this.imageToBase64(file).then(res => {
        this.form.bgImg = res
      })
    },
    imageToBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file)
        // 开始转
        reader.onload = function () {
          fileResult = reader.result
        }
        // 转 失败
        reader.onerror = function (error) {
          reject(error)
        }
        // 转 结束  咱就 resolve 出去
        reader.onloadend = function () {
          resolve(fileResult)
        }
      })
    },
    async handlePreview (file) {
      console.log(file)
      // this.form.bgImg = file.response.path
    },
    customRequest (file) {
      console.log(file)
    },
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
