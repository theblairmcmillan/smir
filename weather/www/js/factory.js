
app.factory("currentCity", function() {

	var currentCity;

	return {
		setCurrentCity: function(city) {
			currentCity = city;
		},
		getCurrentCity: function() {
			return currentCity;
		}
	};

});