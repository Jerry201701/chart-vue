<template>
  <div class="page-container">
    <!--工具栏-->
    <div
      class="toolbar"
      style="float: left; padding-top: 10px; padding-left: 15px"
    >
     <el-tabs  @tab-click="handleClick" >
    <el-tab-pane label="注册用户列表" name="1"></el-tab-pane>
    <el-tab-pane label="注册用户统计" name="2"></el-tab-pane>
    <!-- <el-tab-pane label="角色管理" name="third"></el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane> -->
  </el-tabs>


      <el-form :inline="true" :model="filters" :size="size" >
        <el-form-item label="registerTime" prop="registerTime" >
          <el-date-picker
            v-model="pageRequest.registerTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="nickName" prop="nickName">
          <el-input v-model="filters.label" placeholder="nickName"></el-input>
        </el-form-item> -->
      
          <el-form-item label="gender" prop="gender" >
            <el-select v-model="pageRequest.gender" placeholder="请选择" >
              <el-option
                v-for="item in genderOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="memberType" prop="memberType">
            <el-select v-model="pageRequest.memberType" placeholder="请选择">
              <el-option
                v-for="item in memberTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
        </el-form-item>
         
          <el-button
            size="mini"
            type="primary"
            icon="fa fa-search"
            @click="findPage(null)"
          >
            {{ $t("action.search") }}
          </el-button>
          <el-button type="primary" @click="getToken()">
            刷新token
          </el-button>
      </el-form>
      
    </div>
   

    <div v-if="tableVisible==1">
      
      <el-table
        :data="tableData.list"
        :highlight-current-row="highlightCurrentRow"
        v-loading="loading"
        :element-loading-text="$t('action.loading')"
        :border="border"
        :stripe="stripe"
        :show-overflow-tooltip="showOverflowTooltip"
        :max-height="maxHeight"
        :height="height"
        size="small"
        align="left"
        style="width: 100%">
        <el-table-column
          v-for="column in columns"
          header-align="center"
          align="center"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :key="column.prop"
          :type="column.type"
          :formatter="column.formatter"
          :sortable="column.sortable == null ? true : column.sortable"
        >
        </el-table-column>

        <el-table-column label="operation">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="approve(scope.$index, scope.row)"
              >detail</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="toolbar" style="padding: 10px">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          @current-change="refreshPageRequest"
          :current-page="pageRequest.pageNum"
          :page-size="pageRequest.pageSize"
          :total="data.totalSize"
          style="float: right"
        >
        </el-pagination>
      </div>
    </div>

    <!--新增编辑界面-->
    <el-dialog
      :title="operation ? 'add' : 'edit'"
      width="40%"
      :visible.sync="editDialogVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="dataForm" label-width="80px" ref="dataForm" :size="size">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input
            v-model="dataForm.id"
            :disabled="true"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="nickName" prop="nickName">
          <el-input v-model="dataForm.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="gender" prop="gender">
          <el-radio-group v-model="dataForm.gender">
            <el-radio :label="true">male</el-radio>
            <el-radio :label="false">female</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="birthday" prop="birthday">
          <el-date-picker
            v-model="dataForm.birthday"
            type="date"
            placeholder="choose date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="looking for" prop="gender">
          <el-radio v-model="dataForm.lookingFor" :label="true">male</el-radio>
          <el-radio v-model="dataForm.lookingFor" :label="false"
            >female</el-radio
          >
        </el-form-item>
        <el-form-item prop="email" label="email">
          <el-input v-model="dataForm.email"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  <div v-if="tableVisible==2" >
    <el-form label-position="left" label-width="100px" :model="formLabelAlign" disabled>
  <el-form-item label="注册总人数">
    <el-input v-model="formLabelAlign.totalNumber"></el-input>
  </el-form-item>
  <el-form-item label="男性">
    <el-input v-model="formLabelAlign.maleNumber"></el-input>
  </el-form-item>
  <el-form-item label="女性">
    <el-input v-model="formLabelAlign.femaleNumber"></el-input>
  </el-form-item>
  <el-form-item label="普通会员">
    <el-input v-model="formLabelAlign.generalMember"></el-input>
  </el-form-item>
  <el-form-item label="付费会员">
    <el-input v-model="formLabelAlign.payMember"></el-input>
  </el-form-item>
</el-form>
  </div>
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable";
import KtButton from "@/views/Core/KtButton";
import { format, randomString, birthday } from "@/utils/datetime";
import Cookies from "js-cookie";
import COS from "cos-js-sdk-v5";

export default {
  components: {
    KtTable,
    KtButton,
  },
  props: {},
  data() {
    return {
      columns: [
        { prop: "id", label: "ID", minWidth: 50 },
        { prop: "nickName", label: "nickname", minWidth: 50 },
        {
          prop: "gender",
          label: "gender",
          minWidth: 50,
          formatter: this.genderFormat,
        },
        {
          prop: "flag",
          label: "flag",
          minWidth: 50,
          formatter: this.statusFormat,
        },
        {
          prop: "memberType",
          label: "memberType",
          minWidth: 50,
          formatter: this.memberTypeFormat,
        },
        { prop: "location", label: "location", minWidth: 50 },
        {
          prop: "birthday",
          label: "birthday",
          minWidth: 50,
          formatter: this.dateFormat,
        },
      ],
      // 表格列配置
      data: Object, // 表格分页数据
      permsEdit: String, // 编辑权限标识
      permsDelete: String, // 删除权限标识
      size: "mini",
      align: {
        // 文本对齐方式
        type: String,
        default: "left",
      },
      maxHeight: 420,
      height: 400,
      showOperation: {
        // 是否显示操作组件
        type: Boolean,
        default: true,
      },
      border: false,
      stripe: true,
      highlightCurrentRow: true,
      showOverflowTooltip: true,
      showBatchDelete: true,
      showDetail: false,
      loading: false, // 加载标识
      myHeaders: { token: Cookies.get("token") },

      filters: {
        label: "",
      },

      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},

      operation: false, // true:新增, false:编辑
      editDialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      tableData: {},
      dataForm: {
        id: 0,
        nickName: "",
        gender: true,
        birthday: "",
        location: "",
        lookingFor: false,
      },
      quereyForm: {
        registerTime: "",
        gender:"",
        memberType:""
      },
      genderOption:[
        {value:"1",label:"男"},
        {value:"0",label:"女"},
      ],
      memberTypeOption:[
        {value:"1",label:"普通会员"},
        {value:"2",label:"付费会员"},
        {value:"3",label:"到期未续费"}
      ],
      tableVisible:1,
      formLabelAlign: {
      totalNumber:0,
      maleNumber:0,
      femaleNumber:0,
      generalMember:0,
      payMember:0
        }
    };
  },
  methods: {
    // 分页查询
    findPage: function () {
      this.loading = true;
      this.$api.elite
        .findTodayRegister(this.pageRequest)
        .then((res) => {
          this.tableData = res.data;
          this.loading = false;
         
        })
        .then(this.tableData != null ? this.tableData.callback : "");

      //   let callback = res => {
      //     this.loading = false
      //   }
      // this.$emit('findPage', {pageRequest:this.pageRequest, callback:callback})
    },
    // 换页刷新
    refreshPageRequest: function (pageNum) {
      this.pageRequest.pageNum = pageNum;
      this.findPage();
    },

    //显示审核界面
    approve: function (index, row) {
      const that = this;
      //that.$router.push({path:'/detail',query:{id:12345}})
      that.editDialogVisible = true;
      that.operation = false;
      that.dataForm = Object.assign({}, row);
      //console.log(that.dataForm)
    },

    // 显示编辑界面
    handleEdit: function (params) {
      console.log(params.row.id);
      this.$api.job.listPicture({ storeId: params.row.id }).then((res) => {
        this.fileList = res.data;
      });
      this.editDialogVisible = true;
      this.operation = false;
      this.dataForm = Object.assign({}, params.row);
    },

    // 时间格式化
    dateFormat: function (row, column, cellValue, index) {
      return birthday(row[column.property]);
    },
    genderFormat: function (row, column, cellValue, index) {
      if (row[column.property]) {
        return "male";
      }
      if (!row[column.property]) {
        return "female";
      }
      return "male";
    },
    statusFormat: function (row, column, cellValue, index) {
      if (row[column.property] === 1) {
        return "uncheck";
      }
      if (row[column.property] === 2) {
        return "checked";
      }
      if (row[column.property] === 3) {
        return "suspend";
      }
      return "cancel";
    },
    memberTypeFormat: function (row, column, cellValue, index) {
      if (row[column.property] === 1) {
        return "普遍会员";
      }
      if (row[column.property] === 2) {
        return "付费会员";
      }
      if (row[column.property] === 3) {
        return "到期未续费";
      }
      return "其他";
    },
    handleClick(tab, event) {
      const that=this
       // console.log(tab.name);
        if(tab.name=="1"){
          that.findPage()
            that.tableVisible=1
        }
        if(tab.name=="2"){
          that.$api.elite.staticsRegisterMember({
            pageNum:1,
            pageSize:10
          }).then(res=>{
            that.formLabelAlign=res.data

          })
           that.tableVisible=2

        }
      },
      getToken(){
        console.log('刷新token')
        this.$api.elite.getToken({
          refresh:Cookies.get('token')
         // refresh:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYwMTg2OTg1MCwiY3JlYXRlZCI6MTYwMTgyNjY1MDU1MywiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InN5czp1c2VyOnZpZXcifSx7ImF1dGhvcml0eSI6InN5czptZW51OmRlbGV0ZSJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRlcHQ6ZWRpdCJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRpY3Q6ZWRpdCJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRpY3Q6ZGVsZXRlIn0seyJhdXRob3JpdHkiOiJzeXM6bWVudTphZGQifSx7ImF1dGhvcml0eSI6InN5czp1c2VyOmFkZCJ9LHsiYXV0aG9yaXR5Ijoic3lzOmxvZzp2aWV3In0seyJhdXRob3JpdHkiOiJzeXM6ZGVwdDpkZWxldGUifSx7ImF1dGhvcml0eSI6InN5czpyb2xlOmVkaXQifSx7ImF1dGhvcml0eSI6InN5czpyb2xlOnZpZXcifSx7ImF1dGhvcml0eSI6InN5czpkaWN0OnZpZXcifSx7ImF1dGhvcml0eSI6InN5czp1c2VyOmVkaXQifSx7ImF1dGhvcml0eSI6InN5czp1c2VyOmRlbGV0ZSJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRlcHQ6dmlldyJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRlcHQ6YWRkIn0seyJhdXRob3JpdHkiOiJzeXM6cm9sZTpkZWxldGUifSx7ImF1dGhvcml0eSI6InN5czptZW51OnZpZXcifSx7ImF1dGhvcml0eSI6InN5czptZW51OmVkaXQifSx7ImF1dGhvcml0eSI6InN5czpkaWN0OmFkZCJ9LHsiYXV0aG9yaXR5Ijoic3lzOnJvbGU6YWRkIn1dfQ.FlsdcPgRnTu8loyOB_8bnHNPVaTHCByX8Z-1NaATplEYXQYQh4uWwhAFreRdUSe5FeEc_ekDI7jG89B-wlbWgA'
        }).then(res=>{
          Cookies.set('token',res.data.token)
        })
      }
  },
  mounted() {
    this.refreshPageRequest(1);
  },
};
</script>

<style scoped>
.statics{
  margin-top: 10px;
}
</style>





     