<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.label" placeholder="nickName"></el-input>
        </el-form-item>

        <!-- <el-form-item >
					<el-select v-model="period" clearable placeholder="请选择年份"  style="width: 120px;">
				<el-option
				v-for="item in periods"
				:key="item.value"
				:label="item.label"
				:value="item.label">
				</el-option>
			</el-select>

			</el-form-item>
			<el-form-item>
					<el-select v-model="material" clearable placeholder="请选择材质" style="width: 120px;">
				<el-option
				v-for="item in materialArray"
				:key="item.value"
				:label="item.label"
				:value="item.label">
				</el-option>
			</el-select>
				


			</el-form-item>
			<el-form-item>
					<el-select v-model="location" clearable placeholder="请选择定位" style="width: 120px;" >
				<el-option
				v-for="item in locationArray"
				:key="item.value"
				:label="item.label"
				:value="item.label">
				</el-option>
			</el-select>

        </el-form-item>-->

        <el-form-item>
           <el-button size="mini" type="primary" icon="fa fa-search" @click="findPage(null)">
    {{$t('action.search')}}
  </el-button>
          <!-- <kt-button
            icon="fa fa-search"
            :label="$t('action.search')"
            type="primary"
            @click="findPage(null)"
          /> -->
        </el-form-item>
        <!-- <el-form-item>
           <el-button size="mini" type="primary" icon="fa fa-plus"   @click="handleAdd">
    {{$t('action.add')}}
  </el-button>
         
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="fa fa-plus"   @click="imageTest">
    图片测试</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <!--表格内容栏-->
     <div>
    
   <el-table :data="tableData.content" :highlight-current-row="highlightCurrentRow" v-loading="loading" :element-loading-text="$t('action.loading')" :border="border" :stripe="stripe"
          :show-overflow-tooltip="showOverflowTooltip" :max-height="maxHeight" :height="height" size="small" align="left" style="width:100%;" >
      <!-- <el-table-column type="selection" width="40" v-if="showBatchDelete & showOperation"></el-table-column> -->
      <el-table-column v-for="column in columns" header-align="center" align="center"
        :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth" 
        :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
        :sortable="column.sortable==null?true:column.sortable">
      </el-table-column>
      
      <el-table-column label="operation" >
         <template slot-scope="scope">
       <el-button
          size="mini"
          type="primary"
          @click="approve(scope.$index, scope.row)">approve</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="checkLifeStyle(scope.$index, scope.row)">edit</el-button>
      </template>
         
         
           <!-- <template slot-scope="scope">
       <el-button type="primary" icon="fa fa-edit" size="mini" @click="approve(scope.$index, scope.row)">{{$t('action.approve')}}</el-button>
       <el-button type="primary" icon="fa fa-edit" size="mini" @click="approve(scope.$index, scope.row)">{{$t('action.approve')}}</el-button>
           </template> -->
        <!-- <template slot-scope="scope">
          <kt-button icon="fa fa-edit" :label="$t('action.verify')"  :size="size" @click="handleEdit(scope.$index, scope.row)" />
          <kt-button icon="fa fa-trash" :label="$t('action.delete')"  :size="size" type="danger" @click="handleDelete(scope.$index, scope.row)" />
        </template> -->
      </el-table-column>
     
    </el-table>

    <div class="toolbar" style="padding:10px;">
      <!-- <kt-button :label="$t('action.batchDelete')"  :size="size" type="danger" @click="handleBatchDelete()" 
        :disabled="this.selections.length===0" style="float:left;" v-if="showBatchDelete & showOperation"/> -->
      <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshPageRequest" 
        :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="data.totalSize" style="float:right;">
      </el-pagination>
    </div>


  </div>


    <!-- <kt-table
      :height="350"
      permsEdit="sys:dict:edit"
      permsDelete="sys:dict:delete"
      :data="pageResult"
      :columns="columns"
      @findPage="findPage"
      @handleEdit="handleEdit"
    ></kt-table> -->




    <!--新增编辑界面-->
    <el-dialog
      :title="operation?'add':'edit'"
      width="40%"
      :visible.sync="editDialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dataForm"
        label-width="80px"
        :rules="dataFormRules"
        ref="dataForm"
        :size="size"
      >
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="nickName" prop="nickName">
          <el-input v-model="dataForm.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="gender" prop="gender"> 
           <el-radio-group v-model="dataForm.gender">
          <el-radio  :label="true">male</el-radio>
          <el-radio  :label="false">female</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="birthday" prop="birthday">
          <el-date-picker v-model="dataForm.birthday" type="date" placeholder="choose date"></el-date-picker>
        </el-form-item>
        <el-form-item label="looking for" prop="gender">
          <el-radio v-model="dataForm.lookingFor" :label="true">male</el-radio>
          <el-radio v-model="dataForm.lookingFor" :label="false">female</el-radio>
        </el-form-item>
<!-- 
        <el-form-item label="password" prop="password">
          <el-input type="password" v-model="dataForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="checkPassword" prop="checkPassword">
          <el-input type="password" v-model="dataForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item> -->


        <el-form-item
          prop="email"
          label="email"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="dataForm.email"></el-input>
        </el-form-item>
        <el-form-item label="location" prop="location">
          <el-cascader
           v-model="dataForm.location"
            :props="props"
            :options="cities"
            placeholder="choose location"
            separator=","
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="审核" prop="flag">
           <el-radio v-model="dataForm.flag" :label=1>不通过</el-radio>
          <el-radio v-model="dataForm.flag" :label=2>通过</el-radio>
        </el-form-item>
        <el-form-item>




        </el-form-item>
        <!-- <el-form-item>
          <el-cascader
            v-model="dataForm.location"
            :options="cities"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item> -->

        <!-- <el-form-item label="图片" prop="remark"> -->
          <!-- <el-upload
		action=""
		name="multipartfiles"
		:headers="myHeaders"
		multiple
		:on-success="uploadSuccess"
		:before-upload="onBeforeUpload"
		:limit="1">
		<el-button size="small" type="primary">点击上传图片</el-button>
          </el-upload>-->
          <!-- <el-upload
            class="upload-demo"
            action
            :before-upload="onBeforeUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-change="handleChange"
            multiple
            :limit="5"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">upload photo</el-button>
          </el-upload> -->
          <!-- <div class="demo-image__lazy">
            <el-image v-for="url in fileList" :key="url.fileName" :src="url.url" lazy></el-image>
          </div> -->
        <!-- </el-form-item> -->
        <!-- <el-button @click="clickTest">随机数测试</el-button> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button
          :size="size"
          type="primary"
          @click.native="submitForm"
          :loading="editLoading"
        >{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable";
import KtButton from "@/views/Core/KtButton";
import { format, randomString,birthday } from "@/utils/datetime";
import Cookies from "js-cookie";
import COS from "cos-js-sdk-v5";

export default {
  components: {
    KtTable,
    KtButton
  },
  props: {
   
  },
  data() {
    
    let that = this;
   
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.dataForm.checkPassword !== "") {
          this.$refs.dataForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.dataForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
        columns: [
        { prop: "id", label: "ID", minWidth: 50 },
        { prop: "nickName", label: "nickname", minWidth: 50 },
         { prop: "gender", label: "gender", minWidth: 50 ,formatter:this.genderFormat},
        { prop: "flag", label: "flag", minWidth: 50,formatter:this.statusFormat },
         { prop: "lookingFor", label: "lookingFor", minWidth: 50 ,formatter:this.genderFormat},
        { prop: "location", label: "location", minWidth: 50 },
        { prop: "birthday", label: "birthday", minWidth: 50 ,formatter:this.dateFormat},
      ],
      // 表格列配置
    data: Object, // 表格分页数据
    permsEdit: String,  // 编辑权限标识
    permsDelete: String,  // 删除权限标识
    size: "small",
    align: {  // 文本对齐方式
      type: String,
      default: 'left'
    },
    maxHeight: 420,
    height: 400,
    showOperation: {  // 是否显示操作组件
      type: Boolean,
      default: true
    },
    border:false,
    stripe: true,
    highlightCurrentRow: true,
    showOverflowTooltip: true,
    showBatchDelete: true,
    showDetail: false,
       loading: false,  // 加载标识
      myHeaders: { token: Cookies.get("token") },
    //  size: "small",
      filters: {
        label: ""
      },
      // columns: [
      //   { prop: "id", label: "ID", minWidth: 50 },
      //   { prop: "nickName", label: "nickname", minWidth: 80 },
      //    { prop: "gender", label: "gender", minWidth: 80 ,formatter:this.genderFormat},
      //   { prop: "flag", label: "flag", minWidth: 80,formatter:this.statusFormat },
      //    { prop: "lookingFor", label: "lookingFor", minWidth: 80 ,formatter:this.genderFormat},
      //   { prop: "location", label: "location", minWidth: 80 },
      //   { prop: "birthday", label: "birthday", minWidth: 80 ,formatter:this.dateFormat},
      // ],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},

      operation: false, // true:新增, false:编辑
      editDialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      dataFormRules: {
        label: [{ required: true, message: "请输入名称", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      },
      // 新增编辑界面数据
      dataForm: {
        id: 0,
        nickName: "",
        gender: true,
        birthday: "",
        location: [],
        lookingFor: false
      },
      gender: "1",
      props: {
        lazy: false,
        label: "name_en",
        value: "name_en",
        children: "childrens",
        // lazyLoad(node, resolve) {
        //   that.initData(node, resolve);
        // }
      },

      options: [],
      parentId: 0,
      fileList: [],
      material: "",
      locations: [],
      period: "",
      birthday: "",
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ],
        email: ""
      },
      cities: [],
      tableData:{},
      region:['zhinan','shejiyuanze','yizhi']
    };
  },
  methods: {

      // 分页查询
    findPage: function () {
        this.loading = true
        this.$api.elite.findPage(this.pageRequest).then(res => {
          this.tableData = res.data;
            this.loading = false
        }).then(this.tableData != null ? this.tableData.callback : "");
    
      //   let callback = res => {
      //     this.loading = false
      //   }
      // this.$emit('findPage', {pageRequest:this.pageRequest, callback:callback})
    },
    // 换页刷新
		refreshPageRequest: function (pageNum) {
      this.pageRequest.pageNum = pageNum
      this.findPage()
    },
   
    // 获取分页数据
    // findPage: function(data) {
    //   if (data !== null) {
    //     this.pageRequest = data.pageRequest;
    //   }
     
    //   this.pageRequest.antiqueName = this.filters.label;
    //   this.pageRequest.material = this.material;
    //   this.pageRequest.location = this.location;
    //   this.pageRequest.period = this.period;
    //   this.$api.elite
    //     .findPage(this.pageRequest)
    //     .then(res => {
    //       this.pageResult = res.data;
    //     })
    //     .then(data != null ? data.callback : "");
    // },

  showLocatinsTree:function(){
console.log('55555')

  },
    // 批量删除
    handleDelete: function(data) {
      this.$api.job
        .batchDelete(data.params)
        .then(data != null ? data.callback : "");
    },
    // 显示新增界面
    handleAdd: function() {
      this.fileList = [];
      this.editDialogVisible = true;
      this.operation = true;
      this.dataForm = {
        id: 0,
        nickName: "",
        gender: true,
        birthday: "",
        location: [],
        lookingFor: false,
        password: "",
        checkPassword: "",
        email: ""
      };
      const that=this
      if(that.cities.length===0){
        that.$http.get("../../static/location.json").then(function(res) {
          that.cities=res.data
            // const cities = res.data.map((value, i) => ({
              //   value: value.id,
            //   label: value.name_en,
            // }));
            // console.log(cities)
            //resolve(res.data);
          }).catch(err => {
            console.log(err);
          });
      }
      
    },
    //显示审核界面
    approve:function(index,row){
  
      const that=this
      //that.$router.push({path:'/detail',query:{id:12345}})
        that.editDialogVisible = true;
        that.operation = false;
        that.dataForm = Object.assign({}, row);
        //console.log(that.dataForm)
  
    },

    checkLifeStyle:function(index,row){
     // console.log(row)
      this.$router.push({path:'/detail',query:{id:row.id}})




    },

   

    // 显示编辑界面
    handleEdit: function(params) {
      console.log(params.row.id);
      this.$api.job.listPicture({ storeId: params.row.id }).then(res => {
        this.fileList = res.data;
      });
      this.editDialogVisible = true;
      this.operation = false;
      this.dataForm = Object.assign({}, params.row);
    },

    onBeforeUpload: function(file) {
      var that = this;

      // var fileName=file.name
      // fileName=fileName.substr(fileName.lastIndexOf('.') + 1)
      // console.log(fileName)
      var cos = new COS({
        getAuthorization: function(options, callback) {
          that.$api.job.getTempSecret().then(function(data) {
            var credentials = data && data.credentials;
            if (!data || !credentials)
              return console.error("credentials invalid");
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              XCosSecurityToken: credentials.sessionToken,
              StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
            });
          });
        }
      });

   
      setTimeout(() => {
        cos.putObject(
          {
            Bucket: "picture2019-1256835711",
            Region: "ap-beijing",
            Key: "store/" + file.name,
            Body: file,
            onProgress: function(progressData) {
              console.log(JSON.stringify(progressData));
            }
          },
          function(err, data) {
            console.log(err || data);
            if (data) {
              //	that.fileList.push('https://'+data.Location)
              that.fileList.push({
                name: file.name,
                url: "https://" + data.Location
              });
              //path=data.Location
              //that.imgPath='https://'+data.Location
              //console.log(that.imgPath)
            }
          }
        );
      }, 1000);

    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
      console.log(this.fileList);
    },

    handleRemove(file, fileList) {
      this.fileList = fileList;
      //console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
 
    // 编辑
    submitForm: function() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.dataForm);
            this.$api.elite.save(params).then(res => {
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
                // this.fileList.forEach(element => {
                //   element.storeId = res.data;
                // });
                // this.$api.job.savePicture(this.fileList).then(res => {
                //   this.$message({ message: "操作成功", type: "success" });
                // });
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error"
                });
              }
              this.editLoading = false;
              this.$refs["dataForm"].resetFields();
              this.editDialogVisible = false;
              this.findPage(null);
            });
          });
        }
      });
    },
    // 时间格式化
    dateFormat: function(row, column, cellValue, index) {
     // console.log(row)
   //  console.log(row[column.property])
      return birthday(row[column.property]);
    },
    genderFormat:function(row,column,cellValue,index){
        if(row[column.property]){
          return "male"
        }
        if(!row[column.property]){
          return "female"
        }
        return "male"
    },
    statusFormat:function(row,column,cellValue,index){
       
       if(row[column.property]===1){
          return "uncheck"
        }
        if(row[column.property]===2){
          return "checked"
        }
        if(row[column.property]===3){
          return "suspend"
        }
        return "cancel"

    },
    initData: function(node, resolve) {
      if (node.level === 0) {
        this.$http
          .get("../../static/location.json")
          .then(function(res) {
            // const cities = res.data.map((value, i) => ({
            //   value: value.id,
            //   label: value.name_en,
            // }));
            // console.log(cities)
            resolve(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }else{

      }
    },
    imageTest:function(){
      this.$router.push("/test")



    }
   
  },
  mounted() {
     this.refreshPageRequest(1)
   // this.testTrim()
  // this.moveEmpty()
    //this.getDictValue()
  }
};
</script>

<style scoped>
</style>