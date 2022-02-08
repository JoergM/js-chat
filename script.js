class Message {
  constructor(textBody) {
    this.textBody = textBody;
  }

  render() {
    return `${this.textBody}`;
  }
}

class SystemMessage extends Message {
  constructor(textBody) {
    super(textBody);
  }

  render() {
    return `... ${this.textBody} ...`;
  }
}

class UserMessage extends Message {
  constructor(textBody, sender) {
    super(textBody);
    this.sender = sender;
  }
  render() {
    return `${this.sender}: ${this.textBody}`;
  }
}

const initialMessages = [
  new SystemMessage('Lisa enters the chat'),
  new SystemMessage('Paul enters the chat'),
  new UserMessage('Hello!', 'Paul'),
  new UserMessage('Hello Paul! How are you?', 'Lisa'),
  new UserMessage("Hi Lisa, i'm fine, thanks. How are you?", 'Paul'),
];

class Chat {
  constructor() {
    this.messages = [];
  }

  sendMessage(message) {
    this.messages.push(message);
    console.log(message);
    message.render && console.log(message.render());
  }

  get membersOfUserMsgs() {
    return new Set(
      this.messages
        .map((message) => message.sender)
        .filter((member) => member !== undefined)
    );
  }

  get memberNames() {
    return Array.from(this.membersOfUserMsgs);
  }

  get wordsPerMember() {
    return this.messages.reduce((wordsPerMember, message) => {
      const { sender, textBody } = message;
      const wordCount = textBody.split(' ').length;
      sender &&
        (wordsPerMember[sender]
          ? (wordsPerMember[sender] += wordCount)
          : (wordsPerMember[sender] = wordCount));

      return wordsPerMember;
    }, {});
  }
}

let chat = new Chat();

initialMessages.forEach((message) => chat.sendMessage(message));
console.log('Member names: ', chat.memberNames);
console.log('Words per Member: ', chat.wordsPerMember);
