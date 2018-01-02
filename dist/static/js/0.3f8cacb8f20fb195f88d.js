webpackJsonp([0,8],{"690k":function(t,e,a){"use strict";e.a={props:{row:Object}}},CIoT:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Card",{attrs:{shadow:"",padding:20}},[a("div",{staticClass:"ui-card-title",attrs:{slot:"title"},slot:"title"},[t._v("\n    脚本日志列表\n  ")]),t._v(" "),a("Row",{staticClass:"mb20",attrs:{gutter:20}},[a("Col",{attrs:{span:"8"}},[a("div",{attrs:{"data-flex":""}},[a("div",{staticClass:"w75 lh32"},[t._v("页面标题:")]),t._v(" "),a("div",{attrs:{"data-cell":""}},[a("Input",{attrs:{placeholder:"请输入页面标题"},model:{value:t.searchPms.title,callback:function(e){t.$set(t.searchPms,"title",e)},expression:"searchPms.title"}})],1)])]),t._v(" "),a("Col",{attrs:{span:"8"}},[a("div",{attrs:{"data-flex":""}},[a("div",{staticClass:"w75 lh32"},[t._v("消息内容:")]),t._v(" "),a("div",{attrs:{"data-cell":""}},[a("Input",{attrs:{placeholder:"请输入消息内容"},model:{value:t.searchPms.message,callback:function(e){t.$set(t.searchPms,"message",e)},expression:"searchPms.message"}})],1)])]),t._v(" "),a("Col",{attrs:{span:"8"}},[a("div",{attrs:{"data-flex":""}},[a("div",{staticClass:"w75 lh32"},[t._v("发生时间:")]),t._v(" "),a("div",{attrs:{"data-cell":""}},[a("DatePicker",{staticClass:"pct100",attrs:{type:"daterange",options:t.pickerOptions,placement:"bottom-end",placeholder:"请选择时间段"},model:{value:t.rangeTime,callback:function(e){t.rangeTime=e},expression:"rangeTime"}})],1)])]),t._v(" "),a("Col",{staticClass:"tr mt15",attrs:{span:"24"}},[a("Button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查询")]),t._v(" "),a("Button",{on:{click:t.reset}},[t._v("重置")])],1)],1),t._v(" "),a("div",{staticClass:"tr mb10"},[a("ButtonGroup",[a("Button",{attrs:{type:"error"==t.searchPms.level?"error":"ghost"},on:{click:function(e){t.changeLevel("error")}}},[t._v("错误")]),t._v(" "),a("Button",{attrs:{type:"warn"==t.searchPms.level?"warning":"ghost"},on:{click:function(e){t.changeLevel("warn")}}},[t._v("警告")]),t._v(" "),a("Button",{attrs:{type:"debug"==t.searchPms.level?"info":"ghost"},on:{click:function(e){t.changeLevel("debug")}}},[t._v("调式")]),t._v(" "),a("Button",{attrs:{type:"info"==t.searchPms.level?"default":"ghost"},on:{click:function(e){t.changeLevel("info")}}},[t._v("日志")])],1)],1),t._v(" "),a("div",{staticClass:"mb20"},[a("Table",{attrs:{loading:t.tblLoading,columns:t.columns,data:t.data}})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],staticClass:"tr"},[a("Page",{attrs:{total:t.total,"page-size":t.searchPms.limit},on:{"on-change":t.changePage}})],1)],1)},n=[],r={render:s,staticRenderFns:n};e.a=r},RYK3:function(t,e,a){e=t.exports=a("FZ+f")(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"index.vue",sourceRoot:""}])},Z1c9:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[t._v("堆栈信息")]),t._v(" "),a("div",[t._v(t._s(t.row.stack||"无"))])])},n=[],r={render:s,staticRenderFns:n};e.a=r},ZXiG:function(t,e,a){"use strict";var s=a("gyMJ"),n=a("JaHG"),r=a("x3HE"),i=a("w+eW"),o=a.n(i),l=n.a.getTimeSlot("today"),c=l.startTime,u=l.endTime;e.a={components:{ExpandRow:r.default},data:function(){return{tblLoading:!0,total:0,columns:[{type:"expand",width:50,render:function(t,e){return t(r.default,{props:{row:e.row}})}},{title:"发生时间",key:"createdAt",render:function(t,e){return t("div",[t("div",o()(e.row.createdAt).format("YYYY-MM-DD")),t("div",o()(e.row.createdAt).format("hh:mm:ss"))])}},{title:"消息",key:"message",render:function(t,e){return e.row.message||"-"}},{title:"发生页面",key:"page"},{title:"页面标题",key:"title",render:function(t,e){return e.row.title||"-"}},{title:"浏览器",key:"browser",render:function(t,e){return e.row.os||"-"}},{title:"系统",key:"os",render:function(t,e){return e.row.os||"-"}}],data:[],rangeTime:[c,u],searchPms:{startTime:null,endTime:null,title:"",message:"",level:"error",page:1,limit:30},pickerOptions:{shortcuts:[{text:"今日",value:function(){var t=n.a.getTimeSlot("yesterday");return[t.startTime,t.endTime]}},{text:"昨日",value:function(){var t=n.a.getTimeSlot("yesterday");return[t.startTime,t.endTime]}},{text:"最近一周",value:function(){var t=n.a.getTimeSlot("week");return[t.startTime,t.endTime]}}]}}},mounted:function(){this.loadList()},methods:{changeLevel:function(t){t!==this.searchPms.level&&(this.searchPms.level=t,this.loadList())},search:function(){this.btnLoading=!0,this.loadList()},reset:function(){this.searchPms.title="",this.searchPms.message="",this.searchPms.page=0,this.rangeTime=[c,u],this.loadList()},changePage:function(t){this.searchPms.page=t},loadList:function(t){var e=this;return this.tblLoading=!0,this.searchPms.startTime=this.rangeTime[0],this.searchPms.endTime=this.rangeTime[1],s.a.getJsLogList(this.searchPms).then(function(a){return e.data=a[0],e.total=a[1],e.tblLoading=!1,t&&(e.btnLoading=!1),a}).catch(function(a){throw console.warn(a),e.tblLoading=!1,t&&(e.btnLoading=!1),a})}}}},do4z:function(t,e,a){var s=a("RYK3");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a("rjj0")("10fb1170",s,!0)},"wIp/":function(t,e,a){"use strict";function s(t){a("do4z")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("ZXiG"),r=a("CIoT"),i=a("VU/8"),o=s,l=i(n.a,r.a,!1,o,null,null);e.default=l.exports},x3HE:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("690k"),n=a("Z1c9"),r=a("VU/8"),i=r(s.a,n.a,!1,null,null,null);e.default=i.exports}});
//# sourceMappingURL=0.3f8cacb8f20fb195f88d.js.map