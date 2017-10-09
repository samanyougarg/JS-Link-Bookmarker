//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


//Save bookmark
function saveBookmark(e) {
	//Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)) {
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

   /*
	//Local Storage
	localStorage.setItem('test', 'Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	*/

	if(localStorage.getItem('bookmarks') === null) {
		//init array
		var bookmarks = [];
		//Add the bookmark to the array
		bookmarks.push(bookmark);
		//Store the bookmarks array in the local storage 
		//after making it a string which is a json
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//Get bookmarks array from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Add the new bookmark to it
		bookmarks.push(bookmark);
		//Store it back into the local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	document.getElementById('myForm').reset();

	fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();
}

function deleteBookmark(url) {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();
}

function fetchBookmarks() {
	//Get bookmarks array from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	var bookmarkResults = document.getElementById('bookmarkResults');
	bookmarkResults.innerHTML = '';

	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarkResults.innerHTML += '<div class="card card-body bg-light mb-5">'+
									 '<h3>'+name+
									 ' <a style="float: right;" class="btn btn-danger" onclick="deleteBookmark(\''+url+'\')" href="#">Delete</a> ' +									 
									 ' <a style="float: right; margin-right: 10px;" class="btn btn-primary" target="_blank" href="' + url + '">Visit</a> ' +
									 '</h3>'+
									 '</div>';

	}
}

function validateForm(siteName, siteUrl) {

	if(!siteName || !siteUrl) {
		alert('Please fill in the form.');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)){
		alert('Please use a valid url.');
		return false;
	}

	return true;
}