//this will keep track of all the available publication years
var years=[];
//this will keep track of all the types of pulic
var types=[];
//this will keep track of all the major areas
var majorAreas=[];
//this will keep track of minor areas under major areas
var minorAreas=[];

//this will save all the publication data from the backend
var Publicationdata=[];

//this will keep track of which critirea we are sorting
var sortedby = "";

//saving third drop down lists and its titel in a var
var thirdDropDown = document.getElementById('third');
var thirdDropDownTitle = document.getElementById('thirdText');
//lets make them hidden
thirdDropDown.style.display = "none";
thirdDropDownTitle.style.display = "none";


getPublications();

//default display
document.getElementById('publicationArea_').innerHTML = "<h2> Recent Publications </h2>";
for (var year=0; year < 3; year++){
	document.getElementById('publicationArea_').innerHTML += "<h3>"+ ((new Date()).getFullYear()-year) +"</h3>";
	for(var y=0;y<Publicationdata.length;y++)
	{
		//console.log(selectedValue+"="+Publicationdata[y]['year']);
		//if equals to user selected one then show
		if(Publicationdata[y]['year'] == (new Date()).getFullYear()-year)
		{
			//console.log("year loop");
			document.getElementById('publicationArea_').innerHTML += "<div class=\"publicationContent\" div=\"publicationContent_\">"+Publicationdata[y]['publication']+"</div>";
		}
	}
	
}


//lets see what user choose from the first drop down , and then show things accordingly
function firstOnchange()
{

	var value = document.getElementById('first');
	var selectedValue = value.options[value.selectedIndex].text;
	
	thirdDropDown.style.display = "none";
	thirdDropDownTitle.style.display = "none";
	
	//if Types are selected we have to change its DropDown title
	if(selectedValue== "Type")
	{
		sortedby = "Type";
		document.getElementById('secondText').innerHTML="Types:";
		//now lets add all the types to the drop down
		document.getElementById('second').innerHTML= "<option value=\"Select a type\">Select a type</option>";
		for(var loop=0;loop<types.length;loop++)
		{
			//now lets add the options to the second dropdown
			document.getElementById('second').innerHTML += "<option value=\""+types[loop] +"\">" +types[loop]+ "</option>";
		}
		
		
	}else if (selectedValue== "Area")
	{
		
		sortedby = "Area";
		thirdDropDown.style.display = "block";
		thirdDropDownTitle.style.display = "block";
		document.getElementById('secondText').innerHTML="Research areas:";
		document.getElementById('thirdText').innerHTML="Sub category:";
		//lets make sure third drop down is empty at this point
		document.getElementById('third').innerHTML= "<option value=\"Select a Sub category\">Select a Sub category</option>";
		document.getElementById('second').innerHTML= "<option value=\"Select a area\">Select a area</option>";

		//now lets add all the areas to the drop down
		for(var loop=0;loop<majorAreas.length;loop++)
		{
			//now lets add the options to the second dropdown
			document.getElementById('second').innerHTML += "<option value=\""+majorAreas[loop] +"\">" +majorAreas[loop]+ "</option>";
		}
		
		
	}else if(selectedValue== "Year")
	{
		sortedby = "Year";
		document.getElementById('secondText').innerHTML="Years:";
		//now lets add all the years to the drop down
		document.getElementById('second').innerHTML= "<option value=\"Select a year\">Select a year</option>";
		for(var loop=years.length-1;loop>=0;loop--)
		{
			//now lets add the options to the second dropdown
			document.getElementById('second').innerHTML += "<option value=\""+years[loop] +"\">" +years[loop]+ "</option>";
		}
		

	}else
	{
		document.getElementById('secondText').innerHTML="Select a sorting method first:";
		document.getElementById('second').innerHTML="";
	}
}

//adding on change event
function secondOnChange()
{
	//lets clean out the display area first
	document.getElementById('publicationArea_').innerHTML="";
	
	var value = document.getElementById('second');
	var selectedValue = value.options[value.selectedIndex].text;

	//check if we are sorting by year
	if(sortedby=="Year")
	{
		//lets clean out the display area first
		document.getElementById('publicationArea_').innerHTML="";
		//now lets add the publications
		for(var y=0;y<Publicationdata.length;y++)
		{
			//console.log(selectedValue+"="+Publicationdata[y]['year']);
			//if equals to user selected one then show
			if(Publicationdata[y]['year'] == selectedValue)
			{
				//console.log("year loop");
				document.getElementById('publicationArea_').innerHTML += "<div class=\"publicationContent\" div=\"publicationContent_\">"+Publicationdata[y]['publication']+"</div>";
			}
		}
	}else if(sortedby=="Type")
	{
		//lets clean out the display area first
		document.getElementById('publicationArea_').innerHTML="";
		//now lets add the publications
		for(var y=0;y<Publicationdata.length;y++)
		{
			//console.log(selectedValue+"="+Publicationdata[y]['type']);
			//if equals to user selected one then show
			if(Publicationdata[y]['type'] == selectedValue)
			{
				//console.log("year loop");
				document.getElementById('publicationArea_').innerHTML += "<div class=\"publicationContent\" div=\"publicationContent_\">"+Publicationdata[y]['publication']+"</div>";
			}
		}
	}else if(sortedby=="Area")
	{
		//lets empty things out before we add stuff
		document.getElementById('third').innerHTML= "<option value=\"Select a Sub category\">Select a Sub category</option>";
		//at this point we have to add things to third drop down
		//now lets add all the areas to the drop down
		var splitList=[];
		var majorPart ="";
		var minorPart="";
		for(var y=0;y<minorAreas.length;y++)
		{

				splitList = minorAreas[y].split(":");
				majorPart = splitList[0];
				minorPart = splitList[1];

			if(majorPart == selectedValue)
			{
				//console.log("DONE !");
				document.getElementById('third').innerHTML += "<option value=\""+minorPart +"\">" +minorPart+ "</option>";
			}
			
		}
	}
}


//adding on change event for third drop down
function thirdOnChange()
{
	//lets clean out the display area first
	document.getElementById('publicationArea_').innerHTML="";
	
	var value = document.getElementById('third');
	var selectedValue = value.options[value.selectedIndex].text;
	
	//now lets add the publications
		for(var y=0;y<Publicationdata.length;y++)
		{
			//console.log(selectedValue+"="+Publicationdata[y]['area']);
			//if equals to user selected one then show
			if(Publicationdata[y]['area'].split(":")[1].trim() == selectedValue)
			{
				//console.log("year loop");
				document.getElementById('publicationArea_').innerHTML += "<div class=\"publicationContent\" div=\"publicationContent_\">"+Publicationdata[y]['publication']+"</div>";
			}
		}
}

//GET request to get all the links from the database
function getPublications()
{
	var onSuccess = function(data)
	{
		/*years.push(Publicationdata[0]['year']);
		types.push(Publicationdata[0]['type']);
		var areaList=Publicationdata[0]['area'].split(":")[0];
		//check if it only has a main area
		if(areaList.length > 1)
		{
			majorAreas.push(areaList[0]);
			minorAreas.push(Publicationdata[0]['area']);
		}else
		{
			majorAreas.push(areaList[0]);
			minorAreas.push("Empty");
		}*/
		console.log(data);
		Publicationdata = data[0]['publications'];
		
		
		//get records row by row and lets create new html elements using DOM and inject them to the links.html
		for(var x=0;x<Publicationdata.length;x++)
		{
			
			if(Publicationdata[x]['year'] !=null)
			{
				//adding all the unique years
				if(years.indexOf(Publicationdata[x]['year']) == -1)
					years.push(Publicationdata[x]['year']);
			}
			
			if(Publicationdata[x]['type'] !=null)
			{
				//adding all the unique types
				if(types.indexOf(Publicationdata[x]['type']) == -1)
					types.push(Publicationdata[x]['type']);
			}
			
			
			//adding some safety features just in case fields are empty
			if(Publicationdata[x]['area'] !=null)
			{
				//adding all the unique main areas
				if(majorAreas.indexOf(Publicationdata[x]['area'].split(":")[0]) == -1)
				majorAreas.push((Publicationdata[x]['area']).split(":")[0]);

				//add all the unique minor areas
				if(minorAreas.indexOf(Publicationdata[x]['area']) == -1)
				minorAreas.push(Publicationdata[x]['area']);
			
			}

			
		}
		
		//lets sort out the years in descending order
		years.sort();
		
		console.log(majorAreas);
		console.log(minorAreas);
		
	}
	
	var onFailure = function()
	{
		console.log("Backend error");
	}
	
	makeGetRequest('publications',onSuccess,onFailure);
}