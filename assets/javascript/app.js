var animals = ["Dog", "Cat", "Mouse", "lizard"];


function displayGiphy() {

    var newGiph = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newGiph + "&api_key=4NWQSXVMf0vi6WcWVDdWRahL40ABo8Qn&limit=10";
