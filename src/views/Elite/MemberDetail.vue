<template>
  <div class="page-container">
    
  <!-- <el-button v-popover:popover>focus 激活</el-button> -->

    <div class="life-style">
      <div v-for="life in lifeStyle" :key="life.labelId">
        <span class="style-label">{{ life.labelName }}</span>

        <el-row :gutter="16">
          <el-col :span="6" v-for="style in life.styles" :key="style.id">
            <el-image
              class="style-img"
              :src="style.photoUrl"
              :preview-src-list="life.srcList">
            </el-image>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="openRemoveDialog(style.id,style.photoUrl)"></el-button>
            <el-button type="primary" size="mini" icon="el-icon-download" @click="downloadCodeImg(style.photoUrl)"></el-button>
            <!-- <i class="el-icon-circle-close delete"  @click="openRemoveDialog(style.id,style.photoUrl)"></i> -->
           <!-- <el-dropdown size="mini" split-button type="primary" @command="handleCommand(style.id,style.photoUrl)">
  编辑图片
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item command="a">黄金糕</el-dropdown-item>
    <el-dropdown-item command="a">狮子头</el-dropdown-item>
    <el-dropdown-item command="a">螺蛳粉</el-dropdown-item>
    <el-dropdown-item command="a">双皮奶</el-dropdown-item>
    <el-dropdown-item command="a">蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown> -->
          </el-col>
          <el-col :span="6">
           <el-upload
        class="upload-demo"
        action="https://censor.elitemedating.com/api/pic/aws"
        :data="{
          memberId:memberId,
          photoLabel:life.labelId
        }"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="uploadSuccess"
        :on-progress="uploadProgress"
        multiple
        :limit="10"
        name="multipartfiles"
        :on-exceed="handleExceed"
        :headers="header"
        :file-list="fileList"
        :show-file-list="false">
        <i class="el-icon-plus avatar-uploader-icon"></i> 
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
               
              <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span>确定要删除这张图片</span>
  <el-image :src="removePhoto" :preview-src-list="removeList"></el-image>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="removePicture" :loading="loading">确 定</el-button>
  </span>
</el-dialog>

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
      header: {
        token: Cookies.get("token"),
      },
       fileList: [],
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      ],
      lifeStyle: [],
      imageUrl: "",
      visible: false,
      centerDialogVisible: false,
      loading:false,
      removeId:0,
      memberId:0,
      removePhoto:'',
      removeList:[]
    };
  },
  created() {
    
    if (this.$route.query.id) {
      //const id = this.$route.query.id;
      this.memberId = this.$route.query.id;
      //  console.log(id);
      this.findPhotoByMember(this.memberId);
    }
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    findPhotoByMember: function (memberId) {
      this.$api.elite
        .findLifeStyel({
          memberId: memberId,
        })
        .then((res) => {
        //  console.log(res.data);
          this.lifeStyle = res.data.filter((item) => {
            item.srcList = item.styles.map((item) => {
              return item.photoUrl;
            });
            return item.styles.length > 0;
          });

        //  console.log(this.lifeStyle);
          // res.data.forEach(element => {
          //     if(element.photoLabel==29){

          //     }
          //     if(element.photoLabel==30){

          //     }
          //     if(element.photoLabel==31){

          //     }
          //     if(element.photoLabel==32){

          //     }
          //     if(element.photoLabel==33){

          //     }
          //     if(element.photoLabel==34){

          //     }
          //     if(element.photoLabel==35){

          //     }
          //     if(element.photoLabel==36){

          //     }
          //     if(element.photoLabel==37){

          //     }

          // });

          //  console.log(res.data)
          //   res.data.forEach(element => {

          //   });
        });
    },
    openRemoveDialog:function(id,photo){
      console.log(photo)
      console.log(id)
      this.removeId=id
      this.removePhoto=photo
      this.removeList.push(photo)
    this.centerDialogVisible = true
    },

    removePicture: function () {
      this.loading=true
      console.log("删除图片");
       this.$api.elite.removeLifePhoto({
          id:this.removeId
       }).then(res => {
          console.log(res)
          this.findPhotoByMember(this.memberId);
          this.loading=false
          this.centerDialogVisible = false


       })
     // this.centerDialogVisible=true
     // this.visible = true;
      //  this.$confirm("确认删除吗？", "提示", {}).then(() => {
      //this.editLoading = true;
      // let params = Object.assign({}, this.dataForm);
      // this.$api.elite.save(params).then(res => {
      //   if (res.code == 200) {
      //     this.$message({ message: "操作成功", type: "success" });

      //   } else {
      //     this.$message({
      //       message: "操作失败, " + res.msg,
      //       type: "error"
      //     });
      //   }
      //   this.editLoading = false;
      //   this.$refs["dataForm"].resetFields();
      //   this.editDialogVisible = false;
      //   this.findPage(null);
      // });
      //   });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },


   handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadSuccess: function (response, file, fileList) {
      console.log(response)
      if(response.code==200){
         this.findPhotoByMember(this.memberId);
       // const url=response.msg
      }
      // console.log(response.msg)
      // this.urls.push(response.msg)
      // console.log(fileList)
     // this.url = response.msg;
    },

    uploadProgress:function(event, file, fileList){
     // console.log(event)

    },
    handleClick() {
        alert('button click');
      },
      // editChoose:function(id,photo){
      //     console.log(photo)
      // console.log(id)


      // }
      handleCommand(command) {
        console.log(command)
       // this.$message('click on item ' + command);
      },


       downAwsPicture: function (photoUrl) {
         var suffix=''
         try {
    const flieArr = fileName.split('.');
    suffix = flieArr[flieArr.length - 1];
  } catch (err) {
    suffix = '';
  }
     this.downloadAwsfile(photoUrl,"test01.jpg",suffix)
     // this.downloadAwsfile("https://elite-file.s3.us-east-2.amazonaws.com/member/member49768048.jpg","test01.jpg","jpg")
     // download("https://elite-file.s3.us-east-2.amazonaws.com/member/member49768048.jpg","ceshi.jpg","image/jpg")
      // this.$api.elite.downAwsPicture().then((res) => {
      //   console.log(res);
      // });
      //  window.open("https://elite-file.s3.us-east-2.amazonaws.com/member/member49768048.jpg")
    },
    downloadAwsfile:function(url, strFileName, strMimeType) {
      var xmlHttp = null;
      if (window.ActiveXObject) {
        // IE6, IE5 浏览器执行代码
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      } else if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlHttp = new XMLHttpRequest();
      }
      //2.如果实例化成功，就调用open（）方法：
      if (xmlHttp != null) {
        xmlHttp.open("get", url, true);
        xmlHttp.responseType = 'blob';//关键
        xmlHttp.send();
        xmlHttp.onreadystatechange = doResult; //设置回调函数
      }
      function doResult() {
        if (xmlHttp.readyState == 4) { //4表示执行完成
          if (xmlHttp.status == 200) { //200表示执行成功
            download(xmlHttp.response, strFileName, strMimeType);
          }
        }
      }
    },
   downloadCodeImg(photoUrl){
              console.log('下载图片')
              var a = document.createElement('a')
              a.download = name || 'pic'
              // 设置图片地址
              a.href = photoUrl;
              a.click();
            },
  downloadIamge(photoUrl) {
    const name="down"
  var image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function() {
    var canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    var context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    var event = new MouseEvent('click')
    a.download = name || 'photo'
    a.href = url
    a.dispatchEvent(event)
  }
  image.src = photoUrl
}
   

  },
  mounted() {
    //  this.refreshPageRequest(1)
  },
};
</script>

<style scoped>
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.life_photo {
  width: 200px;
  height: 200px;
}
.life_item {
  margin-bottom: 10px;
}
.style-img {
  position: relative;
  width: 240px;
  height: 240px;
  margin-top: 10px;
}
.life-style {
  margin: 50px;
  /* overflow: hidden; */
}
/* .life-style :hover{
   overflow: auto;
} */
.style-label {
  font-size: 18px;
  padding-bottom: 50px;
}
/* div {
  overflow: hidden;
}
div:hover {
  overflow: auto;
} */
.delete-img {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 50px;
  height: 50px;
  z-index: 1000;
  cursor: pointer;
}
.style-img .delete {
  position: absolute;
  top: -50px;
  right: 5px;
  width: 50px;
  height: 50px;
  z-index: 1000;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

