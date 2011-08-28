CM.Action.addClick = new CM.Action({
	url		: CM.Action.baseUrl + "addclick.php",
	
	data: {
		x		: 0,		// [required] Integer
		y		: 0,		// [required] Integer
		w		: 0			// [required] Integer
	},
	
	schema: {
		"classes": {
			"Result": "Null"
		}
	}
});
