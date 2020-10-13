<template>
  <div class="page-container" style="width:99%;margin-top:15px;">
    <!-- <el-button type="primary" round @click="awsUpload">aws上传文件测试</el-button> -->
    <div class="delpic">
      <el-button type="primary" round @click="showChat">图表展示</el-button>
      <el-button type="danger" round @click="removePicture">删除图片</el-button>
    </div>
    <div class="upload">
      <el-upload
        class="upload-demo"
        action="http://localhost:8001/api/pic/aws"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="uploadSuccess"
        multiple
        :limit="10"
        name="multipartfiles"
        :on-exceed="handleExceed"
        :headers="header"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <!-- <div class="demo-image">
  <div class="block" v-for="fit in fits" :key="fit">
    <span class="demonstration">{{ fit }}</span>
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :fit="fit"></el-image>
  </div>
    </div>-->
    <!-- <div class="demo-image__preview">
  <el-image 
    style="width: 100px; height: 100px"
    :src="url" 
    :preview-src-list="srcList">
  </el-image>
</div>
<div class="demo-image__preview">
  <el-image 
    style="width: 100px; height: 100px"
    :src="url" 
    :preview-src-list="srcList">
  </el-image>
</div>
<div class="demo-image__preview">
  <el-image 
    style="width: 100px; height: 100px"
    :src="url" 
    :preview-src-list="srcList">
  </el-image>
    </div>-->
    <!-- 
<div class="demo-image__placeholder">
  <div class="block">
    <span class="demonstration">默认</span>
    <el-image :src="url"></el-image>
  </div>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-image :src="url"></el-image>
  </div>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-image :src="url"></el-image>
  </div>
    </div>-->
    <!-- <div class="demo-image__placeholder">
  <div class="block">
    <span class="demonstration">默认</span>
    <el-image :src="url"></el-image>
  </div>
</div>
<div class="demo-image__placeholder">
  <div class="block">
    <span class="demonstration">默认</span>
    <el-image :src="url"></el-image>
  </div>
    </div>-->
    <div class="demo-image">
      <!-- <div class="block upload-image" v-for="url in urls" :key="url"> -->
      <div class="block upload-image">
        <el-image style="width: 500px; height: 500px;" :src="url" fit="fill"></el-image>
        <i class="el-icon-circle-close delete" @click="removePicture"></i>
      </div>
      <!-- </div> -->
    </div>
    <div>
      <!-- <a href="http:localhost:8001/api/pic/down" download="">下载链接</a> -->
      <!-- <a href="https://elite-file.s3.us-east-2.amazonaws.com/member/member49768048.jpg" download="">下载链接</a> -->
      <!-- <a href="https://elite-file.s3.us-east-2.amazonaws.com/member/member49768048.jpg">下载链接</a> -->
      <!-- <el-button type="primary" round @click="download("https://elite-file.s3.us-east-2.amazonaws.com/member/member49768048.jpg","ceshi.jpg","jpg")">图片下载</el-button> -->
      <el-button type="primary" round @click="downAwsPicture">图片下载</el-button>
      <!-- <el-button type="primary" round @click="downloadFile">图片下载</el-button> -->
    </div>
    <div style="margin-top:50px;width:300px;">
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="dynamicValidateForm.email" placeholder="aa@test.com"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <!-- <el-button type="primary" @click="changePwd">修改密码</el-button> -->
          <el-button type="primary" @click="changePwd()">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { download } from "@/utils/download";
export default {
  data() {
    return {
      header: {
        token: Cookies.get("token"),
      },
      fileList: [],
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      // url: 'https://elite-file.s3.us-east-2.amazonaws.com/member/member1595233754576.jpg',
      // srcList: [
      //   'https://elite-file.s3.us-east-2.amazonaws.com/member/member1595233754576.jpg',
      //   'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      // ]
      // url:"https://elite-file.s3.us-east-2.amazonaws.com/ceshi/ceshi1595296405342.jpg",
      url:
        "https://elite-file.s3.us-east-2.amazonaws.com/member/member49768048.jpg",
      urls: [],
      dynamicValidateForm: {
        email: "",
        password: "",
      },
    };
  },
  components: {},
  methods: {
    showChat: function () {
      this.$router.push("/chat");
    },
    awsUpload: function () {
      this.$api.elite.uploadPicture(this.pageRequest).then((res) => {
        // console.log(res)
      });
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
    delpicture: function () {
      console.log("删除图片");
    },
    uploadSuccess: function (response, file, fileList) {
      // console.log(response.msg)
      // this.urls.push(response.msg)
      // console.log(fileList)
      this.url = response.msg;
    },
    toImage: function () {
      this.$router.push("/image");
    },
    removePicture: function () {
      // console.log('删除')
      this.$api.elite.removePicture().then((res) => {
        console.log(res);
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.dynamicValidateForm);
          this.$api.elite.sendEmail(params).then((res) => {
            console.log(res);
            // this.editLoading = false
            // if(res.code == 200) {
            // 	this.$message({ message: '操作成功', type: 'success' })
            // 	this.dialogVisible = false
            // 	this.$refs['dataForm'].resetFields()
            // } else {
            // 	this.$message({message: '操作失败, ' + res.msg, type: 'error'})
            // }
            // this.findPage(null)
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changePwd: function () {
      this.$router.push("/pwd");
    },
    downloadFile: function () {
      console.log("下载图片");
      // window.location.href="https://elite-file.s3.us-east-2.amazonaws.com/member/member49768048.jpg"
      const picUrl =
        "https://elite-file.s3.us-east-2.amazonaws.com/member/member49768048.jpg";
      this.downPicture(picUrl);
    },
    downAwsPicture: function () {
      this.downloadAwsfile("https://elite-file.s3.us-east-2.amazonaws.com/member/member49768048.jpg","test01.jpg","jpg")
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
    getFileType:function(fileName) {
  // 后缀获取
  let suffix = '';
  // 获取类型结果
  let result = '';
  try {
    const flieArr = fileName.split('.');
    suffix = flieArr[flieArr.length - 1];
  } catch (err) {
    suffix = '';
  }
  // fileName无后缀返回 false
  if (!suffix) { return false; }
  suffix = suffix.toLocaleLowerCase();
  // 图片格式
  const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  // 进行图片匹配
  result = imglist.find(item => item === suffix);
  if (result) {
    return 'image';
  }
  // 匹配txt
  const txtlist = ['txt'];
  result = txtlist.find(item => item === suffix);
  if (result) {
    return 'txt';
  }
  // 匹配 excel
  const excelist = ['xls', 'xlsx'];
  result = excelist.find(item => item === suffix);
  if (result) {
    return 'excel';
  }
  // 匹配 word
  const wordlist = ['doc', 'docx'];
  result = wordlist.find(item => item === suffix);
  if (result) {
    return 'word';
  }
  // 匹配 pdf
  const pdflist = ['pdf'];
  result = pdflist.find(item => item === suffix);
  if (result) {
    return 'pdf';
  }
  // 匹配 ppt
  const pptlist = ['ppt', 'pptx'];
  result = pptlist.find(item => item === suffix);
  if (result) {
    return 'ppt';
  }
  // 匹配 视频
  const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
  result = videolist.find(item => item === suffix);
  if (result) {
    return 'video';
  }
  // 匹配 音频
  const radiolist = ['mp3', 'wav', 'wmv'];
  result = radiolist.find(item => item === suffix);
  if (result) {
    return 'radio';
  }
  // 其他 文件类型
  return 'other';
}
    // handlerClick: function () {
    //   //自定义form标签，初始化相关参数
    //   var form = document.createElement("form");
    //   var access_token = "1756467474";
    //   form.setAttribute("style", "display:none");
    //   form.setAttribute("method", "get");
    //   var params = {};
    //   params.Authorization = access_token;
    //   form.setAttribute("header", params);
    //   var path ="E:\\test.jpg";
    //   var input = document.createElement("input");
    //   input.setAttribute("type", "hidden");
    //   input.setAttribute("name", "path");
    //   input.setAttribute("value", path);
    //   form.append(input);
    //   form.setAttribute("action", "http://127.0.0.1:8/download");
    //   form.setAttribute("target", "_blank");
    //   var body = document.createElement("body");
    //   body.setAttribute("style", "display:none");
    //   document.body.appendChild(form);
    //   form.submit();
    //   form.remove();
    // },
  }
};
</script>

<style>
.carousel {
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 20px;
}
.carousel h2 {
  color: #475669;
  font-size: 22px;
  opacity: 1.75;
  line-height: 100px;
  margin: 0;
}
.carousel ul {
  color: #475669;
  font-size: 15px;
  opacity: 1.75;
  line-height: 40px;
  margin: 0;
}
.carousel-item-intro h2 {
  color: #ffffff;
  font-size: 22px;
  opacity: 1.75;
  line-height: 80px;
  margin: 0;
}
.carousel-item-intro ul {
  color: #ffffff;
  font-size: 15px;
  opacity: 1.75;
  line-height: 65px;
  padding: 5px;
  margin: 0;
}
.carousel-item-func h2 {
  color: #3f393b;
  font-size: 22px;
  opacity: 1.75;
  line-height: 50px;
  margin: 0;
}
.carousel-item-func ul {
  color: #3f393b;
  font-size: 15px;
  opacity: 1.75;
  line-height: 30px;
  text-align: left;
  padding-left: 90px;
  margin: 0;
}
.carousel-item-env h2 {
  color: #475669;
  font-size: 22px;
  opacity: 1.75;
  line-height: 50px;
  margin: 0;
}
.carousel-item-env ul {
  color: #475669;
  font-size: 15px;
  opacity: 1.75;
  line-height: 35px;
  text-align: left;
  padding-left: 110px;
  margin: 0;
}
.carousel-item-intro {
  background-color: #19aaaf73;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  -moz-border-radius: 15px;
  background-clip: padding-box;
  box-shadow: 0 0 25px #a3b3b965;
}
.carousel-item-func {
  background-color: #19aaaf73;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  -moz-border-radius: 15px;
  background-clip: padding-box;
  box-shadow: 0 0 25px #a3b3b965;
}
.carousel-item-env {
  background-color: #19aaaf73;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  -moz-border-radius: 15px;
  background-clip: padding-box;
  box-shadow: 0 0 25px #a3b3b965;
}
.carousel-item-intro {
  background-color: #b95e5e;
}
.carousel-item-func {
  background-color: #52c578;
}
.carousel-item-env {
  background-color: #41a7b9;
}
.delpic {
  margin-bottom: 10px;
}
.upload-image {
  display: inline-block;
  position: relative;
  margin-top: 50px;
}

.upload-image .delete {
  position: absolute;
  top: -15px;
  right: 0px;
}
</style>