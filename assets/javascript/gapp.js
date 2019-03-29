var gifApp = {
    
    myButtons:  [
        "robots",
        "spaceships",
        "lasers",
        "aliens",
    ],
    
    ShowButtons() {
        $("#buttons-div").empty();
        for (var i=0; i < this.myButtons.length; i++) {
            var thisButton = $("<button>", {
                "class": "gif-type",
                "data-name": this.myButtons[i],
                "text": this.myButtons[i],
            });
            $("#buttons-div").append(thisButton);
        }
    },
    GetStuff(clicky) {
        // Doesn't seem to be any reason to make any of this an object parameter (yet.)
        // API key:
        var giphKey = "L7sLjq7qhLWoX1aiVK9wk6ZKhHVHbQPr";
        // Request URL:
        var searchTerm = clicky;
        var askGiphy =  "https://api.giphy.com/v1/gifs/search?q="
            + searchTerm + "&limit=10&rating=pg&api_key="
            + giphKey;
        $.ajax({
            method: "GET",
            url: askGiphy,
        }).then(function(gotBack) {
            console.log(gotBack);
            gifApp.ShowStuff(gotBack.data);
        });
    },
    ShowStuff(theReturned) {
        console.log(theReturned);
        
        for(var i =0; i < theReturned.length; i++) {
            var stillURL = theReturned[i].images.fixed_height_still.url;
            var animURL = theReturned[i].images.fixed_height.url;
            var thisGIF = $("<img>", {
                "class": "gif-yo",
                "src": stillURL,
                "data-still": stillURL,
                "data-move": animURL,
            });
            thisGIF.appendTo("#cool-gifs");
        }
    }
}