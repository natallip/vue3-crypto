(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d5f796a0"],{"0315":function(e,t,c){"use strict";c("56f4")},"2d96":function(e,t,c){"use strict";c.r(t);var o=c("7a23"),n={class:"container"};function a(e,t,c,a,r,p){var s=Object(o["resolveComponent"])("graph-with-opions");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",n,[Object(o["createElementVNode"])("h1",null,Object(o["toDisplayString"])(p.tickerName),1),Object(o["createVNode"])(s)])}var r=c("5530"),p=c("5502"),s={class:"graph-options"},i=Object(o["createElementVNode"])("div",{class:"graph-options__title"},"Select a type of the chart:",-1),l={class:"graph-options"},h=Object(o["createElementVNode"])("div",{class:"graph-options__title"},"Select a color of the chart:",-1);function u(e,t,c,n,a,r){var p=Object(o["resolveComponent"])("app-graph"),u=Object(o["resolveComponent"])("app-select"),b=Object(o["resolveComponent"])("app-input");return Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,[Object(o["createVNode"])(p),Object(o["createElementVNode"])("div",s,[i,Object(o["createVNode"])(u,{text:"Select type",options:e.types,value:e.type,onChange:t[0]||(t[0]=function(t){return e.changeType(t)})},null,8,["options","value"])]),Object(o["createElementVNode"])("div",l,[h,Object(o["createVNode"])(b,{name:"color",type:"color",value:"#1378EB",onChange:t[1]||(t[1]=function(t){return e.changeColor(t)})})])],64)}var b=c("b6af"),d=c("4af8"),O=c("4665"),j={components:{AppGraph:b["a"],AppSelect:d["a"],AppInput:O["a"]},computed:Object(r["a"])({},Object(p["e"])("graph",["type","types"])),methods:Object(r["a"])({},Object(p["d"])("graph",["changeType","changeColor"]))};c("0315");j.render=u;var m=j,f={components:{GraphWithOpions:m},computed:{tickerName:function(){return this.$route.params.id}},created:function(){this.setSeries(this.tickerName)},methods:Object(r["a"])(Object(r["a"])({},Object(p["d"])("graph",["clearGraph"])),Object(p["b"])("graph",["setSeries"])),unmounted:function(){this.clearGraph()}};f.render=a;t["default"]=f},"56f4":function(e,t,c){}}]);
//# sourceMappingURL=chunk-d5f796a0.0097b203.js.map