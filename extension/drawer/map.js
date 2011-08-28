CM.Drawer.Map = JW.Component.extend({
	clicks			: null,		// [required] Dictionary from width to Array
	
	windowEl		: null,		// [readonly] jQuery element
	resizeHandler	: null,		// [readonly] Function
	
	render: function()
	{
		this._super();
		
		this.el = $(this.templates.main);
		
		this.windowEl = $(window);
		this.resizeHandler = this._onResize.inScope(this);
		
		this.windowEl.bind("resize", this.resizeHandler);
	},
	
	destroyComponent: function()
	{
		this.windowEl.unbind("resize", this.resizeHandler);
		
		this._super();
	},
	
	update: function()
	{
		var w = this.windowEl.width();
		var h = this.windowEl.height();
		
		this.el.empty();
		
		var clicks = this.clicks[w];
		for (var i = 0; i < clicks.length; ++i)
		{
			var click = clicks[i];
			var el = $(this.templates.click);
			el.css({
				left	: click.x - 7,
				top		: click.y - 7
			});
			
			this.el.append(el);
		}
		
		this.el.css({
			width	: w,
			height	: h
		});
	},
	
	_onResize: function(event)
	{
		this.update();
	}
});

JW.Component.template(CM.Drawer.Map, {
	main	: '<div class="cm-drawer-map"></div>',
	click	: '<div class="cm-drawer-click"></div>'
});
