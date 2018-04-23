//Client

// Make connection
var name= prompt("What's your name?");
while(name==""){
	name=prompt("You have to choise a name. \n What's your name?")
}
var socket = io.connect('ws://localhost:4000');
// Query DOM
var message = document.getElementById('message'),
    sender = document.getElementById('sender'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');
sender.innerHTML=name;  sender.value=name;

// Emit events
btn.addEventListener('click', function(){
    if (message.value!="" ){	
	    socket.emit('chat', {
		message: message.value,
	    sender: sender.value,
	    });
	    message.value = "";
    }
});

message.addEventListener('keypress', function(){
    socket.emit('typing',  sender.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
