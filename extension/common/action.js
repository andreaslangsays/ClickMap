CM.Action = JW.Action.extend({
	type		: "GET",
	dataType	: "json"
});

CM.Action.baseUrl = "http://lilo.su/";

CM.Action.addClick = new CM.Action({
	url		: CM.Action.baseUrl + "addclick.php",
	
	data: {
		url		: null,		// [required] String
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

CM.Action.getClicks = new CM.Action({
	url		: CM.Action.baseUrl + "getclicks.php",
	
	data: {
		url		: null		// [required] String
	},
	
	schema: {
		"classes": {
			"Result": {
				"provider"	: "Object",
				"fields"	: {
					"clicks": {
						"provider"	: "Array",
						"item"		: "Click"
					}
				}
			},
			
			"Click": {
				"provider"	: "Object",
				"item"		: {
					"x"			: "Integer",
					"y"			: "Integer",
					"w"			: "Integer"
				}
			}
		}
	}
});
