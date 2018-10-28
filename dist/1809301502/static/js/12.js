webpackJsonp([12,21],{Eddn:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={data:function(){return{dataForm:{cashierName:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1,dataListSelections:[],storeoptions:[],storemap:{},addOrUpdateVisible:!1}},components:{AddOrUpdate:t("Tvfd").default},activated:function(){this.getDataList()},methods:{getDataList:function(){var e=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/mgr/cashier/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,cashierName:this.dataForm.cashierName})}).then(function(a){var t=a.data;t&&0===t.code?(e.dataList=t.page.list,e.totalPage=t.page.totalCount,e.$http({url:e.$http.adornUrl("/mgr/store/select"),method:"post",params:e.$http.adornParams()}).then(function(a){var t=a.data;if(t&&0===t.code){e.storeoptions=[],e.storemap={};for(var r=0,s=t.stores.length;r<s;r++)e.storeoptions.push({value:t.stores[r].storeId,label:t.stores[r].storeName}),e.storemap[t.stores[r].storeId]=t.stores[r].storeName;for(var i=0;i<e.dataList.length;i++)e.$set(e.dataList[i],"storeName",e.storemap[e.dataList[i].storeId]);e.dataListLoading=!1}})):(e.dataList=[],e.totalPage=0,e.dataListLoading=!1)})},sizeChangeHandle:function(e){this.pageSize=e,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(e){this.pageIndex=e,this.getDataList()},selectionChangeHandle:function(e){this.dataListSelections=e},addOrUpdateHandle:function(e){var a=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){a.$refs.addOrUpdate.init(e)})},deleteHandle:function(e){var a=this,t=e?[e]:this.dataListSelections.map(function(e){return e.cashierId});this.$confirm("确定对[id="+t.join(",")+"]进行["+(e?"删除":"批量删除")+"]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$http({url:a.$http.adornUrl("/mgr/cashier/delete"),method:"post",data:a.$http.adornData(t,!1)}).then(function(e){var t=e.data;t&&0===t.code?a.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){a.getDataList()}}):a.$message.error(t.msg)})}).catch(function(){})}}},s={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"mod-cashier"},[t("el-form",{attrs:{inline:!0,model:e.dataForm},nativeOn:{keyup:function(a){if(!("button"in a)&&e._k(a.keyCode,"enter",13,a.key))return null;e.getDataList()}}},[t("el-form-item",[t("el-input",{attrs:{placeholder:"姓名",clearable:""},model:{value:e.dataForm.cashierName,callback:function(a){e.$set(e.dataForm,"cashierName",a)},expression:"dataForm.cashierName"}})],1),e._v(" "),t("el-form-item",[t("el-button",{on:{click:function(a){e.getDataList()}}},[e._v("查询")]),e._v(" "),e.isAuth("mgr:cashier:save")?t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.addOrUpdateHandle()}}},[e._v("新增")]):e._e(),e._v(" "),e.isAuth("mgr:cashier:delete")?t("el-button",{attrs:{type:"danger",disabled:e.dataListSelections.length<=0},on:{click:function(a){e.deleteHandle()}}},[e._v("批量删除")]):e._e()],1)],1),e._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:e.dataList,border:""},on:{"selection-change":e.selectionChangeHandle}},[t("el-table-column",{attrs:{type:"selection","header-align":"center",align:"center",width:"50"}}),e._v(" "),t("el-table-column",{attrs:{prop:"cashierId","header-align":"center",align:"center",width:"80",label:"ID"}}),e._v(" "),t("el-table-column",{attrs:{prop:"cashierName","header-align":"center",align:"center",label:"姓名"}}),e._v(" "),t("el-table-column",{attrs:{prop:"storeName","header-align":"center",align:"center",label:"所属门店"}}),e._v(" "),t("el-table-column",{attrs:{prop:"cashierPhone","header-align":"center",align:"center",label:"电话"}}),e._v(" "),t("el-table-column",{attrs:{prop:"cashierAddr","header-align":"center",align:"center",width:"180",label:"地址"}}),e._v(" "),t("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(a){return[e.isAuth("mgr:cashier:update")?t("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.addOrUpdateHandle(a.row.cashierId)}}},[e._v("修改")]):e._e(),e._v(" "),e.isAuth("mgr:cashier:delete")?t("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.deleteHandle(a.row.cashierId)}}},[e._v("删除")]):e._e()]}}])})],1),e._v(" "),t("el-pagination",{attrs:{"current-page":e.pageIndex,"page-sizes":[10,20,50,100],"page-size":e.pageSize,total:e.totalPage,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.sizeChangeHandle,"current-change":e.currentChangeHandle}}),e._v(" "),e.addOrUpdateVisible?t("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.getDataList}}):e._e()],1)},staticRenderFns:[]},i=t("VU/8")(r,s,!1,null,null,null);a.default=i.exports},Tvfd:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("E4LH"),s={data:function(){var e=this;return{visible:!1,menuList:[],menuListTreeProps:{label:"name",children:"children"},dataForm:{cashierId:0,cashierName:"",mrchName:"",storeId:void 0,cashierAddr:"",cashierPhone:"",cashierEmail:"",enableFlag:1,remark:"",userName:"",password:"",comfirmPassword:""},storeoptions:[],dataRule:{cashierName:[{required:!0,message:"名称不能为空",trigger:"blur"}],cashierAddr:[{required:!0,message:"地址不能为空",trigger:"blur"}],cashierPhone:[{required:!0,message:"电话不能为空",trigger:"blur"},{validator:function(e,a,t){Object(r.b)(a)?t():t(new Error("手机号格式错误"))},trigger:"blur"}],cashierEmail:[{required:!0,message:"邮箱不能为空",trigger:"blur"},{validator:function(e,a,t){Object(r.a)(a)?t():t(new Error("邮箱格式错误"))},trigger:"blur"}],storeId:[{required:!0,message:"所属门店不能为空",trigger:"blur"}],userName:[{required:!0,message:"用户名不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"},{validator:function(a,t,r){e.dataForm.id||/\S/.test(t)?r():r(new Error("密码不能为空"))},trigger:"blur"}],comfirmPassword:[{required:!0,message:"密码不能为空",trigger:"blur"},{validator:function(a,t,r){e.dataForm.id||/\S/.test(t)?e.dataForm.password!==t?r(new Error("确认密码与密码输入不一致")):r():r(new Error("确认密码不能为空"))},trigger:"blur"}]}}},methods:{init:function(e){var a=this;this.dataForm.cashierId=e||0,this.visible=!0,this.$nextTick(function(){a.$refs.dataForm.resetFields()}),this.$http({url:this.$http.adornUrl("/mgr/store/select"),method:"post",params:this.$http.adornParams()}).then(function(e){var t=e.data;if(t&&0===t.code){a.storeoptions=[];for(var r=0,s=t.stores.length;r<s;r++)a.storeoptions.push({value:t.stores[r].storeId,label:t.stores[r].storeName})}}),this.dataForm.cashierId&&this.$http({url:this.$http.adornUrl("/mgr/cashier/info/"+this.dataForm.cashierId),method:"get",params:this.$http.adornParams()}).then(function(e){var t=e.data;t&&0===t.code&&(a.dataForm.cashierName=t.cashier.cashierName,a.dataForm.mrchName=t.cashier.mrchName,a.dataForm.storeId=t.cashier.storeId,a.dataForm.cashierAddr=t.cashier.cashierAddr,a.dataForm.cashierPhone=t.cashier.cashierPhone,a.dataForm.cashierEmail=t.cashier.cashierEmail,a.dataForm.userName=t.cashier.userName,a.dataForm.enableFlag=t.cashier.enableFlag,a.dataForm.remark=t.cashier.remark)})},dataFormSubmit:function(){var e=this;this.$refs.dataForm.validate(function(a){a&&e.$http({url:e.$http.adornUrl("/mgr/cashier/"+(e.dataForm.cashierId?"update":"save")),method:"post",data:e.$http.adornData({cashierId:e.dataForm.cashierId||void 0,storeId:e.dataForm.storeId,cashierName:e.dataForm.cashierName,cashierAddr:e.dataForm.cashierAddr,cashierPhone:e.dataForm.cashierPhone,cashierEmail:e.dataForm.cashierEmail,userName:e.dataForm.userName,password:e.dataForm.password,enableFlag:e.dataForm.enableFlag,remark:e.dataForm.remark})}).then(function(a){var t=a.data;t&&0===t.code?e.$message({message:"操作成功",type:"success",duration:100,onClose:function(){e.visible=!1,e.$emit("refreshDataList")}}):e.$message.error(t.msg)})})}}},i={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("el-dialog",{attrs:{title:e.dataForm.cashierId?"修改":"新增","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(a){e.visible=a}}},[t("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"},nativeOn:{keyup:function(a){if(!("button"in a)&&e._k(a.keyCode,"enter",13,a.key))return null;e.dataFormSubmit()}}},[t("el-form-item",{attrs:{label:"姓名",prop:"cashierName"}},[t("el-input",{attrs:{placeholder:"收银员姓名"},model:{value:e.dataForm.cashierName,callback:function(a){e.$set(e.dataForm,"cashierName",a)},expression:"dataForm.cashierName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"地址",prop:"cashierAddr"}},[t("el-input",{attrs:{placeholder:"地址"},model:{value:e.dataForm.cashierAddr,callback:function(a){e.$set(e.dataForm,"cashierAddr",a)},expression:"dataForm.cashierAddr"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"联系电话",prop:"cashierPhone"}},[t("el-input",{attrs:{placeholder:"商户联系电话"},model:{value:e.dataForm.cashierPhone,callback:function(a){e.$set(e.dataForm,"cashierPhone",a)},expression:"dataForm.cashierPhone"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"联系邮箱",prop:"cashierEmail"}},[t("el-input",{attrs:{placeholder:"联系人邮箱"},model:{value:e.dataForm.cashierEmail,callback:function(a){e.$set(e.dataForm,"cashierEmail",a)},expression:"dataForm.cashierEmail"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"所属门店",prop:"storeId"}},[t("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.dataForm.storeId,callback:function(a){e.$set(e.dataForm,"storeId",a)},expression:"dataForm.storeId"}},e._l(e.storeoptions,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[t("el-input",{attrs:{placeholder:"登录帐号",disabled:!!e.dataForm.cashierId},model:{value:e.dataForm.userName,callback:function(a){e.$set(e.dataForm,"userName",a)},expression:"dataForm.userName"}})],1),e._v(" "),e.dataForm.cashierId?e._e():t("el-form-item",{class:{"is-required":!e.dataForm.id},attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.dataForm.password,callback:function(a){e.$set(e.dataForm,"password",a)},expression:"dataForm.password"}})],1),e._v(" "),e.dataForm.cashierId?e._e():t("el-form-item",{class:{"is-required":!e.dataForm.id},attrs:{label:"确认密码",prop:"comfirmPassword"}},[t("el-input",{attrs:{type:"password",placeholder:"确认密码"},model:{value:e.dataForm.comfirmPassword,callback:function(a){e.$set(e.dataForm,"comfirmPassword",a)},expression:"dataForm.comfirmPassword"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"状态",size:"mini",prop:"enableFlag"}},[t("el-radio-group",{model:{value:e.dataForm.enableFlag,callback:function(a){e.$set(e.dataForm,"enableFlag",a)},expression:"dataForm.enableFlag"}},[t("el-radio",{attrs:{label:0}},[e._v("禁用")]),e._v(" "),t("el-radio",{attrs:{label:1}},[e._v("正常")])],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"备注",size:"medium",prop:"remark"}},[t("el-input",{attrs:{placeholder:"备注"},model:{value:e.dataForm.remark,callback:function(a){e.$set(e.dataForm,"remark",a)},expression:"dataForm.remark"}})],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){e.visible=!1}}},[e._v("取消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},staticRenderFns:[]},o=t("VU/8")(s,i,!1,null,null,null);a.default=o.exports}});