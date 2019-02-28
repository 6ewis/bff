const mergeObjectWithSameId = (firstArray, secondArray) => 
  Object.values(firstArray.concat(secondArray).reduce((acc, next) => {
    acc[next.userAccount] = Object.assign(acc[next.userAccount] || {}, next); 
    return acc
  }, {}));

const resolvers = {
  Query: {
    // args: sortBy, limit, offset
    topClients: async (
      parent, args, { dataSources: { topClientsAPI, usersAPI}, userID, token}) => {
        const topClients = await topClientsAPI.GET(args, token); 
        const users = await usersAPI.GET(userID); // i need the names first name
        const mergedResponses = mergeObjectWithSameId(topClients, users); 
        return mergedResponses.map(client => client);
      } 
  }
};

export default resolvers;
