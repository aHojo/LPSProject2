var socket = io();
$(document).ready(function(){

    $('.chat-input').on("keyup", function(event) {
        if(event.keyCode === 13){
            var d = new Date();

            var messageObj = {
                "message": $('.chat-input').val(),
                "time": d.toDateString()
            };

            $('.chat-input').val("");

            $.ajax({
                url:"/api/sendMessage",
                type: "POST",
                data: messageObj
            }).then(function(data) {
                console.log(data);
                var newMessage = $(".chat-container.active");
                var newDiv = $('<div class="bubble">')
                var message = $("<p>")
                var timeMessage = $("<p>");
                timeMessage.addClass("datestamp").text(data.time);
                message.text(data.message);
                newDiv.append(message);
                newMessage.append(newDiv).append(timeMessage);

                showUI(newMessage);

            });

         }

         socket.on('call progress event', function(call) {
             console.log(call);
         });


        
    });
    
    // $.ajax({
    //     url:"/api/sms",
    //     type: "POST",
    // }).then(function(data) {
    //     console.log(data);
    //     // var newMessage = $(".chat-container.active");
    //     // var newDiv = $('<div class="bubble">')
    //     // var message = $("<p>")
    //     // var timeMessage = $("<p>");
    //     // timeMessage.addClass("datestamp").text(data.time);
    //     // message.text(data.message);
    //     // newDiv.append(message);
    //     // newMessage.append(newDiv).append(timeMessage);
    //     // console.log(newMessage);

    //     // showUI(newMessage);

    // });
    
});

