import {API_IMAGEBASE} from './../constants/api'
export default class getFullImg {
  static  getPath = (imgData,type) => {
    if(type === null || type === undefined){type =0;}
    let typeArr = {
       0:'.jpg', // 原始图
       80:'_W80x50.jpg', //缩略图
       400:'_W400x400.jpg', // 商品详情页大图
       580:'_W580x450.jpg' // 轮播图
    }
    return API_IMAGEBASE + imgData + typeArr[type]
  }
  static  clearPath = (imgData) => {
    return imgData.replace(API_IMAGEBASE,'').replace("_W80x50.jpg",'').replace("_W400x400.jpg",'').replace("_W580x450.jpg",'').replace(".jpg",'')
  }
}