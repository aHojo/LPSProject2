$(document).ready(function () {
	$(".chat-header").on("click", ".user-profile",function () {
		if (!$(this).hasClass("active")) {

			$(".user-profile.active").removeClass("active");
			$(this).addClass("active");
			var temp = $("#" + $(this).attr("data-number"));
			temp.empty();
			
			$.ajax({
				url: "/api/chat/" + $(this).attr("data-number"),
				type: "GET",
			}).then(function (data) {
				console.log(data);
				
				// var newMessage = $(".chat-container.active");
				// var newDiv;
				var timeMessage;
				
				for(let i = 0; i < data.length; i ++) {
					if(data[i].bubbleAlt){
						var newDiv = $("<div class='bubble bubble-alt'>");
						var timeMessage = $("<p>");
						timeMessage.addClass("datestamp dt-alt").text(data[i].number);
						var message = $("<p>");
						message.html(data[i].text);
						newDiv.append(message);
						temp.append(newDiv).append(timeMessage);
					} else {
						var newDiv = $("<div class='bubble'>");
						var timeMessage = $("<p>");
						timeMessage.addClass("datestamp").html(data[i].from);
						var message = $("<p>");
						message.html(data[i].text);
						newDiv.append(message);
						temp.append(newDiv).append(timeMessage);
					}
				}
					hideUI(".chat-container");
					showUI(temp);
			});

			// hideUI(".chat-container");
			// showUI("#" + $(this).attr("data-number"));
			temp.addClass("active").removeClass("hidechat");
			temp.prevAll(".chat-container").addClass("hidechat").removeClass("active");
			temp.nextAll(".chat-container").removeClass("active").removeClass("hidechat");
		}
	});
});

function showUI(ele) {
	console.log($(ele));
	var kids = $(ele).children(), temp;
	for (var i = kids.length - 1; i >= 0; i--) {
		temp = $(kids[i]);

		if (temp.is("div")) {
			temp.animate({
				marginTop: 0,
			}, 400).css({ opacity: 1 }).fadeIn();
		}
		else {
			temp.css({ opacity: 1 }).fadeIn();
		}
	}
}

function hideUI(ele) {
	console.log($(ele));
	var kids = $(ele).children(), temp;
	for (var i = kids.length - 1; i >= 0; i--) {
		temp = $(kids[i]);

		if (temp.is("div")) {
			temp.animate({
				marginTop: "30px",
			}).css({ opacity: 0 });
		}
		else {
			temp.css({ opacity: 0 });
		}
	}
}