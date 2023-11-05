// ask for topic
var topic = prompt("What would you like to watch gifs of?")
url_transform(topic);

//convert the URL
function url_transform(input){
    //set a random option
    if (input == "random"){
        var random_url = "http://api.giphy.com/v1/gifs/trending?api_key=26AXbkE9HUdleG4eGKwgMTU5XCMggwOJ"
        console.log(random_url);
        var GiphyAJAXCall = new XMLHttpRequest();
        GiphyAJAXCall.open( 'GET', random_url );
        GiphyAJAXCall.send();

        GiphyAJAXCall.addEventListener('load', function(e){
            var data = e.target.response;
            console.log(data);
            pushtoDOM(data);
        });
    }
    var search_item = input.split(" ").join("+")
    var url= "http://api.giphy.com/v1/gifs/search?q=" + search_item + "&api_key=26AXbkE9HUdleG4eGKwgMTU5XCMggwOJ"

    console.log(url);

// AJAX Request aka getting the data
    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open( 'GET', url );
    GiphyAJAXCall.send();


    GiphyAJAXCall.addEventListener('load', function(e){
        var data = e.target.response;
        console.log(data);
        pushtoDOM(data);
    });
}

//parse the data
function pushtoDOM(input){
    var response = JSON.parse(input);
    console.log(response);

    var imageURLs = response.data;
    console.log(imageURLs);
    var container = document.querySelector(".js-container");
    //display the data

    var index=0;
    function waitanddisplay() {
        if (index < imageURLs.length) {
            var images = imageURLs[index];
            var src = images.images.fixed_height.url
            console.log(src);

            container.innerHTML = "<img src=\"" + src + "\" class='container-image\'>"
            index++;

            setTimeout(waitanddisplay, 5000);
        }
    }

    waitanddisplay();
}


