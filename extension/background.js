CM.Background = JW.Model.extend({
	init: function(config)
	{
		this._super(config);
		
		chrome.extension.onRequest.addListener(this._onRequest.inScope(this));
		chrome.pageAction.onClicked.addListener(this._onPageActionClicked.inScope(this));
	},
	
	getTabAction: function(request, sender)
	{
		return {
			tab: sender.tab
		};
	},
	
	showPageActionAction: function(request, sender)
	{
		chrome.pageAction.show(sender.tab.id);
	},
	
	_onRequest: function(request, sender, sendResponse)
	{
		sendResponse(this[request.action + "Action"](request, sender));
	},
	
	_onPageActionClicked: function(tab)
	{
		chrome.tabs.sendRequest(tab.id, {
			action: "toggleClickMap"
		});
	}
});

$(function() {
	window._cmBackground = new CM.Background();
});
