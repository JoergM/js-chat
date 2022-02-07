const TYPE_SYSTEM = 'system';
const TYPE_USER = 'user';

const createMessage = (textBody, type, sender) => ({
  textBody,
  type,
  sender,
  render: renderMessage,
});

let messages = [
  createMessage('Lisa enters the chat', TYPE_SYSTEM),
  createMessage('Paul enters the chat', TYPE_SYSTEM),
  createMessage('Hello!', TYPE_USER, 'Paul'),
  createMessage('Hello Paul! How are you?', TYPE_USER, 'Lisa'),
  createMessage("Hi Lisa, i'm fine, thanks. How are you?", TYPE_USER, 'Paul'),
];

function renderMessage() {
  let formattedMessage = '';

  if (this.type === TYPE_SYSTEM) {
    formattedMessage = '...' + this.textBody + '...';
  } else {
    formattedMessage = `${this.sender}: ${this.textBody}`;
  }

  return formattedMessage;
}

function sendMessage(message) {
  console.log(message);
  message.render && console.log(message.render());
}

//of loop
for (let message of messages) {
  sendMessage(message);
}

//in loop
for (let i in messages) {
  sendMessage(messages[i]);
}

//forEach
messages.forEach((m) => sendMessage(m));

//forEach Shorthand
messages.forEach(sendMessage);

//get Chat Members
let chatMembers = new Set(
  messages.filter((m) => m.type !== TYPE_SYSTEM).map((m) => m.sender)
);

console.log(chatMembers);

//count Words
let words = {};
messages.forEach((m) => {
  if (m.sender) {
    words[m.sender] = (words[m.sender] ?? 0) + m.textBody.split(' ').length;
  }
});

console.log(words);
