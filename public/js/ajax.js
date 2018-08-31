var socket = io();
// io.connect('http://c98a1cd3.ngrok.io');
$(document).ready(function () {

	$(".chat-input").on("keyup", function (event) {
		if (event.keyCode === 13) {
			var d = new Date();

			var messageObj = {
				message: $(".chat-input").val(),
				time: d.toDateString(),
				name: $(".user-profile.active").attr("data-name")
			};

			$(".chat-input").val("");

			$.ajax({
				url: "/api/sendMessage",
				type: "POST",
				data: messageObj
			}).then(function (data) {
				console.log(data);
				var newMessage = $(".chat-container.active");
				var newDiv = $("<div class='bubble'>");
				var message = $("<p>");
				var timeMessage = $("<p>");
				timeMessage.addClass("datestamp").text(data.time);
				message.text(data.message);
				newDiv.append(message);
				newMessage.append(newDiv).append(timeMessage);

				showUI(newMessage);

			});

		}

	});

	$(".submit").on("click", function() {
		event.preventDefault();

		var contact = {
			name: $("#name").val().trim(),
			number: $("#number").val().trim()
		};

		$("#name").val("");
		$("#number").val("");
		$.ajax({
			url: "/api/storeNumber",
			type: "POST",
			data: contact
		}).then(function (data) {
			console.log(data);
		});
		
	});

	socket.on("text", function (call) {
		console.log(call.messageBody);
		console.log(call.from);
		var newMessage = $(".chat-container.active");
		var newDiv = $("<div class='bubble bubble-alt'>");
		var message = $("<p>");
		var timeMessage = $("<p>");
		timeMessage.addClass("datestamp dt-alt").text(call.from);
		message.text(call.messageBody);
		newDiv.append(message);
		newMessage.append(newDiv).append(timeMessage);

		showUI(newMessage);
	});

});

