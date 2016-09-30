!function(){"use strict";function e(e){"undefined"==typeof e?e={}:"",this.version="2.0",this.isDevelopMode=!1,this.basePath="",this.useDefaultStyle=!0,this.supportDrag=!0,this.isRealTime=!1,this.supportAdjust=!0,this.supportRemind=!1,this.supportConfig=!0,this.supportSetTop=!0,this.scrollDOM=window,this.topValue=0,this.animateTime=300,this.disableCache=!1,this.autoLoadCss=!1,this.supportSorting=!1,this.isCombSorting=!1,this.sortData={},this.sortUpText="up",this.sortDownText="down",this.sortingBefore=$.noop,this.sortingAfter=$.noop,this.supportAjaxPage=!1,this.sizeData=[10,20,30,50,100],this.pageSize=20,this.pageData={},this.query={},this.pagingBefore=$.noop,this.pagingAfter=$.noop,this.pageCssFile="",this.supportAutoOrder=!0,this.orderThName="order",this.supportCheckbox=!0,this.checkboxThName="gm-checkbox",this.i18n="zh-cn",this.columnData=[],this.gridManagerName="",this.ajax_url="",this.ajax_type="GET",this.ajax_beforeSend=$.noop,this.ajax_success=$.noop,this.ajax_complete=$.noop,this.ajax_error=$.noop,this.ajax_data=void 0,this.dataKey="data",this.totalsKey="totals",this.supportExport=!0;var t={};"object"==typeof gridManagerConfig&&($.extend(!0,t,this.textConfig,gridManagerConfig.textConfig),$.extend(!0,this,gridManagerConfig)),$.extend(!0,t,this.textConfig,e.textConfig),$.extend(this,e,{textConfig:t})}e.prototype={isChrome:function(){return navigator.userAgent.indexOf("Chrome")!=-1},getRandom:function(){return this.version+Math.random()},init:function(e,t){var a=this;if(a.cleanTableCacheForVersion(e),"string"==typeof a.gridManagerName&&""!==a.gridManagerName.trim()||(a.gridManagerName=e.attr("grid-manager")),""===a.gridManagerName.trim())return a.outLog("请在html标签中为属性[grid-manager]赋值或在配置项中配置gridManagerName","error"),!1;if(e.hasClass("GridManager-ready")||e.hasClass("GridManager-loading"))return a.outLog("渲染失败：可能该表格已经渲染或正在渲染","error"),!1;a.supportAjaxPage&&a.configPageForCache(e);var i=$.extend({},a.query,a.pageData);return e.addClass("GridManager-loading"),a.loadGridManagerFile(function(){a.initTable(e),"undefined"!=typeof e.attr("grid-manager-cache-error")&&window.setTimeout(function(){a.setToLocalStorage(e,!0),e.removeAttr("grid-manager-cache-error")},1e3),"function"==typeof t?t(i):""}),e},setGridManagerToJQuery:function(e){e.data("gridManager",this)},get:function(e){return this.__getGridManager(e)},__getGridManager:function(e){return e.data("gridManager")},setSort:function(e,t,a,i){var n=this;if(0==e.length||!t||$.isEmptyObject(t))return!1;"undefined"==typeof i&&(i=!0);var r,o,s;for(var c in t)r=$('[th-name="'+c+'"]',e),s=t[c],o=$(".sorting-action",r),s==n.sortUpText?(r.attr("sorting",n.sortUpText),o.removeClass("sorting-down"),o.addClass("sorting-up")):s==n.sortDownText&&(r.attr("sorting",n.sortDownText),o.removeClass("sorting-up"),o.addClass("sorting-down"));return i?n.__refreshGrid(a):"function"==typeof a?a():"",e},loadGridManagerFile:function(e){function t(){i&&n&&e()}var a=this,i=!1,n=!1;if(0==$("link#GridManager-css").length&&a.autoLoadCss){var r=document.createElement("link");r.id="GridManager-css",r.rel="stylesheet",r.type="text/css",r.href=a.basePath+"css/GridManager.css",document.head.appendChild(r),r.addEventListener("load",function(e){a.outLog("GridManager-css load OK","info"),i=!0,t()}),r.addEventListener("error",function(){a.outLog("GridManager-css load error","error"),i=!1})}else i=!0;if(a.supportAjaxPage&&0==$("link#GridManager-ajaxPage-css").length&&a.pageCssFile&&""!=a.pageCssFile){var o=document.createElement("link");o.id="GridManager-ajaxPage-css",o.rel="stylesheet",o.type="text/css",o.href=a.pageCssFile,document.head.appendChild(o),o.addEventListener("load",function(e){a.outLog("GridManager-ajaxPage-css load OK","info"),n=!0,t()}),o.addEventListener("error",function(){a.outLog("GridManager-ajaxPage-css load error","error"),n=!1})}else n=!0;t()},initTable:function(e){var t=this;t.createDOM(e),t.disableCache||t.configTheadForCache(e),t.supportAdjust&&t.bindAdjustEvent(e),t.supportDrag&&t.bindDragEvent(e),t.supportSorting&&t.bindSortingEvent(e),t.supportRemind&&t.bindRemindEvent(e),t.supportConfig&&t.bindConfigEvent(e),t.supportSetTop&&t.bindSetTopFunction(e),t.bindRightMenuEvent(e),t.__refreshGrid(),t.setGridManagerToJQuery(e)},cacheData:{},getRowData:function(e,t){return this.cacheData[$(t).attr("cache-key")]},refreshGrid:function(e,t,a){var i=this;"boolean"!=typeof t&&(a=t,t=!1),t&&(i.pageData.cPage=1),i.__refreshGrid(a)},__refreshGrid:function(e){function t(){window.setTimeout(function(){o.removeClass("refreshing")},2e3)}function a(t){if(!t)return void i.outLog("请求数据失败！请查看配置参数[ajax_url或ajax_data]是否配置正确，并查看通过该地址返回的数据格式是否正确","error");var a,o,s,c,d="",l="string"==typeof t?JSON.parse(t):t,g=l[i.dataKey];i.cacheData={},g&&0!==g.length?($.each(g,function(e,t){i.cacheData[e]=t,d+='<tr cache-key="'+e+'">',$.each(i.columnData,function(e,i){a=i.key,s=i.template,c="function"==typeof s?s(t[a],t):t[a],o=i.align?'align="'+i.align+'"':"",d+="<td "+o+">"+c+"</td>"}),d+="</tr>"}),r.html(d),i.resetTd(n,!1)):(d='<tr emptyTemplate><td colspan="'+$('th[th-visible="visible"]',n).length+'">'+(i.emptyTemplate||'<div class="gm-emptyTemplate">数据为空</div>')+"</td></tr>",l.totals=0,r.html(d)),i.supportAjaxPage&&(i.resetPageData(n,l[i.totalsKey]),i.checkMenuPageAction()),"function"==typeof e?e():""}var i=this,n=$('table[grid-manager="'+i.gridManagerName+'"]'),r=$("tbody",n),o=$(".page-toolbar .refresh-action",n.closest(".table-wrap"));if(o.addClass("refreshing"),i.ajax_data)return a(i.ajax_data),i.ajax_success(i.ajax_data),t(),void("function"==typeof e?e():"");if("string"!=typeof i.ajax_url||""===i.ajax_url)return i.outLog("请求表格数据失败！参数[ajax_url]配制错误","error"),t(),void("function"==typeof e?e():"");var s=$.extend({},i.query);i.supportAjaxPage&&$.extend(s,i.pageData),i.supportSorting&&$.extend(s,i.sortData),s.cPage<1?s.cPage=1:s.cPage>s.tPage&&(s.cPage=s.tPage),$.ajax({url:i.ajax_url,type:i.ajax_type,data:s,cache:!0,beforeSend:function(e){i.ajax_beforeSend(e)},success:function(e){a(e),i.ajax_success(e)},error:function(e,t,a){i.ajax_error(e,t,a)},complete:function(e,a){i.ajax_complete(e,a),t()}})},checkMenuPageAction:function(){var e=this,t=$('.grid-menu[grid-master="'+e.gridManagerName+'"]');if(t&&0!==t.length){var a=$('[refresh-type="previous"]',t),i=$('[refresh-type="next"]',t);1===e.pageData.cPage||0===e.pageData.tPage?a.addClass("disabled"):a.removeClass("disabled"),e.pageData.cPage===e.pageData.tPage||0===e.pageData.tPage?i.addClass("disabled"):i.removeClass("disabled")}},initOrderDOM:function(e){var t=this,a='<th th-name="'+t.orderThName+'" gm-order="true" gm-create="true">'+t.i18nText("order-text")+"</th>";$("thead tr",e).prepend(a)},initCheckboxDOM:function(e){var t=this,a='<th th-name="'+t.checkboxThName+'" gm-checkbox="true" gm-create="true"><input type="checkbox"/><span style="display: none">'+t.i18nText("checkall-text")+"</span></th>";$("thead tr",e).prepend(a),e.off("click",'input[type="checkbox"]'),e.on("click",'input[type="checkbox"]',function(){var a=$(this),i=!0,n=$('thead th[gm-checkbox] input[type="checkbox"]',e),r=$('tbody td[gm-checkbox] input[type="checkbox"]',e);1===a.closest('th[th-name="'+t.checkboxThName+'"]').length?$.each(r,function(e,t){t.checked=a.prop("checked"),$(t).closest("tr").attr("checked",t.checked)}):($.each(r,function(e,t){t.checked===!1&&(i=!1),$(t).closest("tr").attr("checked",t.checked)}),n.prop("checked",i))})},getCheckedTr:function(e){return $('tbody td[gm-checkbox] input[type="checkbox"]:checked',e).closest("tr")},createDOM:function(e){var t=this;e.attr({width:"100%",cellspacing:1,cellpadding:0,"grid-manager":t.gridManagerName});var a="<thead>",i="<tbody></tbody>",n="",r="",o="",s="";$.each(t.columnData,function(e,i){t.supportRemind&&"string"==typeof i.remind&&""!==i.remind&&(o='remind="'+i.remind+'"'),s="",t.supportSorting&&"string"==typeof i.sorting&&(i.sorting===t.sortDownText?(s='sorting="'+t.sortDownText+'"',t.sortData[i.key]=t.sortDownText):i.sorting===t.sortUpText?(s='sorting="'+t.sortUpText+'"',t.sortData[i.key]=t.sortUpText):s="sorting"),r=i.width?'width="'+i.width+'"':"",n=i.align?'align="'+i.align+'"':"",a+='<th th-name="'+i.key+'" '+o+" "+s+" "+r+" "+n+">"+i.text+"</th>"}),a+="</thead>",e.html(a+i),t.supportAutoOrder&&t.initOrderDOM(e),t.supportCheckbox&&t.initCheckboxDOM(e),t.setOriginalThDOM(e);var c='<div class="remind-action"><i class="ra-help iconfont icon-icon"></i><div class="ra-area"><span class="ra-title"></span><span class="ra-con"></span></div></div>',d='<div class="config-area"><span class="config-action"><i class="iconfont icon-31xingdongdian"></i></span><ul class="config-list"></ul></div>',l='<span class="adjust-action"></span>',g='<div class="sorting-action"><i class="sa-icon sa-up iconfont icon-sanjiao2"></i><i class="sa-icon sa-down iconfont icon-sanjiao1"></i></div>',h='<a href="" download="" id="gm-export-action"></a>';if(t.supportAjaxPage)var p='<div class="page-toolbar"><div class="dataTables_info"></div><div class="change-size"><select name="pSizeArea"></select></div><div class="goto-page">'+t.i18nText("goto-first-text")+'<input type="text" class="gp-input"/>'+t.i18nText("goto-last-text")+'</div><div class="refresh-action"><i class="iconfont icon-shuaxin"></i></div><div class="ajax-page"><ul class="pagination"></ul></div></div>';var u,f,m,v,b,x,w,y,T,C,k,D,M,S;t.checkTable(e),t.useDefaultStyle&&e.addClass("grid-manager-default"),v=$("thead",e),b=v.find("th"),e.wrap('<div class="table-wrap"><div class="table-div"></div><span class="text-dreamland"></span></div>'),u=e.parents(".table-wrap").eq(0),m=$(".table-div",u),t.supportConfig&&u.append(d),f=e.attr("grid-manager"),t.supportAjaxPage&&(u.append(p),t.initAjaxPage(e)),t.supportExport&&u.append(h),t.supportSetTop&&m.after('<div class="scroll-area"><div class="sa-inner"></div></div>'),$.each(b,function(e,a){x=$(a),x.attr("th-visible","visible"),M=!(!t.supportAutoOrder||"true"!=x.attr("gm-order")),S=!(!t.supportCheckbox||"true"!=x.attr("gm-checkbox")),w=$('<div class="th-wrap"></div>'),y=t.isChrome()?x.css("padding"):x.css("padding-top")+" "+x.css("padding-right")+" "+x.css("padding-bottom")+" "+x.css("padding-left"),y=$.trim(y),""!=y&&"0px"!=y&&"0px 0px 0px 0px"!=y&&(w.css("padding",y),x.css("cssText","padding:0px!important")),t.supportConfig&&$(".config-list",u).append('<li th-name="'+x.attr("th-name")+'" class="checked-li"><input type="checkbox" checked="checked"/><label><span class="fake-checkbox"></span>'+x.text()+"</label></li>"),!t.supportDrag||M||S?w.html('<span class="th-text">'+x.html()+"</span>"):w.html('<span class="th-text drag-action">'+x.html()+"</span>");var i=w.css("padding-top");if(!t.supportRemind||void 0==x.attr("remind")||M||S||(T=$(c),T.find(".ra-title").text(x.text()),T.find(".ra-con").text(x.attr("remind")||x.text()),""!=i&&"0px"!=i&&T.css("top",i),w.append(T)),D=x.attr("sorting"),t.supportSorting&&void 0!=D&&!M&&!S){switch(k=$(g),D){case t.sortUpText:k.addClass("sorting-up");break;case t.sortDownText:k.addClass("sorting-down")}""!=i&&"0px"!=i&&k.css("top",i),w.append(k)}t.supportAdjust&&!S&&(C=$(l),e==b.length-1&&C.hide(),w.append(C)),x.html(w);var n=x.prop("width");if(n&&""!==n)x.width(n),x.removeAttr("width");else{var r=t.getTextWidth(x);x.css("min-width",r)}}),e.removeClass("GridManager-loading"),e.addClass("GridManager-ready")},checkTable:function(e){var t=this,e=$(e),a=$("thead th",e),i=!1;$.each(a,function(e,a){a.getAttribute("th-name")||(i?"":i=!0,a.setAttribute("th-name","auto-th-"+t.getRandom()))}),i&&e.attr("no-cache","true")},bindConfigEvent:function(e){var t=this,a=$(e).parents("div.table-wrap"),i=$(".config-action",a);i.unbind("click"),i.bind("click",function(){var e=$(this),t=e.closest(".config-area");$(".config-list",t);if("block"==t.css("display"))return t.hide(),!1;t.show();var a,i=e.parents(".table-wrap").eq(0),n=$("[grid-manager]",i),r=$("thead th",n),o=$("tbody tr",n);$.each(r,function(e,t){t=$(t),$.each(o,function(e,i){a=$("td",i).eq(t.index()),a.css("display",t.css("display"))})});var s=$(".checked-li",t);1==s.length?s.addClass("no-click"):s.removeClass("no-click")}),$(".config-list li",a).unbind("click"),$(".config-list li",a).bind("click",function(){var e,a=$(this),i=(a.closest(".config-area"),a.attr("th-name")),n=a.find('input[type="checkbox"]'),r=a.closest(".table-wrap"),o=$(".table-div",r),s=$("[grid-manager]",r),c=$('thead th[th-name="'+i+'"]',s);if(a.hasClass("no-click"))return!1;a.closest(".config-list").find(".no-click").removeClass("no-click");var d=!n.get(0).checked;o.addClass("config-editing"),t.setAreVisible(c,d,!1,function(){o.removeClass("config-editing")}),e=$('.config-area input[type="checkbox"]:checked',r),1==e.length&&e.parent().addClass("no-click"),t.resetAdjust(s),t.supportSetTop&&$(".sa-inner",r).width("100%");var l=$('thead th[th-visible="visible"]',s);$.each(l,function(e,t){t.style.width="auto"}),$.each(l,function(e,a){var i=t.getTextWidth(a),n=$(a).width();n<i?$(a).width(i):$(a).width(n)}),t.setToLocalStorage(s)})},showTh:function(e,t){var a=this;a.setAreVisible($(t),!0)},hideTh:function(e,t){var a=this;a.setAreVisible($(t),!1)},setAreVisible:function(e,t,a,i){var n,r,o,s,c,d,l=$(this),g=[],h=a?0:l.animateTime;$.each(e,function(e,l){o=$(l),n=o.closest("table"),r=n.closest(".table-wrap"),s=$("tbody tr",n),c=$('.config-area li[th-name="'+o.attr("th-name")+'"]',r),d=c.find('input[type="checkbox"]'),0!=d.length&&($.each(s,function(e,t){g.push($(t).find("td").eq(o.index()))}),t?(o.attr("th-visible","visible"),$.each(g,function(e,t){a?$(t).show():$(t).fadeIn(h)}),c.addClass("checked-li"),d.get(0).checked=!0):(o.attr("th-visible","none"),$.each(g,function(e,t){$(t).hide()}),c.removeClass("checked-li"),d.get(0).checked=!1),"function"==typeof i?i():"")})},bindRemindEvent:function(e){var t,a,i,n=$(".remind-action",e);n.unbind("mouseenter"),n.bind("mouseenter",function(){t=$(this).find(".ra-area"),a=$(this).closest(".table-div"),t.show(),i=a.get(0).offsetWidth-($(this).offset().left-a.offset().left)>t.get(0).offsetWidth,t.css({left:i?"0px":"auto",right:i?"auto":"0px"})}),n.unbind("mouseleave"),n.bind("mouseleave",function(){t=$(this).find(".ra-area"),t.hide()})},bindSortingEvent:function(e){var t,a,i,n,r,o=this,s=$("th[sorting]",e);$(".sorting-action",s).unbind("mouseup"),$(".sorting-action",s).bind("mouseup",function(){if(t=$(this),a=t.closest("th"),i=a.closest("table"),n=i.attr("grid-manager"),r=a.attr("th-name"),!r||""==$.trim(r))return o.outLog("排序必要的参数丢失","error"),!1;o.isCombSorting||$.each($(".sorting-action",i),function(e,a){a!=t.get(0)&&($(a).removeClass("sorting-up sorting-down"),$(a).closest("th").attr("sorting",""))}),t.hasClass("sorting-down")?(t.addClass("sorting-up"),t.removeClass("sorting-down"),a.attr("sorting",o.sortUpText)):(t.addClass("sorting-down"),t.removeClass("sorting-up"),a.attr("sorting",o.sortDownText)),o.isCombSorting?$.each($("th[th-name][sorting]",i),function(e,t){""!=t.getAttribute("sorting")&&(o.sortData[t.getAttribute("th-name")]=t.getAttribute("sorting"))}):(o.sortData={},o.sortData[a.attr("th-name")]=a.attr("sorting"));var e=$.extend({},o.query,o.sortData,o.pageData);o.sortingBefore(e),o.__refreshGrid(function(){o.sortingAfter(e,a)})})},bindDragEvent:function(e){var t,a,i,n,r,o,s,c,d,l,g,h,p,u=this,f=$("thead th",e),m=f.find(".drag-action");m.unbind("mousedown"),m.bind("mousedown",function(){t=$(this).closest("th"),a=void 0,i=void 0,n=void 0,r=void 0,o=t.parent(),s=o.find("th"),c=o.parents("table").eq(0),d=c.parents(".table-div").eq(0),l=c.find("tbody").find("tr").find("td:eq("+t.index()+")"),$("body").addClass("no-select-text"),g=d.css("position"),"relative"!=g&&"absolute"!=g&&d.css("position","relative"),u.isRealTime?(t.addClass("drag-ongoing"),l.addClass("drag-ongoing"),window.clearInterval(p),p=window.setInterval(function(){l=c.find("tbody tr").find("td:eq("+t.index()+")"),l.addClass("drag-ongoing")},100)):(t.addClass("drag-ongoing opacityChange"),l.addClass("drag-ongoing opacityChange")),h=$('<div class="dreamland-div"></div>'),d.parent().append(h);var e,f,m='<table class="dreamland-table '+c.attr("class")+'"><thead><tr><th style="height:'+t.get(0).offsetHeight+'px">'+t.find(".drag-action").get(0).outerHTML+"</th></tr></thead><tbody>";$.each(l,function(t,a){f=a.cloneNode(!0),f.style.height=a.offsetHeight+"px",e=$(a).closest("tr").clone(),m+=e.html(f.outerHTML).get(0).outerHTML}),m+="</tbody></table>",h.html(m),$("body").unbind("mousemove"),$("body").bind("mousemove",function(e){a=void 0,0!=t.index()&&(a=s.eq(t.index()-1)),i=void 0,t.index()!=s.length-1&&(i=s.eq(t.index()+1)),a&&"true"===a.attr("gm-create")?a=void 0:i&&"true"===i.attr("gm-create")&&(i=void 0),h.show(),h.css({width:t.get(0).offsetWidth,height:c.get(0).offsetHeight,left:e.clientX-d.offset().left+d.get(0).scrollLeft+(document.body.scrollLeft||document.documentElement.scrollLeft)-t.get(0).offsetWidth/2,top:e.clientY-d.offset().top+d.get(0).scrollTop+(document.body.scrollTop||document.documentElement.scrollTop)-h.find("th").get(0).offsetHeight/2}),a&&0!=a.length&&h.get(0).offsetLeft<a.get(0).offsetLeft&&(n=c.find("tbody").find("tr").find("td:eq("+a.index()+")"),a.before(t),$.each(l,function(e,t){n.eq(e).before(t)}),s=o.find("th")),i&&0!=i.length&&h.get(0).offsetLeft>i.get(0).offsetLeft-h.get(0).offsetWidth/2&&(r=c.find("tbody").find("tr").find("td:eq("+i.index()+")"),i.after(t),$.each(l,function(e,t){r.eq(e).after(t)}),s=o.find("th"))}),$("body").unbind("mouseup"),$("body").bind("mouseup",function(){$("body").unbind("mousemove"),h=$(".dreamland-div"),0!=h.length&&h.animate({top:c.get(0).offsetTop,left:t.get(0).offsetLeft-d.get(0).scrollLeft},u.animateTime,function(){d.css("position",g),t.removeClass("drag-ongoing"),l.removeClass("drag-ongoing"),h.remove()}),u.setToLocalStorage(c),u.resetAdjust(c),$("body").removeClass("no-select-text"),u.isRealTime&&window.clearInterval(p)})})},bindAdjustEvent:function(e){var t=this,a=$("thead th",e);a.off("mousedown",".adjust-action"),a.on("mousedown",".adjust-action",function(e){var a=$(this),i=a.parents("th").eq(0),n=i.parent(),r=n.parents("table").eq(0),o=r.parents(".table-div").eq(0),s=(o.parents(".table-wrap"),$(".th-wrap",i)),a=$(".drag-action",s),c=n.find("th[th-visible!=none]"),d=c.eq(i.index()+1),l=c.eq(c.length-1),g=c.eq(c.length-2),h=r.find("tbody").find("tr").find("td:eq("+i.index()+")");$.each(c,function(e,t){"auto"!=t.style.width&&""!=t.style.width||$(t).width($(t).width())}),i.addClass("adjust-selected"),h.addClass("adjust-selected");var p,u,f=(e.clientX,t.getTextWidth(i));return r.unbind("mousemove"),r.bind("mousemove",function(e){p=e.clientX-i.offset().left-i.css("padding-left").split("px")[0]-i.css("padding-right").split("px")[0],p<f&&(p=f),i.index()==g.index()&&(u=i.width()-p+l.width(),l.width(Math.ceil(u<f?f:u))),i.width(Math.ceil(p));var a=t.isChrome()?r.get(0).offsetWidth==o.width()||r.get(0).offsetWidth==o.width()+1||r.get(0).offsetWidth==o.width()-1:r.get(0).offsetWidth==o.width();a&&i.width()>p&&d.width(Math.ceil(d.width()+i.width()-p)),t.supportSetTop&&$(t.scrollDOM).trigger("scroll")}),r.unbind("mouseup mouseleave"),r.bind("mouseup mouseleave",function(){r.unbind("mousemove mouseleave"),i.removeClass("adjust-selected"),h.removeClass("adjust-selected"),t.supportSetTop&&$(t.scrollDOM).trigger("scroll"),t.setToLocalStorage(r)}),!1})},getTextWidth:function(e){var t=$(e),a=$(".th-wrap",t),i=$(".th-text",t),n=$(".remind-action",a),r=$(".sorting-action",a),o=$(".text-dreamland",t.parents(".table-wrap"));o.text(i.text()),o.css({fontSize:i.css("font-size"),fontWeight:i.css("font-weight"),fontFamily:i.css("font-family")});var s=a.css("padding-left").split("px")[0]||0,c=a.css("padding-right").split("px")[0]||0,d=o.width()+(Number(s)?Number(s):0)+(Number(c)?Number(c):0)+(1==n.length?20:5)+(1==r.length?20:5);return d},bindSetTopFunction:function(e){var t=this;$(window).resize(function(){$(t.scrollDOM).trigger("scroll",[!0])}),$(".scroll-area").unbind("scroll"),$(".scroll-area").bind("scroll",function(){$(this).parents(".table-div").scrollLeft(this.scrollLeft),this.style.left=this.scrollLeft+"px"}),t.scrollDOM!=window&&$(t.scrollDOM).css("padding","0px"),$(t.scrollDOM).unbind("scroll"),$(t.scrollDOM).bind("scroll",function(a,i){var n,r,o,s,c,d,l,g,h=$(this),p=h.scrollTop(),u=0,f=void 0;if(n=e.parents(".table-div").eq(0),r=n.parents(".table-wrap").eq(0),c=e.get(0),d=$('> thead[class!="set-top"]',e),g=$("tbody",e),!n||0==n.length)return!0;if(u=t.scrollDOM==window?n.offset().top:0,s=c.offsetTop,o=$(".set-top",e),0==$("tr",g).length)return!0;var m=$(".scroll-area",r);return n.width()<e.width()?(f=t.scrollDOM==window?Number(n.height())+Number(r.css("margin-bottom").split("px")[0])-(document.body.scrollTop||document.documentElement.scrollTop||window.scrollY)-(window.innerHeight-n.offset().top):Number(n.height())+Number(r.css("margin-bottom").split("px")[0])-h.scrollTop()-h.height(),f<0&&(f=0),$(".sa-inner",m).css({width:e.width()}),m.css({bottom:f-18,left:n.scrollLeft()}),m.scrollLeft(n.scrollLeft()),m.show()):m.hide(),(t.scrollDOM==window?u-p>=-s:0==p)?(d.hasClass("scrolling")&&d.removeClass("scrolling"),o.remove(),!0):t.scrollDOM==window&&(u-p<0&&Math.abs(u-p)+d.height()-s>n.height())?(o.show(),o.css({top:"auto",bottom:"0px"}),!0):((0==o.length||i)&&(0==o.length?e.append(d.clone(!1).addClass("set-top")):"",o=$(".set-top",e),o.css({width:d.width()+Number(d.css("border-left-width").split("px")[0]||0)+Number(d.css("border-right-width").split("px")[0]||0),left:e.css("border-left-width")}),l=$("th",d),$.each($("th",o),function(e,t){$(t).css({width:l.eq(e).width()+Number(l.eq(e).css("border-left-width").split("px")[0]||0)+Number(l.eq(e).css("border-right-width").split("px")[0]||0)})})),o.css("background")&&""!=o.css("background")&&"none"!=o.css("background")||o.css("background","#f5f5f5"),!(t.scrollDOM!=window||u-p<0&&Math.abs(u-p)<=n.height()+s)||(d.hasClass("scrolling")||d.addClass("scrolling"),o.css({top:p-u+t.topValue,bottom:"auto"}),o.show(),!0))}),$(t.scrollDOM).trigger("scroll")},bindRightMenuEvent:function(e){function t(e,t){return!!$(e).hasClass("disabled")&&(t.stopPropagation(),t.preventDefault(),!0)}var a=this,i=$(e).closest(".table-wrap"),n=($("tbody",i),'<div class="grid-menu" grid-master="'+a.gridManagerName+'">');a.supportAjaxPage&&(n+='<span grid-action="refresh-page" refresh-type="previous">'+a.i18nText("previous-page")+'<i class="iconfont icon-sanjiao2"></i></span><span grid-action="refresh-page" refresh-type="next">'+a.i18nText("next-page")+'<i class="iconfont icon-sanjiao1"></i></span>'),n+='<span grid-action="refresh-page" refresh-type="refresh">'+a.i18nText("refresh")+'<i class="iconfont icon-31shuaxin"></i></span>',a.supportExport&&(n+='<span class="grid-line"></span><span grid-action="export-excel" only-checked="false">'+a.i18nText("save-as-excel")+'<i class="iconfont icon-baocun"></i></span><span grid-action="export-excel" only-checked="true">'+a.i18nText("save-as-excel-for-checked")+'<i class="iconfont icon-saveas24"></i></span>'),a.supportConfig&&(n+='<span class="grid-line"></span><span grid-action="setting-grid">'+a.i18nText("setting-grid")+'<i class="iconfont icon-shezhi"></i></span>'),n+="</div>";var r=$("body");r.append(n);var o=$('.grid-menu[grid-master="'+a.gridManagerName+'"]');i.unbind("contextmenu"),i.bind("contextmenu",function(e){if(e.preventDefault(),e.stopPropagation(),"TBODY"===e.target.nodeName||0!==$(e.target).closest("tbody").length){var t=$('[grid-action="export-excel"][only-checked="true"]');0===$('tbody tr[checked="checked"]','table[grid-manager="'+a.gridManagerName+'"]').length?t.addClass("disabled"):t.removeClass("disabled");var n=o.width(),s=o.height(),c=document.documentElement.offsetHeight,d=document.documentElement.offsetWidth,l=c<e.clientY+s?e.clientY-s:e.clientY,g=d<e.clientX+n?e.clientX-n:e.clientX;o.css({top:l+i.get(0).scrollTop+(document.body.scrollTop||document.documentElement.scrollTop),left:g+i.get(0).scrollLeft+(document.body.scrollLeft||document.documentElement.scrollLeft)}),$(".grid-menu[grid-master]").hide(),o.show(),r.off("mousedown.gridMenu"),r.on("mousedown.gridMenu",function(e){var t=$(e.target);t.hasClass(".grid-menu")||1===t.closest(".grid-menu").length||(r.off("mousedown.gridMenu"),o.hide())})}});var s=$('[grid-action="refresh-page"]');s.unbind("click"),s.bind("click",function(e){if(t(this,e))return!1;var i=$(this).closest(".grid-menu"),n=$('table[grid-manager="'+i.attr("grid-master")+'"]');a=a.__getGridManager(n);var o=this.getAttribute("refresh-type");"previous"===o&&a.pageData.cPage>1?a.pageData.cPage=a.pageData.cPage-1:"next"===o&&a.pageData.cPage<a.pageData.tPage&&(a.pageData.cPage=a.pageData.cPage+1);var s=$.extend({},a.query,a.sortData,a.pageData);a.pagingBefore(s),a.__refreshGrid(function(){a.pagingAfter(s)}),r.off("mousedown.gridMenu"),i.hide()});var c=$('[grid-action="export-excel"]');c.unbind("click"),c.bind("click",function(e){if(t(this,e))return!1;var i=$(this).closest(".grid-menu"),n=$('table[grid-manager="'+i.attr("grid-master")+'"]'),o=!1;"true"===this.getAttribute("only-checked")&&(o=!0),a.exportGridToXls(n,void 0,o),r.off("mousedown.gridMenu"),i.hide()});var d=$('[grid-action="setting-grid"]');d.unbind("click"),d.bind("click",function(e){if(t(this,e))return!1;var a=$(this).closest(".grid-menu"),i=$('table[grid-manager="'+a.attr("grid-master")+'"]'),n=$(".config-area",i.closest(".table-wrap"));$(".config-action",n).trigger("click"),r.off("mousedown.gridMenu"),a.hide()})},exportGridToXls:function(e,t,a){function i(e){return window.btoa(unescape(encodeURIComponent(e)))}var n=this,r=$("#gm-export-action");if(!n.supportExport||0===r.length)return void n.outLog("导出失败，请查看配置项:supportExport是否配置正确","error");var o,s,c="data:application/vnd.ms-excel;base64,",d="",l="",g="",h=$(e),p=$('thead[class!="set-top"] th[th-visible="visible"][gm-create!="true"]',h);o=n.supportCheckbox&&a?$('tbody tr[checked="checked"]',h):$("tbody tr",h),$.each(p,function(e,t){l+="<th>"+t.getElementsByClassName("th-text")[0].textContent+"</th>"}),$.each(o,function(e,t){s=$('td[gm-create!="true"]',t),g+="<tr>",$.each(s,function(e,t){g+=t.outerHTML}),g+="</tr>"}),d='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><table><thead>'+l+"</thead><tbody>"+g+"</tbody></table></body></html>",r.prop("href",c+i(d)),r.prop("download",(t||h.attr("grid-manager"))+".xls"),r.get(0).click()},resetAdjust:function(e){var t=this;if(!t.supportAdjust)return!1;var a=$(e),i=$('thead [th-visible="visible"]',a),n=$(".adjust-action",i);return!(!n||0==n.length)&&(n.show(),void n.eq(n.length-1).hide())},setToLocalStorage:function(e,t){var a=this;if(!a.disableCache){var i=$(e),n=i.attr("no-cache");if(n&&"true"==n)return a.outLog("缓存已被禁用：当前表缺失必要html标签属性[grid-manager或th-name]","info"),!1;if(!window.localStorage)return a.outLog("当前浏览器不支持：localStorage，缓存功能失效。","error"),!1;if(!i||0==i.length)return a.outLog("setToLocalStorage:无效的table","error"),!1;var r=i.attr("grid-manager");if(!r||""==$.trim(r))return a.outLog("setToLocalStorage:无效的grid-manager","error"),!1;var o={},s="",c={},d=new Array,l={},g=$('thead[class!="set-top"] th',i);if(!g||0==g.length)return a.outLog("setToLocalStorage:无效的thList,请检查是否正确配置table,thead,th","error"),!1;var h,p=window.location.pathname+window.location.hash+"-"+r;return $.each(g,function(e,n){h=$(n),l={},l.th_name=n.getAttribute("th-name"),a.supportDrag&&(l.th_index=h.index()),a.supportAdjust&&(t?h.css("width",h.css("width")):"",l.th_width=n.offsetWidth),a.supportConfig&&(l.isShow=$('.config-area li[th-name="'+l.th_name+'"]',i.parents(".table-wrap").eq(0)).find('input[type="checkbox"]').get(0).checked),d.push(l)}),o.th=d,a.supportAjaxPage&&(c.pSize=$('select[name="pSizeArea"]',i.closest(".table-wrap")).val(),o.page=c),s=JSON.stringify(o),window.localStorage.setItem(p,s),s}},getLocalStorage:function(e){var t=this,a=$(e),i=t.getLocalStorageKey(a);if(!i)return{};var n={},r=(new Array,window.localStorage.getItem(i));return r?(n.key=i,n.cache=JSON.parse(r),n):(a.attr("grid-manager-cache-error","error"),{})},clear:function(e){var t=this,a=$(e),i=t.getLocalStorageKey(a);return!!i&&(window.localStorage.removeItem(i),!0)},getLocalStorageKey:function(e){var t=this,a=e.attr("no-cache");if(a&&"true"==a)return t.outLog("缓存已被禁用：当前表缺失必要html标签属性[grid-manager或th-name]","info"),!1;if(!window.localStorage)return t.outLog("当前浏览器不支持：localStorage，缓存功能失效","info"),!1;if(!e||0==e.length)return t.outLog("getLocalStorage:无效的table","error"),!1;var i=e.attr("grid-manager");if(!i||""==$.trim(i))return t.outLog("getLocalStorage:无效的grid-manager","error"),!1;$('thead[class!="set-top"] th',e);return window.location.pathname+window.location.hash+"-"+i},configPageForCache:function(e){var t,a=this,i=a.getLocalStorage(e),n=i.cache;t=n&&n.page&&n.page.pSize?n.page.pSize:a.pageSize||10,a.pageData={pSize:t,cPage:1}},setOriginalThDOM:function(e){e.data("originalThDOM",$("thead th",e))},getOriginalThDOM:function(e){return $(e).data("originalThDOM")},configTheadForCache:function(e){var t,a,i,n,r=this,o=r.getLocalStorage(e),s=[];if(!o||$.isEmptyObject(o))return void r.outLog("configTheadForCache:当前table没有缓存数据","info");if(a=o.cache,i=a.th,!i||i.length!=$("thead th",e).length)return void r.cleanTableCache(e,"缓存数据与当前列表不匹配");var c=[],d=!0;$.each(i,function(a,i){return n=i,t=$("th[th-name="+n.th_name+"]",e),0==t.length||c.indexOf(n.th_name)!=-1?(r.cleanTableCache(e,"缓存数据与当前列表不匹配"),d=!1,!1):void c.push(n.th_name)}),d&&($.each(i,function(a,i){n=i,t=$("th[th-name="+n.th_name+"]",e),r.supportAdjust&&t.css("width",n.th_width),r.supportDrag&&"undefined"!=typeof n.th_index?s[n.th_index]=t:s[a]=t,r.supportConfig&&r.setAreVisible(t,"undefined"==typeof n.isShow||n.isShow,!0)}),r.supportDrag&&e.find("thead tr").html(s),r.resetAdjust(e))},resetTd:function(e,t){var a=this;if(t)var i=$(e),n=i.parents("table").eq(0);else var n=$(e),i=n.find("tbody tr");if(!i||0==i.length)return!1;if(a.supportAutoOrder){var r,o=a.pageData,s=void 0,c=1;o&&o.pSize&&o.cPage&&(c=o.pSize*(o.cPage-1)+1),$.each(i,function(e,t){r=c+e,s=$('td[gm-order="true"]',t),0==s.length?$(t).prepend('<td gm-order="true" gm-create="true">'+r+"</td>"):s.text(r)})}if(a.supportCheckbox){var d=void 0;$.each(i,function(e,t){d=$('td[gm-checkbox="true"]',t),0==d.length?$(t).prepend('<td gm-checkbox="true" gm-create="true"><input type="checkbox"/></td>'):$('[type="checkbox"]',d).prop("checked",!1)})}if(a.supportAdjust){var l,g=a.getOriginalThDOM(n);if(!g||0==g.length)return a.outLog("resetTdForCache:列位置重置所必须的原TH DOM获取失败","error"),!1;var h=[],p=[];$.each(i,function(e,t){h[e]=$(t),l=$(t).find("td"),$.each(l,function(e,t){p[g.eq(e).index()]=t}),h[e].html(p)})}if(a.supportConfig&&a.setAreVisible($('[th-visible="none"]'),!1,!0),a.supportSetTop){var u=n.parents(".table-div").eq(0),f=u.parents(".table-wrap").eq(0);u.css({height:"auto"}),f.css({marginBottom:0})}},cleanTableCacheForVersion:function(e){var t=this,a=window.localStorage.getItem("GridManagerVersion");a&&a==t.version||t.cleanTableCache(e,"插件版本已更新")},cleanTableCache:function(e,t){var a=this;$.each(e,function(e,i){window.localStorage.removeItem(i.getAttribute("grid-manager")),window.localStorage.removeItem(i.getAttribute("grid-manager")+"-"+$("th",i).length),a.outLog(i.getAttribute("grid-manager")+"清除缓存成功,原因："+t,"info")}),window.localStorage.setItem("GridManagerVersion",a.version)},initAjaxPage:function(e){var t=this,e=$(e),a=e.attr("grid-manager"),i=e.closest(".table-wrap"),n=$(".page-toolbar",i),r=$.isArray(t.sizeData)?t.sizeData:t.sizeData[a];n.hide(),t.createPageSizeDOM(e,r),t.bindPageJumpEvent(e),t.bindSetPageSizeEvent(e)},createPageDOM:function(e,t){var a=this,i=$(e),n=i.parents(".table-wrap").eq(0),r=$(".page-toolbar",n),o=$(".pagination",r),s=Number(t.cPage||0),c=Number(t.tPage||0),d="",l="",g="first-page",h="previous-page";1==s&&(g+=" disabled",h+=" disabled"),d+='<li cPage="1" class="'+g+'"><a href="javascript:void(0);">'+a.i18nText("first-page")+'</a></li><li cPage="'+(s-1)+'" class="'+h+'"><a href="javascript:void(0);">'+a.i18nText("previous-page")+"</a></li>";
var p=1,u=c;for(s>4&&(d+='<li cPage="1"><a href="javascript:void(0);">1</a></li><li class="disabled"><a href="javascript:void(0);">...</a></li>',p=s-2),c-s>4&&(u=s+2,l+='<li class="disabled"><a href="javascript:void(0);">...</a></li><li cPage="'+c+'"><a href="javascript:void(0);">'+c+"</a></li>"),p;p<=u;p++)d+=p!=s?'<li cPage="'+p+'"><a href="javascript:void(0);">'+p+"</a></li>":'<li class="active"><a href="javascript:void(0);">'+s+"</a></li>";d+=l;var f="next-page",m="last-page";s>=c&&(f+=" disabled",m+=" disabled"),d+='<li cPage="'+(s+1)+'" class="'+f+'"><a href="javascript:void(0);">'+a.i18nText("next-page")+'</a></li><li cPage="'+c+'" class="'+m+'"><a href="javascript:void(0);">'+a.i18nText("last-page")+"</a></li>",o.html(d)},createPageSizeDOM:function(e,t){var a=this,i=$(e),n=i.closest(".table-wrap"),r=$(".page-toolbar",n),o=$('select[name="pSizeArea"]',r);if(!t||!$.isArray(t))return void a.outLog("渲染失败：参数[sizeData]配置错误","error");var s="";$.each(t,function(e,t){s+='<option value="'+t+'">'+t+"</option>"}),o.html(s)},bindPageJumpEvent:function(e){function t(e,t){$("table[grid-manager]",e),$('select[name="pSizeArea"]',e);t>a.pageData.tPage&&(t=a.pageData.tPage),a.pageData.cPage=t,a.pageData.pSize=a.pageData.pSize||a.pageSize;var i=$.extend({},a.query,a.sortData,a.pageData);a.pagingBefore(i),a.__refreshGrid(function(){a.pagingAfter(i)})}var a=this,i=$(e),n=i.closest(".table-wrap"),r=$(".page-toolbar",n),o=($(".pagination",r),$(".gp-input",r)),s=$(".refresh-action",r);r.off("click","li"),r.on("click","li",function(){var e=$(this),i=e.closest(".table-wrap"),n=e.attr("cPage");return n&&Number(n)&&!e.hasClass("disabled")?(n=parseInt(n),void t(i,n)):(a.outLog("指定页码无法跳转,已停止。原因:1、可能是当前页已处于选中状态; 2、所指向的页不存在","info"),!1)}),o.unbind("keyup"),o.bind("keyup",function(e){if(13===e.which){var a=$(this).closest(".table-wrap"),i=parseInt(this.value,10);if(!i)return void this.focus();t(a,i),this.value=""}}),s.unbind("click"),s.bind("click",function(){var e=($(this),$(this).closest(".table-wrap")),i=$(".page-toolbar .gp-input",e),n=i.val();if(""===n.trim())return void a.__refreshGrid();var r=parseInt(i.val(),10);return r?(t(e,r),void i.val("")):void i.focus()})},bindSetPageSizeEvent:function(e){var t=this,a=$(e),i=a.parents(".table-wrap").eq(0),n=$(".page-toolbar",i),r=$("select[name=pSizeArea]",n);return r&&0!=r.length?(r.unbind("change"),void r.change(function(){var e=$(this),a=e.parents(".table-wrap").eq(0),i=$("table[grid-manager]",a);$("table",a).attr("grid-manager");t.pageData={cPage:1,pSize:e.val()},t.setToLocalStorage(i);var n=$.extend({},t.query,t.sortData,t.pageData);t.pagingBefore(n),t.__refreshGrid(function(){t.pagingAfter(n)})})):(t.outLog("未找到单页显示数切换区域，停止该事件绑定","info"),!1)},resetPSize:function(e,t){var a=this,e=$(e),i=e.parents(".table-wrap").eq(0),n=$(".page-toolbar",i),r=$('select[name="pSizeArea"]',n),o=$(".dataTables_info",n);if(!r||0==r.length)return a.outLog("未找到条数切换区域，停止该事件绑定","info"),!1;var s=1==t.cPage?1:(t.cPage-1)*t.pSize+1,c=t.cPage*t.pSize,d=t.tSize,l=a.i18nText("dataTablesInfo",[s,c,d]);r.val(t.pSize||10),o.html(l),r.show()},resetPageData:function(e,t){function a(e){var t=i.pageData.pSize||i.pageSize,a=e,n=i.pageData.cPage;return{tPage:Math.ceil(a/t),cPage:n,pSize:t,tSize:a}}var i=this;if(!isNaN(parseInt(t,10))){var n=a(t);i.createPageDOM(e,n),i.resetPSize(e,n);var e=$(e),r=e.parents(".table-wrap").eq(0),o=$(".page-toolbar",r);$.extend(i.pageData,n),o.show()}},i18nText:function(e,t,a,i){var n=this,r=[];if(2==arguments.length&&"object"==typeof arguments[1])r=arguments[1];else if(arguments.length>1)for(var o=1;o<arguments.length;o++)r.push(arguments[o]);var s="";try{return s=n.textConfig[e][n.i18n]||"",r&&0!=r.length?s=s.replace(/{\d+}/g,function(e){return r[e.match(/\d+/)]}):s}catch(c){return n.outLog("未找到与"+e+"相匹配的"+n.i18n+"语言","warn"),""}},textConfig:{"order-text":{"zh-cn":"序号","en-us":"order"},"first-page":{"zh-cn":"首页","en-us":"first"},"previous-page":{"zh-cn":"上一页","en-us":"previous"},"next-page":{"zh-cn":"下一页","en-us":"next "},"last-page":{"zh-cn":"尾页","en-us":"last "},dataTablesInfo:{"zh-cn":"此页显示 {0}-{1} 共{2}条","en-us":"this page show {0}-{1} count {2}"},"goto-first-text":{"zh-cn":"跳转至","en-us":"goto "},"goto-last-text":{"zh-cn":"页","en-us":"page "},refresh:{"zh-cn":"重新加载","en-us":"Refresh "},"save-as-excel":{"zh-cn":"另存为Excel","en-us":"Save as Excel "},"save-as-excel-for-checked":{"zh-cn":"已选中项另存为Excel","en-us":"Save as Excel of Checked"},"setting-grid":{"zh-cn":"配置表","en-us":"Setting Grid"},"checkall-text":{"zh-cn":"全选","en-us":"All"}},setQuery:function(e,t){e.GridManager("get").query=t},outLog:function(e,t){return this.isDevelopMode||t?this.isDevelopMode||"info"!==t?this.isDevelopMode||"warn"!==t?"error"===t?console.error("GridManager Error: ",e):void 0:console.warn("GridManager Warn: ",e):console.info("GridManager Info: ",e):console.log("GridManager:",e)}},$.fn.GM=$.fn.GridManager=function(t,a,i){if(0==this.length)throw new Error("GridManager Error:JQuery对象为空，请确定选择器匹配是否正确");var n=this.eq(0);"TR"===n.get(0).nodeName&&(n=n.closest("table[grid-manager]"));var r,o,s;0===arguments.length?(r="init",o={},s=void 0):1===arguments.length&&"string"==typeof arguments[0]&&"init"==typeof arguments[0]?(r=arguments[0],o={},s=void 0):1===arguments.length&&"string"==typeof arguments[0]&&"init"!=typeof arguments[0]?(r=arguments[0],o=void 0,s=void 0):1===arguments.length&&$.isPlainObject(arguments[0])?(r="init",o=arguments[0],s=void 0):1===arguments.length&&"function"==typeof arguments[0]?(r="init",o=void 0,s=arguments[0]):2===arguments.length&&"string"==typeof arguments[0]&&"function"==typeof arguments[1]?(r=arguments[0],o=arguments[1],s=void 0):2===arguments.length&&"string"==typeof arguments[0]&&"function"!=typeof arguments[1]?(r=arguments[0],o=arguments[1],s=void 0):2===arguments.length&&$.isPlainObject(arguments[0])&&"function"==typeof arguments[1]?(r="init",o=arguments[0],s=arguments[1]):2===arguments.length&&"string"==typeof arguments[0]&&"boolean"==typeof arguments[1]?(r=arguments[0],o=arguments[1],s=void 0):3===arguments.length&&(r=arguments[0],o=arguments[1],s=arguments[2]);var c=["init","setSort","get","getCheckedTr","showTh","hideTh","exportGridToXls","getLocalStorage","resetTd","setQuery","refreshGrid","getRowData","clear"];if(c.indexOf(r)===-1)throw new Error("GridManager Error:方法调用错误，请确定方法名["+r+"]是否正确");var d;if("init"==r){var l=$.extend({},$.fn.GridManager.defaults,o);return d=new e(l),d.init(n,s),n}if("init"!=r){d=n.data("gridManager");var g=d[r](n,o,s);return"undefined"==typeof g?n:g}}}();