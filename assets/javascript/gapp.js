var gifApp = {
    
    topics:  [
        "robots",
        "spaceships",
        "lasers",
        "aliens",
    ],
    $gifDiv: $("#cool-gifs"),
    
    ShowButtons() {
        $("#buttons-div").empty();
        for (var i=0; i < this.topics.length; i++) {
            var thisButton = $("<button>", {
                "class": "gif-type",
                "data-name": this.topics[i],
                "text": this.topics[i],
            });
            $("#buttons-div").append(thisButton);
        }
    },

    GetStuff(clicky) {
        // Doesn't seem to be any reason to make any of this an object parameter (yet.)
        // API key:
        var giphKey = "L7sLjq7qhLWoX1aiVK9wk6ZKhHVHbQPr";
        // Set the search term:
        var searchTerm = clicky;
        // Request URL:
        var askGiphy =  "https://api.giphy.com/v1/gifs/search?q="
            + searchTerm + "&limit=10&rating=pg&api_key="
            + giphKey;
            this.$gifDiv.empty();
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
            var rating = theReturned[i].rating;
            var stillURL = theReturned[i].images.fixed_height_still.url;
            var animURL = theReturned[i].images.fixed_height.url;
            var thisGIF = $("<img>", {
                "id": i + "gif",
                "class": "gif-yo",
                "src": stillURL,
                "data-still": stillURL,
                "data-move": animURL,
                "data-state": "frozen",
            });
            var thisGIFDiv = $("<div class=\"single-gif\">").html("<p>Rating: "+ rating +"</p>");
            thisGIFDiv.prepend(thisGIF);
            thisGIFDiv.appendTo(this.$gifDiv);  // Okay, now I'm just being intentionally confusing.  Guess it's one of those days.
        }
    },

    GifIt(clicky) {
        // Switches the GIFs from still to animating and back on click.
        // Maybe I shouldn't have given the variables the same names as the data-state values...
        var thisGIF = $("#" + clicky);
        var frozen = thisGIF.attr("data-still");
        var moving = thisGIF.attr("data-move");
        switch (thisGIF.attr("data-state")) {
            case "frozen":
                thisGIF.attr("src", moving);
                thisGIF.attr("data-state", "moving")
                break;
                case "moving":
                thisGIF.attr("src", frozen);
                thisGIF.attr("data-state", "frozen")
                break;
            default:
                break;
        }
    },

    NewButton(category) {
        console.log(category);
        
        this.topics.push(category);
        this.ShowButtons();
    },
}