var superheroes = ["Superman","Iron Man","The Joker","Batman","Wonder Woman","Wolverine"];



function renderButtons (){

	$("#buttons-view").empty();

	for(var i = 0; i < superheroes.length; i++){
		var createButton = $("<button>");
		createButton.addClass("characters btn btn-default");
		createButton.attr("char-name",superheroes[i]);
		createButton.text(superheroes[i]);
		$("#buttons-view").append(createButton);	
	}
}

$("#add-character").on("click", function(event){
		event.preventDefault();
		var character = $("#character-input").val().trim();
		superheroes.push(character);
		renderButtons();
});

$(document).on("click", "button", function() {
	event.preventDefault();
      var charName = $(this).attr("char-name");
      $("#column1").empty();
      $("#column2").empty();
      $("#column3").empty();

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        charName + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	var results = response.data;

    	for(var i = 0; i < results.length; i++) {
				var gifDiv = $("<div class='item'>");
				var rating = results[i].rating;
				var p = $("<p>").text("Rating: " + rating);
				var charImage = $("<img>");
				charImage.attr("src", results[i].images.fixed_height.url);
				gifDiv.append(p);
				gifDiv.append(charImage);

				var c1Length = $("#column1").children().length;
				var c2Length = $("#column2").children().length;
				var c3Length = $("#column3").children().length;


				if(c1Length <= 2){
					$("#column1").prepend(gifDiv);
				} else if (c2Length <= 2){
					$("#column2").prepend(gifDiv);
				} else if (c3Length <=2) {
					$("#column3").prepend(gifDiv);
				}
				console.log(c1Length);
			}
        });
    });

renderButtons();

// console.log(superheroes);