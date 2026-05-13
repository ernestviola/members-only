const message = document.getElementById('newMessage');
console.log(message);
const messageCount = document.getElementById('message-count');

message.addEventListener('input', (e) => {
  messageCount.textContent = e.target.value.length;
});
