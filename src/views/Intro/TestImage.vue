<template>
<div class="imgDiv">
  <!-- <el-tag closable>默认标签</el-tag> -->
          <el-image :src="url" class="picture">
             </el-image> 
      <i class="el-icon-circle-close delete" @click="removePicture"></i>
    
      <!-- <i class="picture-close"></i>  -->
</div>


</template>
<script>
export default {
     data() {
      return {
        fileList: [],
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://elite-file.s3.us-east-2.amazonaws.com/member/member1595233754576.jpg',
      }
     },
  mounted() {
   
  },
  beforeDestroy() {
  
  },
  methods: {
    removePicture:function(){
      console.log('delete picture')
    }
  }
}
</script>
<style scoped>
 .picture-close {
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    vertical-align: middle;
    top: -1px;
    right: -5px;
    color: #409eff;
    
}
.picture-close:before {
    content: "\E6DB";
}
.picture .remove-icon{
 position: relative;

}

 .imgDiv {
            display: inline-block;
            position: relative;
        }
 
            .imgDiv .delete {
                position: absolute;
                top: 0px;
                right: 0px;
            }
            .picture{
              width: 500px;
              height: 500px;
            }

</style>

