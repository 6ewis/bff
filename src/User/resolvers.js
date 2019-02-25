import uuidv4 from 'uuid/v4';

const resolvers = {
  Query: {
    users: (parent, args, {users}) => Object.values(users),
    me: (parent, args, {me}) => me,
    user: (parent, {id}, {users, messages}) => users[id],
  },

  User: {
    // get resolve explicitly or implicitly
    username: (user) => user.username, 
    messages: (user, args, { messages }) => messages.filter(msg => msg.userId === user.id)
  },
}

export default resolvers;
