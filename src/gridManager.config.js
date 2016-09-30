/*
	listManager config file
	使用者可依据配置规则对全局的列表插件进行通用配置
*/ 
var GridManagerConfig = {	
	isDevelopMode  	: true					//是否为开发模式，为true时将打印事件日志
	,basePath		: ''					//当前基本路径[用于加载分页所需文件]
	,useDefaultStyle: true					//是否使用默认的table样式
	,supportDrag 	: true 					//是否支持拖拽功能
	,isRealTime		: false					//列表内是否存在实时刷新[平时尽量不要设置为true，以免消耗资源]
	,supportAdjust 	: true 					//是否支持宽度调整功能]
	,supportRemind  : false					//是否支持表头提示信息[需在地应的TH上增加属性remind]
	,supportConfig	: true					//是否支持配置列表功能[操作列是否可见]
	,supportSetTop  : true					//是否支持表头置顶
	,scrollDOM		: window				//表头置顶所对应的容器[jquery选择器或jquery对象]	
	,animateTime    : 300					//动画效果时长
	,disableCache	: false					//是否禁用本地缓存	
	,autoLoadCss	: true					//是否自动加载CSS文件
	//排序 sort 
	,supportSorting	: false 				//排序：是否支持排序功能
	,isCombSorting	: false					//是否为组合排序[只有在支持排序的情况下生效
	,sortUpText		: 'up'					//排序：升序标识[该标识将会传至数据接口]
	,sortDownText	: 'down'				//排序：降序标识[该标识将会传至数据接口]
	
	//分页 ajaxPag
	
	//tPage:总页数
	//cPage:当前页	
	//pSize:每页显示条数
	//tSize:总条数
	,supportAjaxPage: false					//是否支持配置列表ajxa分页	
	,sizeData 		: [10,20,30,50,100]		//用于配置列表每页展示条数选择框
	,pageCssFile 	: ''						//分页样式文件路径[用户自定义分页样式]	
	,i18n:'zh-cn'					//使用哪种语言，暂时支持[zh-cn:简体中文，en-us:美式英语] 默认zh-cn
	//配置插件中使用的文本信息
	,textConfig: {
		'config-action': {
			'zh-cn':'配置表格',
			'en-us':'The configuration form'
		}
		,'order-text': {
			'zh-cn':'序号',
			'en-us':'order'
		}
		,'first-page': {
			'zh-cn':'首页',
			'en-us':'first'
		}
		,'previous-page': {
			'zh-cn':'上一页',
			'en-us':'previous'
		}
		,'next-page': {
			'zh-cn':'下一页',
			'en-us':'next '
		}
		,'last-page': {
			'zh-cn':'尾页',
			'en-us':'last '
		}
		,'dataTablesInfo':{
			'zh-cn':'此页显示 {0}-{1} 共{2}条',
			'en-us':'this page show {0}-{1} count {2}'
		}
		,'page-go':{
			'zh-cn':'确定',
			'en-us':'Go '
		}
	}
}