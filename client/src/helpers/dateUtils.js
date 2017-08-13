// 将时间戳转为2001-12-12格式
export default class DateUtils {
  static formateTimestampToString(ns) {
    return new Date(ns).toLocaleString().replace(/\//g, '-').replace(/\s.*/g, '');
  }
}
