var animals = ["Dog", "Cat", "Mouse", "lizard"];


function displayGiphy() {
    var newGiph = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newGiph + "&api_key=PwMeU9TSAIzRVgIwqCEB2H2iiGr0d1bX&limit=10";
}


function generateButtons(){
    $("#buttons-view").empty();

    for(let i = 0; i < animals.length; i++){
        let newButton = $("<button>");
        newButton.text(animals[i]);
        newButton.attr({
            "class": "giphyButton",
            "data-name": animals[i]
        });

        $("#buttons-view").append(newButton);
    }
}

generateButtons();

$("#add-giph").on("click", function(){
    if($("#giph-input").val() !== ""){
        animals.push($("#giph-input").val().trim());
        $("#giph-input").val("");
    }   

    generateButtons();
})

$(document).on("click", ".giphyButton", function(){
    console.log($(this));
    let searchTerm = $(this)[0].dataset.name;

    let giphyView = $("#giph-view");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=PwMeU9TSAIzRVgIwqCEB2H2iiGr0d1bX&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);

        let giphyArray = response.data;

        for(let i = 0; i < giphyArray.length; i++){
            let giphyImg = $("<img>");

            giphyImg.attr({
                "class": "giphyImg",
                "data-state": "still",
                "data-still" : giphyArray[i].images.fixed_height_still.url,
                "data-animate": giphyArray[i].images.fixed_height.url,
                "src": giphyArray[i].images.fixed_height_still.url

            });

            giphyView.prepend(giphyImg);
        }
    })

});

$(document).on("click", ".giphyImg", function(){
    console.log($(this));
    let state = $(this)[0].dataset.state;

    if(state == "still"){
        $(this).attr({
            "data-state": "animate",
            "src": $(this)[0].dataset.animate
        });
    }else {
        $(this).attr({
            "data-state": "still",
            "src": $(this)[0].dataset.still
        });
    }
})