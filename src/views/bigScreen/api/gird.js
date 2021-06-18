import { admin } from '@/plugins/axios'
export default {
  // 获取当前天气 @author yangjiaqi
  getweatherInfo() {
    return admin.get(`/community/weather/info`)
  },
  // 网格板块信息集合 @author yangjiaqi
  getGirdPlate() {
    return admin.get(`/grid/organization/plate/list`)
  },
  // 获取网格详情 @author yangjiaqi
  getGirdInfo(wbsCode) {
    return admin.get(`/screen/grid/organization/get?wbsCode=${wbsCode}`)
  },
  // 获取人员信息 @author yangjiaqi
  getGirdPersonInfo(wbsCode) {
    return admin.get(`/screen/grid/personInfo?wbsCode=${wbsCode}`)
  },
  // 重点人员列表-分页 @author yangjiaqi
  queryKeyPersonList(body = {}) {
    return admin.post(`/screen/common/key/person/list`, body)
  },
  // 获取房屋信息 @author yangjiaqi
  getGirdRoomInfo(wbsCode) {
    return admin.get(`/screen/grid/roomInfo?wbsCode=${wbsCode}`)
  },
  // 房屋列表-分页 @author yangjiaqi
  queryRoomList(body = {}) {
    return admin.post(`/screen/grid/room/list`, body)
  },
  // 获取企业信息 @author yangjiaqi
  queryGirdEnterpriseInfo(body = {}) {
    return admin.post(`/grid/enterprise/list`, body)
  },
  // 获取企业详情 @author yangjiaqi
  getDetailsEnterprise(enterpriseId) {
    return admin.get(`/grid/enterprise/get/${enterpriseId}`)
  },
  // 获取企业员工信息 @author yangjiaqi
  queryGirdEnterpriseStaff(body = {}) {
    return admin.post(`/grid/enterprise/staff/list`, body)
  },
  // 获取车辆信息 @author yangjiaqi
  getGirdCarInfo(wbsCode) {
    return admin.get(`/screen/grid/carInfo?wbsCode=${wbsCode}`)
  },
  // 查询车辆列表
  queryCarList(body = {}) {
    return admin.post(`/grid/car/list`, body)
  },
  // 获取车辆详情 @author yangjiaqi
  getDetailsCar(id) {
    return admin.get(`/grid/car/get/${id}`)
  },
  // 获取重点区域 @author yangjiaqi
  getKeyRegionInfo(wbsCode) {
    return admin.get(`/screen/grid/keyRegionInfo?wbsCode=${wbsCode}`)
  },
  // 获取重点区域 @author yangjiaqi
  queryKeyRegionList(body = {}) {
    return admin.post(`/government/keyRegion/list`, body)
  },
  // 获取不同类型图层定位 @author yangjiaqi
  queryGridLocation(body = {}) {
    return admin.post(`/screen/grid/location/get`, body)
  },
  // 获取党组织详情 @author yangjiaqi
  getPartyOrganizationalManagement(id) {
    return admin.get(`/partyOrganizationalManagement/get/${id}`)
  },
  // 获取重点区域详情 @author yangjiaqi
  getKeyRegion(id) {
    return admin.get(`/government/keyRegion/get/${id}`)
  },
  // 获取物业组织详情 @author yangjiaqi
  getProperty(id) {
    return admin.get(`/property/get/${id}`)
  },
  // 获取重要事件详情 @author yangjiaqi
  getIncident(id) {
    return admin.get(`/government/incident/get/${id}`)
  },
  // 根据姓名-联系电话获取居民列表 @author yangjiaqi
  queryResidentList(keyword) {
    return admin.get(`/screen/resident/location/get?keyword=${keyword}`)
  },
  // 根据区域名称查询建筑列表 @author yangjiaqi
  getGridBuild(spaceName) {
    return admin.get(`/screen/grid/build/list?spaceName=${spaceName}`)
  },
  // 建筑详情-房屋状态 @author yangjiaqi
  getBuildRoom(buildingId) {
    return admin.get(`/screen/grid/build/room?buildingId=${buildingId}`)
  },
  // 获取房间详情 @author yangjiaqi
  getDetailsSpaceRoom(id) {
    return admin.get(`/grid/space/room/get/${id}`)
  },
  // 获取重点人员图层定位 @author yangjiaqi
  getKeyPersonLocation() {
    return admin.get(`/screen/keyPerson/location/get`)
  },
  // 获取居民详情 @author yangjiaqi
  getDetailsResident(id) {
    return admin.get(`/grid/resident/get/${id}`)
  },
  // 获取重点人员详情 @author yangjiaqi
  getDetailsKeyResident(id) {
    return admin.get(`/common/key/person/get/${id}`)
  },
  // 党组织详情
  queryPartyMemberManagementist(body = {}) {
    return admin.post(`/partyMemberManagement/list`, body)
  }
}
