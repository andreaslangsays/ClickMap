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
