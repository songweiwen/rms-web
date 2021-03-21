<template>
  <div>
    <a-form-model-item label="跳转方式" prop="jump_type">
      <a-select v-model="jump_type">
        <a-select-option
          v-for="(item, index) in jumpTypeOtion"
          :key="index"
          :value="item.type">
            {{item.name}}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <!-- <a-input v-model="inputVal" @change="change($event)"/> -->

    <!-- 跳转至H5 type = 1 -->
    <template v-if="jump_type===1">
      <a-form-model-item label="url" prop="url" placeholder="请输入跳转url">
        <a-input v-model="formJump.url"/>
      </a-form-model-item>
    </template>

    <!-- 跳转至mpaas小程序 type = 2  -->
    <template v-else-if="jump_type===2">
      <a-form-model-item label="mpaas小程序ID" prop="mpaas_id" placeholder="请输入跳转url">
        <a-input v-model="formJump.mpaas_id"/>
      </a-form-model-item>
      <a-form-model-item disabled label="小程序关联赛事" prop="stage_id" placeholder="请输入跳转url">
        <a-select v-model="formJump.stage_id">
          <a-select-option
            v-for="(item) in optionStage"
            :key="item.id"
            :value="item.id">
              {{item.name}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </template>

    <!-- 跳转至富文本 type = 3 -->
    <!-- <template v-else-if="jump_type===3">
      <a-form-model-item label="富文本内容" prop="content" placeholder="请输入跳转url">
        <a-input v-model="formJump.content"/>
      </a-form-model-item>
    </template> -->

    <!-- 跳转至直播间 type = 4 -->
    <template v-else-if="jump_type===4">
      <a-form-model-item label="小程序关联赛事" prop="stage_id" placeholder="请输入跳转url">
        <a-select v-model="formJump.stage_id">
          <a-select-option
            v-for="(item) in optionStage"
            :key="item.id"
            :value="item.id">
              {{item.name}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </template>

    <!-- 跳转至微信小程序 type = 5 -->
    <template v-else-if="jump_type===5">
      <a-form-model-item label="微信小程序原始ID" prop="user_name" placeholder="请输入跳转url">
        <a-input v-model="formJump.user_name"/>
      </a-form-model-item>
      <a-form-model-item label="微信小程序路径" prop="path" placeholder="请输入跳转url">
        <a-input v-model="formJump.path"/>
      </a-form-model-item>
    </template>

    <!-- 跳转至课程详情 type = 6 -->
    <template v-else-if="jump_type===6">
      <a-form-model-item label="课程ID" prop="mpaas_id" placeholder="请输入跳转url">
        <a-input v-model="formJump.course_id"/>
      </a-form-model-item>
    </template>

    <!-- 跳转至赛事详情 type = 7 -->
    <template v-else-if="jump_type===7">
      <a-form-model-item label="跳转至赛事详情" prop="mpaas_id" placeholder="请输入跳转url">
        <a-select v-model="formJump.stage_id">
          <a-select-option
            v-for="(item) in optionStage"
            :key="item.id"
            :value="item.id">
              {{item.name}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </template>

    <!-- 跳转至作品列表 type = 8 -->
    <template v-else-if="jump_type===8">
      <a-form-model-item label="过滤年级" prop="mpaas_id" placeholder="请输入跳转url">
        <!-- <a-input v-model="formJump.grade"/> -->
          <a-select
            v-model="gradeVal"
            mode="multiple"
            style="width: 100%;"
            placeholder="选择过滤年级"
          >
            <!-- :default-value="['a1', 'b2']" -->
            <a-select-option
              v-for="(item, index) in optionGrade"
              :key="index">
              {{item.label}}
            </a-select-option>
          </a-select>
      </a-form-model-item>
      <a-form-model-item label="过滤作品标签" prop="mpaas_id" placeholder="请输入跳转url">
        <!-- <a-input v-model="formJump.tags"/> -->
        <a-select
          v-model="tagsVal"
          mode="tags"
          style="width: 100%;"
          placeholder="手动填写过滤标签">
          <a-select-option
            v-for="(item, index) in optionTags"
            :key="index">
            {{item}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </template>

    <!-- 跳转至作品列表 type = 9 -->
    <template v-else-if="jump_type===9">
      <a-form-model-item label="跳转至新页面" prop="mpaas_id" placeholder="请输入跳转url">
        <!-- <a-input v-model="formJump.jump_page_id"/> -->
        <a-select
          v-model="formJump.jump_page_id"
          style="width: 100%;"
          placeholder=选择跳转新页面>
          <a-select-option
            v-for="(item) in optionPageClass"
            :key="item.id">
            {{item.title}}
            <!-- {{item}} -->
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </template>
  </div>
</template>

<script>
import { get } from '@/mixins/get'
export default {
  name: 'jumpType',
  mixins: [get],
  props: {
    typeVal: {
      type: Number,
      default: 0
    },
    formProp: {}
    // matchOtion: []
    // formJump: {
    //   type: Object
    // }
  },
  data () {
    return {
      jump_type: this.typeVal,
      jumpTypeOtion: [
        {
          name: '不跳转',
          type: 0
        },
        {
          name: '跳转至H5',
          type: 1
        },
        {
          name: '跳转至mpaas小程序',
          type: 2
        },
        {
          name: '跳转至富文本',
          type: 3
        },
        {
          name: '跳转至直播间',
          type: 4
        },
        {
          name: '跳转至微信小程序',
          type: 5
        },
        {
          name: '跳转至课程详情',
          type: 6
        },
        {
          name: '跳转至赛事详情',
          type: 7
        },
        {
          name: '跳转至作品列表',
          type: 8
        },
        {
          name: '跳转至新页面',
          type: 9
        }
      ],
      formJump: {
        url: '', // 1
        mpaas_id: '', // 2
        stage_id: 0, // type=2|4|7
        content: '', // 3
        user_name: '', // 5
        path: '', // 5
        course_id: 0, // 6
        grade: '', // 7
        tags: '', // 7
        jump_page_id: 0 // 9
      },
      // mpaassOtion: [],
      optionStage: [],
      optionGrade: [{
        label: '幼儿园',
        id: '0'
      }],
      gradeVal: [],
      optionTags: [],
      tagsVal: [],
      optionPageClass: []
    }
  },
  created () {
    if (this.$store.getters.optionStage.length === 0) {
      this.getStageSelect()
    } else {
      this.optionStage = this.$store.getters.optionStage
    }

    if (this.$store.getters.optionPageClass.length === 0) {
      this.getPageSelect().then(res => {
        const data = res.data
        this.optionPageClass = data
        // console.log(res)
        this.$store.commit('SET_optionPageClass', data)
      })
    } else {
      this.optionPageClass = this.$store.getters.optionPageClass
    }

    // this.getPermissionSelect()
    // this.getOrgSelect()

    for (let i = 1; i < 10; i++) {
      this.optionGrade.push({
        label: i + '年级',
        id: String(i)
      })
    }
    Object.assign(this.formJump, this.formProp)
    if (this.formProp.grade) {
      this.formProp.grade.forEach(e => {
        this.gradeVal.push(Number(e))
      })
    }
    if (this.tagsVal) {
      this.tagsVal = this.formProp.tags
    }
  },
  computed: {
    // jump_type: {
    //   get () {
    //     // return 123;
    //     return this.typeVal
    //   },
    //   set (newValue) {
    //     return newValue
    //   }
    // }
  },
  methods: {
    change (e) {
      console.log(e.target.value)
      this.$emit('changeValue', e.target.value)
    }
  },
  watch: {
    typeVal (val) {
      this.jump_type = val
    },
    jump_type (val) {
      this.$emit('updateType', val)
      this.formJump = {
        url: '', // 1
        mpaas_id: '', // 2
        stage_id: 0, // type=2|4|7
        // content: '', // 3
        user_name: '', // 5
        path: '', // 5
        course_id: 0, // 6
        grade: '', // 7
        tags: '', // 7
        jump_page_id: 0 // 9
      }
      this.gradeVal = []
      this.tagsVal = []
      Object.assign(this.formJump, this.formProp)
      if ((val === 2 || val === 4 || val === 7) && this.formJump.stage_id === 0) {
        this.formJump.stage_id = ''
      } else if (val === 6 && this.formJump.course_id === 0) {
        this.formJump.course_id = ''
      } else if (val === 9 && this.formJump.jump_page_id === 0) {
        this.formJump.jump_page_id = ''
      }
    },
    gradeVal (val) {
      if (val) {
        this.formJump.grade = val.join(',')
      }
    },
    tagsVal (val) {
      if (val) {
        this.formJump.tags = val.join(',')
      }
    },
    formJump: {
      handler (newVal, oldVal) {
        if (this.formJump.index) {
          newVal.index = this.formJump.index
        }
        this.$emit('updateForm', newVal)
      },
      deep: true
    }
  }
}
</script>
