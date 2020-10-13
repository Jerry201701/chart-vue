import axios from '../axios'

/* 
 * 字典管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/member/add',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/store/delete/batch',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/member/find/page',
        method: 'post',
        data
    })
}


//获取字典表里面的数据
export const findDictValue = (params) => {
    return axios({
        url: '/store/dict/list',
        method: 'get',
        params
    })
}
//上传图片测试
export const uploadPicture=(data)=>{
    return axios({
        url: '/pic/aws',
        method: 'post',
        data
    })
}
//删除图片
export const removePicture=()=>{
    return axios({
        url: '/pic/remove',
        method: 'get'
    })
}
//发送邮件更改密码
export const sendEmail=(data)=>{
    return axios({
        url: '/member/email',
        method: 'post',
        data
    })
}
//下载图片
export const downAwsPicture=()=>{
    return axios({
        url: '/pic/down',
        method: 'get'
        
    })
}
//根据memberId查询lifeStyle
export const findLifeStyel=(params)=>{
    return axios({
        url: '/photo/list/life',
        method: 'get',
        params
        
    })
}
//删除图片在数据集的地址
export const removeLifePhoto=(params)=>{
    return axios({
        url: '/photo/remove',
        method: 'get',
        params
        
    })
}
//查询当天的注册用户
export const findTodayRegister=(data)=>{
    return axios({
        url: '/member/list/today',
        method: 'post',
        data
        
    })
}
//统计注册数据
export const staticsRegisterMember=(data)=>{
    return axios({
        url: '/member/statics',
        method: 'post',
        data
        
    })
}
//获取token
export const getToken=(data)=>{
    return axios({
        url: '/elite/refresh/token',
        method: 'post',
        data
    })
}




