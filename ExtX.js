/**
 * @author:王华文
 * @description:重写Extjs中常用的一些组件，给他们赋予一些默认值，类似与javascript里的prototype，如果用户需要的某些属性和默认属性发生冲突时可以再次重写该属性
 */
	Ext.useShims = true;
	Ext.QuickTips.init(true);
	Ext.form.Field.prototype.msgTarget="under";
	Ext.BLANK_IMAGE_URL = rootPath+'/ajaxext/resources/images/default/s.gif';
	
	Ext.override(Ext.grid.Column,{
		header: null,
		align: 'center',
		sortable: true,
		width: 100,
		renderer: alignLeft
	});
	
	Ext.override(Ext.CWindow,{		
		title : null,//
		width : 500,			
		resizable : false,
		modal : true,
        animateTarget : Ext.getBody(),
        constrain:true,
		closeAction : 'hide',
		buttonAlign : 'center',
		minButtonWidth : 60,		
		minimizable:true,
		maximizable:true,
		items : null//
	});
	
	Ext.override(Ext.data.Store,{
		autoLoad: true,
		baseParams :  params
	});
	
	Ext.override(Ext.FormPanel,{
		labelWidth : 100,
		labelAlign : 'right',
		frame: true,
		border : false,
		baseCls : 'x-panel',
		modal:true,
		/*
		//不能写成公用的，在做布局的时候（尤其是列布局）会影响页面显示
		defaults : {
			width : 200,
			xtype:'textfield',
			msgTarget : 'under'
		},
		*/
		buttonAlign : 'center',
		minButtonWidth : 60,
		items: null,
		trackResetOnLoad:true,//????这个属性在这里不能重写，在使用的时候必须加上这个属性
		buttons: null
		
	});
	
	Ext.override(Ext.grid.GridPanel,{
		id : null,
    	columnLines: true,
		store: null,
    	stripeRows: true,
		viewConfig:{forceFit:true},//列宽度自动适应
		sm: null,
		bbar:null,
		loadMask:{msg:"正在加载数据，请稍候"}
	});
	
	Ext.override(Ext.PagingToolbar,{
		pageSize : limit,
		store : null,//
		displayInfo : true,
		displayMsg : '显示第{0}条到{1}条记录，一共{2}条',
		emptyMsg : '没有记录',
		prevText:"上一页",
		nextText:"下一页",
		refreshText:"刷新",
		lastText:"最后页",
		firstText:"第一页",
		beforePageText:"当前页",
		afterPageText:"共{0}页",
		plugins: [new Ext.ux.ProgressBarPager(),new Ext.ux.plugin.PagingToolbarResizer()]
	});
	
	Ext.override(Ext.form.ComboBox,{
		typeAhead: true,
	    autoSelect:true,
	    triggerAction: 'all',
	    mode: 'remote',
		fieldLabel :'',
		editable : false,
		forceSelection:true,
		width : 200,
		emptyText:''
	});
	
	Ext.override(Ext.form.DateField,{
		width : 200,
		editable: false,
		format:'Y-m-d'
	});
	
	Ext.override(Ext.form.TimeField,{
		width : 200,
		editable: true,
		format:'H:i', //时间格式
		minValue:'08:00', //最小时间  
		maxValue:'18:00',                      //最大时间 
		increment:1                          //时间间隔 ,单位是分钟
	});
	
	Ext.override(Ext.form.TextArea,{
		height:200
	});
	
	Ext.override(Ext.grid.GroupingView,{
		enableGroupingMenu:true,
    	groupByText:'以此列分组',
    	showGroupsText:'在分组中显示',
    	hideGroupedColumn:true,	 
    	forceFit:true,
	    groupTextTpl: '{text} ({[values.rs.length]}条数据)'
	});