const resolvers = {
  Query: {
    // args: sortBy, limit, offset
    topHoldings: async (parent, args, { dataSources: { topHoldingsAPI }, token }) => {
      const data = await topHoldingsAPI.GET(args, token); 
      return data.map(client => client);
    } 
  }
};

export default resolvers;
