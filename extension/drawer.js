CM.Drawer = JW.Model.extend({
	tab					: null,		// [readonly] Tab
	clicks				: null,		// [readonly] Map from w to Array of clicks
	
	getClicksRequest	: null,		// [readonly] JW.Request
	
	mapView				: null,		// [readonly] CM.Drawer.Map
	
	init: function(config)
	{
		this._super(config);
		
		this._initGetClicksRequest();
		
		chrome.extension.onRequest.addListener(this._onRequest.inScope(this));
		
		chrome.extension.sendRequest({
			action: "getTab"
		}, this._onGetTabId.inScope(this));
	},
	
	toggleClickMapAction: function()
	{
		if (this.mapView)
			this.hideClickMap();
		else
			this.showClickMap();
	},
	
	showClickMap: function()
	{
		this.mapView = new CM.Drawer.Map({
			clicks		: this.clicks,
			renderTo	: document.body
		});
		
		this.mapView.update();
	},
	
	hideClickMap: function()
	{
		this.mapView.destroy();
		delete this.mapView;
	},
	
	_initGetClicksRequest: function()
	{
		this.getClicksRequest = CM.Action.getClicks.createRequest();
		this.getClicksRequest.bind("success", this._onGetClicksSuccess, this);
	},
	
	_initClicks: function(clicks)
	{
		this.clicks = {};
		for (var i = 0; i < clicks.length; ++i)
		{
			var click = clicks[i];
			this.clicks[click.width] = this.clicks[click.width] || [];
			this.clicks[click.width].push(click);
		}
	},
	
	_initPageAction: function()
	{
		chrome.extension.sendRequest({
			action: "showPageAction"
		});
	},
	
	_onGetTabId: function(response)
	{
		this.tab = response.tab;
		this.getClicksRequest.load({ url: this.tab.url });
	},
	
	_onGetClicksSuccess: function(event, response)
	{
		var clicks = response.result.clicks;
		if (JW.isEmpty(clicks))
			return;
		
		this._initClicks(clicks);
		this._initPageAction();
	},
	
	_onRequest: function(request, sender, sendResponse)
	{
		sendResponse(this[request.action + "Action"](request, sender));
	}
});

$(function() {
	window._cmDrawer = new CM.Drawer();
});
