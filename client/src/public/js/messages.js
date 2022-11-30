window.onload = () => {
    createMessage('Hey, how are you?', false);
    createMessage('I am doing great, how are you?', true);
    createMessage('I am doing well, thanks', false);
    createMessage('Any weekend plans?', true);
    createMessage('I am doing nothing', false);
}

function createMessage(text, isSent) {
    const chatboxMessages = document.getElementById('chatbox-messages');
    const message = document.createElement('div');
    message.classList.add(isSent ? 'sent' : 'received', 'message');
    message.innerText = text;
    
    chatboxMessages.appendChild(message);
}