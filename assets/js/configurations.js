// var baseURL = 'https://nsl-database.herokuapp.com/api/';
//var baseURL = 'http://127.0.0.1:5000/api/';
var baseURL = 'http://localhost:8000/assets/json/'

function fullMonth(month)
{
	switch(month)
	{
	case "01": return "January";
	case "02": return "February";
	case "03": return "March";
	case "04": return "April";
	case "05": return "May";
	case "06": return "June";
	case "07": return "July";
	case "08": return "August";
	case "09": return "September";
	case "10": return "October";
	case "11": return "November";
	case "12": return "December";
	}
}

function GMTtoDate(date)
{
	var day= date.split("-");
	return fullMonth(day[1])+' '+day[2]+", "+day[0];

}

  
  
// Template POst request Ajax call
var makePostRequest = function(url, data, onSuccess, onFailure) {
        $.ajax({
			async:false,
            type: 'POST',
            url: baseURL + url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };
	
	
// Template Delete request Ajax call
var makeDeleteRequest = function(url, data, onSuccess, onFailure) {
        $.ajax({
			async:false,
            type: 'DELETE',
            url: baseURL + url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };	
	
// Template GET request Ajax call
   var makeGetRequest = function(url, onSuccess, onFailure) {
       $.ajax({
		   async:false,
           type: 'GET',
           url: baseURL + url,
           contentType: "application/json",
           dataType: "json",
           success: onSuccess,
           error: onFailure
       });
   };