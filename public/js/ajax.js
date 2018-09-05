var socket = io();
// io.connect('http://c98a1cd3.ngrok.io');
$(document).ready(function () {
	$.ajax({
		url: "/api/contacts",
		type: "GET"
	}).then(function (data) {
		var list = $("#inputGroupSelect01");
		list.html("");
		var option = $("<option>");
		option.attr("selected");
		option.html("Select A Contact To Currently Chat");
		list.append(option);
		console.log(data);

		options(data)
			.then(function (data) {
				console.log(data);
				for (var i = 0; i < data.length; i++) {
					list.append(data[i]);
				}
			});
	});

	$(".chat-input").on("keyup", function (event) {
		if (event.keyCode === 13) {
			var d = new Date();
			var messageObj = {
				message: $(".chat-input").val(),
				time: d.toDateString(),
				name: $(".user-profile.active").attr("data-name"),
				num: $(".user-profile.active").attr("data-number")
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
				timeMessage.addClass("datestamp").html(data.fromNum);
				message.html(data.sent);
				newDiv.append(message);
				newMessage.append(newDiv).append(timeMessage);
				showUI(newMessage);
			});
		}
	});
	$(".submit").on("click", function () {
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
	function options(data) {
		var options = [];
		for (var i = 0; i < data.length; i++) {
			var contacts = $("<option>");
			contacts.attr("value", parseInt(i));
			contacts.attr("data-name", data[i].name);
			contacts.attr("data-number", data[i].number);
			contacts.html("<a class=\"contValue\">" + data[i].name + " | " + data[i].number + "</a>");
			options.push(contacts);
		}
		$(".custom-select").change(function () {
			var value = $(this).find("option:selected").attr("data-number");
			console.log(value);
			var names = $(this).find("option:selected").attr("data-name");
			console.log(names);
			$(".chat-header").append("<div class=\"user-profile\">" + "<h3 class=\"bubbleName\">" + names + "</h3>" + "</div>");
		});

		$(".custom-select").change(function() {
            var value = $(this).find("option:selected").attr("data-number");
			console.log(value);

			var names = $(this).find("option:selected").attr("data-name");
			console.log(names);

			$(".chat-header").append("<div class=\"user-profile\">" + "<h3 class=\"bubbleName\">" + names + "</h3>" + "</div>");
			
			$(".user-profile").attr({
				"name" : names,
				"number" : value
			});

			

			


		});
		
		return new Promise(function(resolve, reject) {
			resolve(options);
		});
	}
});