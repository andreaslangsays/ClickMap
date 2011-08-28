CM.Drawer = JW.Model.extend({
	tab					: null,		// [readonly] Tab
	clicks				: null,		// [readonly] Map from w to Array of clicks
	
	getClicksRequest	: null,		// [readonly] JW.Request
	
	init: function(config)
	{
		this._super(config);
		
		this._initGetClicksRequest();
		
		chrome.extension.sendRequest({
			action: "getTab"
		}, this._onGetTabId.inScope(this));
	},
	
	_initGetClicksRequest: function()
	{
		this.getClicksRequest = CM.Action.getClicks.createRequest();
		this.getClicksRequest.bind("success", this._onGetClicksSuccess, this);
	},
	
	_onGetTabId: function(response)
	{
		this.tab = response.tab;
		this.getClicksRequest.load({ url: this.tab.url });
	},
	
	_onGetClicksSuccess: function(response)
	{
		this.clicks = response.result.clicks;
	}
});

$(function() {
	window._cmDrawer = new CM.Drawer();
});
