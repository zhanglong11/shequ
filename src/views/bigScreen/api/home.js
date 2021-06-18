import { admin } from '@/plugins/axios'
export default {
  // 信息总览 @author yangjiaqi
  getGridTotalInfo() {
    return admin.get(`/screen/grid/totalInfo`)
  },
  // 居民信息 @author yangjiaqi
  getGridResidentInfo() {
    return admin.get(`/screen/grid/residentInfo`)
  },
  // 车辆信息 @author yangjiaqi
  getGridCarInfo() {
    return admin.get(`/screen/grid/carInfo`)
  },
  // 建筑类别 @author yangjiaqi
  getGridBuildType() {
    return admin.get(`/screen/grid/buildType`)
  },
  // 事件统计 @author yangjiaqi
  getGridIncidentInfo() {
    return admin.get(`/screen/grid/incidentInfo`)
  },
  // 重点人员 @author yangjiaqi
  getGridKeyPersonInfo() {
    return admin.get(`/screen/grid/keyPersonInfo`)
  },
  // 房屋信息 @author yangjiaqi
  getGridRoomInfo(wbsCode = '') {
    return admin.get(`/screen/grid/roomInfo?wbsCode=${wbsCode}`)
  },
  // 重点区域 @author yangjiaqi
  getGridKeyRegionInfo(wbsCode = '') {
    return admin.get(`/screen/grid/keyRegionInfo?wbsCode=${wbsCode}`)
  },
  // 获取当前天气 @author yangjiaqi
  getweatherInfo() {
    return admin.get(`/community/weather/info`)
  },
  // 网格板块信息集合 @author yangjiaqi
  getGirdPlate() {
    return admin.get(`/grid/organization/plate/list`)
  }
}
