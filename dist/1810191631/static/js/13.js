webpackJsonp([13,22],{"EA+3":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:"详细","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"明细："}},[t._v("\n      "+t._s(t.dataForm)+"\n    ")]),t._v(" "),a("el-form-item",{attrs:{label:"金额："}},[t._v("\n      "+t._s(t.dataForm.amount)+"\n    ")])],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("关闭")])],1)],1)},staticRenderFns:[]},i=a("VU/8")({data:function(){return{visible:!1,dataForm:{},dataRule:{}}},methods:{init:function(t){var e=this;this.dataForm=t||{},this.visible=!0,this.$nextTick(function(){e.$refs.dataForm.resetFields()})}}},n,!1,null,null,null);e.default=i.exports},Td49:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{dataForm:{cashierName:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1,dataListSelections:[],storeoptions:[],storemap:{},addOrUpdateVisible:!1}},components:{addOrUpdate:a("EA+3").default},activated:function(){this.getDataList()},methods:{getDataList:function(){var t=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/flow/transflow/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,outOrderNo:this.dataForm.outOrderNo})}).then(function(e){var a=e.data;a&&0===a.code?(t.dataList=a.page.list,t.totalPage=a.page.totalCount,t.dataListLoading=!1):(t.dataList=[],t.totalPage=0,t.dataListLoading=!1)})},sizeChangeHandle:function(t){this.pageSize=t,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(t){this.pageIndex=t,this.getDataList()},getTransTypeStr:function(t){var e={2:"消费",3:"预授权完成",5:"预授权",6:"退货",7:"消费撤销",8:"预授权完成撤销",9:"预授权撤销"};return e[t]},queryDetailHandle:function(t){var e=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){e.$refs.addOrUpdate.init(t)})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-transflow"},[a("el-form",{attrs:{inline:!0,model:t.dataForm},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.getDataList()}}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"外部订单号",clearable:""},model:{value:t.dataForm.outOrderNo,callback:function(e){t.$set(t.dataForm,"outOrderNo",e)},expression:"dataForm.outOrderNo"}})],1),t._v(" "),a("el-form-item",[a("el-button",{on:{click:function(e){t.getDataList()}}},[t._v("查询")])],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:t.dataList,border:""}},[a("el-table-column",{attrs:{prop:"outOrderNo","header-align":"center",align:"center",width:"200",label:"外部订单号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount","header-align":"center",align:"center",label:"交易金额(分)"}}),t._v(" "),a("el-table-column",{attrs:{prop:"transType","header-align":"center",align:"center",label:"交易类型"}}),t._v(" "),a("el-table-column",{attrs:{prop:"transTime","header-align":"center",align:"center",label:"交易时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"channelId","header-align":"center",align:"center",width:"180",label:"支付渠道"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.isAuth("flow:list:detail")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.queryDetailHandle(e.row)}}},[t._v("详细")]):t._e()]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageIndex,"page-sizes":[10,20,50,100],"page-size":t.pageSize,total:t.totalPage,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.sizeChangeHandle,"current-change":t.currentChangeHandle}}),t._v(" "),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.getDataList}}):t._e()],1)},staticRenderFns:[]},r=a("VU/8")(n,i,!1,null,null,null);e.default=r.exports}});