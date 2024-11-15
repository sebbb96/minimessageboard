const express = require('express');
const path = require('node:path');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    id: 1,
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    id: 2,
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];
function getMessageById(messageId) {
  const message = messages.find((message) => message.id === Number(messageId));
  return message;
}
app.get('/', (req, res) => {
  res.render('index', { messages: messages });
});
app.post('/new', (req, res) => {
  const { messageText, messageAuthor } = req.body;
  messages.push({
    id: messages.length + 1,
    text: messageText,
    user: messageAuthor,
    added: new Date(),
  });
  res.redirect('/');
});
app.get('/:messageId', (req, res) => {
  const { messageId } = req.params;
  const messageDetails = getMessageById(messageId);
  res.render('msgDetails', { messageDetails: messageDetails });
});
const PORT = 3000;
app.listen(PORT, () => console.log('STARTED:', PORT));
