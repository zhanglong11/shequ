import Vue from 'vue'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Select from '@/components/Select'
import Status from '@/components/Status'
import Upload from '@/components/Upload'
import UploadImage from '@/components/Upload/UploadImage'
import Map from '@/components/Map'
import InputNumber from '@/components/Input/InputNumber'
import InputLicensePlate from '@/components/Input/InputLicensePlate'
import ButtonLink from '@/components/ButtonLink'
import SelectDateRange from '@/components/SelectDateRange'
import DetailItem from '@/components/DetailItem'
import FooterButton from '@/components/FooterButton'
import Editor from '@/components/Editor'
import AutoCompleteUser from '@/components/User/AutoCompleteUser'
import SelectSystemUser from '@/components/User/SelectSystemUser'
import SelectCcpUser from '@/components/User/SelectCcpUser'
import SelectCcpActiveMember from '@/components/User/SelectCcpActiveMember'
import SelectCommunityUser from '@/components/User/SelectCommunityUser'
import SelectCommunityFloor from '@/components/User/SelectCommunityFloor'
import UserShowMore from '@/components/User/UserShowMore'
import SelectCommunityCompany from '@/components/Select/SelectCommunityCompany'
import CommunityTree from '@/components/CommunityTree'
import ImgList from '@/components/ImgList'
import FileList from '@/components/FileList'
import PreviewByFileId from '@/components/PreviewByFileId'
import DownloadByFileId from '@/components/DownloadByFileId'
import OLMap from '@/components/OLMap'
import CcpRankList from '@/components/RankList/CcpRankList'
import CommunityRankList from '@/components/RankList/CommunityRankList'
import OtherRankList from '@/components/RankList/OtherRankList'
import CommonMap from '@/components/CommonMap'

Vue.component('TreeSelect', TreeSelect)
Vue.component(Select.name, Select)
Vue.component(Status.name, Status)
Vue.component(Upload.name, Upload)
Vue.component(UploadImage.name, UploadImage)
Vue.component(Map.name, Map)
Vue.component(InputNumber.name, InputNumber)
Vue.component(InputLicensePlate.name, InputLicensePlate)
Vue.component(ButtonLink.name, ButtonLink)
Vue.component(SelectDateRange.name, SelectDateRange)
Vue.component(DetailItem.name, DetailItem)
Vue.component(FooterButton.name, FooterButton)
Vue.component(Editor.name, Editor)
Vue.component(AutoCompleteUser.name, AutoCompleteUser)
Vue.component(SelectSystemUser.name, SelectSystemUser)
Vue.component(SelectCcpUser.name, SelectCcpUser)
Vue.component(SelectCcpActiveMember.name, SelectCcpActiveMember)
Vue.component(SelectCommunityUser.name, SelectCommunityUser)
Vue.component(SelectCommunityFloor.name, SelectCommunityFloor)
Vue.component(UserShowMore.name, UserShowMore)
Vue.component(SelectCommunityCompany.name, SelectCommunityCompany)
Vue.component(CommunityTree.name, CommunityTree)
Vue.component(ImgList.name, ImgList)
Vue.component(FileList.name, FileList)
Vue.component(PreviewByFileId.name, PreviewByFileId)
Vue.component(DownloadByFileId.name, DownloadByFileId)
Vue.component(OLMap.name, OLMap)
Vue.component(CcpRankList.name, CcpRankList)
Vue.component(CommunityRankList.name, CommunityRankList)
Vue.component(OtherRankList.name, OtherRankList)
Vue.component(CommonMap.name, CommonMap)
