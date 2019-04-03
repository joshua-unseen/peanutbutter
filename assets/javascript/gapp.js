var gifApp = {

    topics: [
        "robots",
        "spaceships",
        "lasers",
        "aliens",
    ],
    // I don't care about the key or the search term as an object parameter, but I'll need to reference this in more than one function
    askGiphy: "",
    $gifDiv: $("#cool-gifs"),
    page: 0,
    moreBtn: $("<button id=\"more-stuff\">").addClass("btn btn-primary m-1").text("Moar Plz!"),

    ShowButtons() {
        $("#buttons-div").empty();
        for (var i = 0; i < this.topics.length; i++) {
            var thisButton = $("<button>", {
                "class": "gif-type btn btn-primary m-1",
                "data-name": this.topics[i],
                "text": this.topics[i],
            });
            $("#buttons-div").append(thisButton);
        }
    },

    BuildURL(clicky) {
        // API key:
        var giphKey = "L7sLjq7qhLWoX1aiVK9wk6ZKhHVHbQPr";
        // Set the search term:
        var searchTerm = clicky;
        // Request URL:
        this.askGiphy = "https://api.giphy.com/v1/gifs/search?q="
            + searchTerm + "&limit=10&rating=pg&api_key="
            + giphKey;
        this.$gifDiv.empty();
        this.page = 0;
        this.GetStuff(this.askGiphy);
    },
    GetStuff(reqURL) {
        $.ajax({
            method: "GET",
            url: reqURL,
        }).then(function (gotBack) {
            // console.log(gotBack);
            gifApp.ShowStuff(gotBack.data);
        });
    },
    ShowStuff(theReturned) {
        console.log(theReturned);

        for (var i = 0; i < theReturned.length; i++) {
            var rating = theReturned[i].rating;
            var stillURL = theReturned[i].images.fixed_height_still.url;
            var animURL = theReturned[i].images.fixed_height.url;
            var thisGIF = $("<img>", {
                "id": i + this.page + "gif",
                "class": "gif-yo card-img",
                "src": stillURL,
                "data-still": stillURL,
                "data-move": animURL,
                "data-state": "frozen",
            });
            var thisGIFDiv = $("<div>")
                .addClass("single-gif card")
                .html("<div class=\"card-footer\">Rating: " + rating + "</div>");
            thisGIFDiv.prepend(thisGIF);
            thisGIFDiv.appendTo(this.$gifDiv);  // I swear I'm not being intentionally confusing.  Guess it's just one of those days.
        }
        $("#request-more").append(this.moreBtn);
    },
    BuildMoreURL() {
        this.page += 10;
        var moreURL = this.askGiphy + "&offset=" + this.page;
        this.GetStuff(moreURL);
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