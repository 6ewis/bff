const resolvers = {
  Query: {
    // args: sortBy, limit, offset
    topClients: (parent, args, { dataSources: { topClientsAPI} }) => {
      return topClientsAPI.getTopClients(args); 
    } 
  }
};

export default resolvers;
