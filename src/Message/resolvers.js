import uuidv4 from 'uuid/v4';

const resolvers = {
  Query: {
    messages: (parent, args, {messages}) => messages,
    message: (parent, {id}, {messages}) => messages[id]
  },

  Message: {
    user: (message, args, { users }, info) => { 
      return users[message.userId]
    }
  },

  Mutation:  {
    deleteMessage: (message, { id }, { messages }, info) => {
      if (messages[id] === false) { return false }
      messages = messages.filter(msg => (msg.id !== id));
      return true;
    },
    createMessage: (parent, { text }, { messages, me, users } ) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id
      };

      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message
    } 
  }
}

export default resolvers;
