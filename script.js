var items = [];

$.ajaxPrefilter(function(options) { /* NodeJS proxy which adds CORS (Cross-Origin Resource Sharing) headers to the proxied request; 
    the additional HTTP header tells the browser that the applicaiton running at one origin (local domain) 
    has permission to access selected resources from a server at a different origin (Wikipedia) */
    if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

$.get('https://en.wikipedia.org/wiki/Main_Page', function(response) {

  var allItems = $(response).find('#mp-otd ul').first().children();
  allItems.each(function(index) {
    items.push(allItems.eq(index).text());
    });
    
    createList();
    writeDate();
});

function createList() {
    // print list
    for (var i = 0; i < items.length; i++) { // loop through data
        var bullet = document.createElement('li'); // create li element
        bullet.textContent = items[i]; // set bullet content 
        $('#list').append(bullet); // append bullet onto DOM ul element
        $('#list li').addClass("list-group-item"); // add bootstrap class
    }
}

function writeDate() {
    var today = new Date(); // get current date
    var dateStamp = document.createElement('span'); // create span element
    dateStamp.textContent = today.toDateString(); // set date stamp 
    $('#date').append(dateStamp); // append bullet onto DOM element  
}



