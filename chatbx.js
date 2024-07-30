document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (messageText) {
        // Create the message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');
        messageElement.textContent = messageText;

        // Add the message to the chat box
        document.getElementById('messages').appendChild(messageElement);
        
        // Clear the input field
        messageInput.value = '';
        
        // Automatically reply to the message (for demonstration)
        // setTimeout(receiveMessage, 1000, messageText);
    }
}

function receiveMessage(text) {
    // Create the reply message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'received');
    messageElement.textContent = "Reply: " + text;

    // Add the reply message to the chat box
    document.getElementById('messages').appendChild(messageElement);

    // Scroll to the bottom of the chat box
    const chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleFileUpload(event) {
    const files = event.target.files;
    for (let file of files) {
        const fileReader = new FileReader();
        
        fileReader.onload = function(e) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'sent');
            
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                img.addEventListener('click', function() {
                    showModal(e.target.result);
                });
                messageElement.appendChild(img);
            } else if (file.type === 'application/pdf') {
                const link = document.createElement('a');
                link.href = e.target.result;
                link.textContent = 'View PDF';
                link.target = '_blank';
                messageElement.appendChild(link);
            } else if (file.type === 'text/plain') {
                const textContent = document.createElement('p');
                textContent.textContent = e.target.result;
                messageElement.appendChild(textContent);
            } else {
                const link = document.createElement('a');
                link.href = e.target.result;
                link.textContent = `Download ${file.name}`;
                link.download = file.name;
                messageElement.appendChild(link);
            }

            document.getElementById('messages').appendChild(messageElement);
        };

        if (file.type.startsWith('image/') || file.type === 'application/pdf' || file.type === 'text/plain') {
            fileReader.readAsDataURL(file);
        } else {
            fileReader.readAsArrayBuffer(file);
        }
    }

    // Scroll to the bottom of the chat box
    const chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showModal(imageSrc) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const close = document.getElementsByClassName('close')[0];

    modal.style.display = "block";
    modalImg.src = imageSrc;

    close.onclick = function() {
        modal.style.display = "none";
    };

    modal.onclick = function() {
        modal.style.display = "none";
    };
}
