const resolvers = {
  AllowedDateRangeType: {
    FIXED: 'fixed',
    CUSTOM: 'custom',
  },
  AllowedDateRange: {
    FIVE_DAYS: '5D',
    ONE_MONTH: '1M',
    SIX_MONTH: '6M',
    YEAR_TO_DATE: 'YTD', // refers to the period beginning the first day of the current calendar year up to the current date
    ONE_YEAR: '1Y',
    FIVE_YEAR: '5Y',
  },
  Query: {
    // args: dateRangeType, dateRange, dateIntervalUnit, dateInterval
    aumHistory: async (parent, args, { dataSources: { AumHistoryAPI }, token }) => {
      const data = await AumHistoryAPI.GET(args, token); 
      console.log("here we go", data);
      return data.map(client => client);
    } 
  }
};

export default resolvers;
