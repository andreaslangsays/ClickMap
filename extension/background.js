CM.Background = JW.Model.extend({
	init: function(config)
	{
		this._super(config);
		
		chrome.extension.onRequest.addListener(this._onRequest.inScope(this));
	},
	
	getTabAction: function(request, sender)
	{
		return {
			tab: sender.tab
		};
	},
	
	_onRequest: function(request, sender, sendResponse)
	{
		sendResponse(this[request.action + "Action"](request, sender));
	}
});

$(function() {
	window._cmBackground = new CM.Background();
});
