const socket = io.connect(window.location.href);

const sendButton = document.getElementById('send');
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

sendButton.addEventListener('click',  (e) => {
    socket.emit('chat', {
        'handle': handle.value,
        'message': message.value
    });
    message.value = "";
});

message.addEventListener('keypress', (e) => {
        socket.emit('typing', {
            'handle': handle.value,
        });
});

message.addEventListener('change', (e) => {
    if (message.value.trim() === '') {
        socket.emit('clearFeedBack');
    }
});

socket.on('chatData', (data) => {
    clearFeedBack();
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typingData', (data) => {
    feedback.innerHTML = '<p><em>' + data + '</em></p>';
});

socket.on('clearFeedBack', () => {
    clearFeedBack();
});

function clearFeedBack(){
    feedback.innerHTML = '';
}