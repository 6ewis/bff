import { RESTDataSource } from 'apollo-datasource-rest';

export default class AUMHistoryAPI extends RESTDataSource {
  get baseURL() {
    return `${this.context.env}/api/analytic/`;
  }

  async GET(args, token) {
    const { 
      dateRangeType, 
      dateRange, 
      dateIntervalUnit, 
      dateInterval 
    } = args;
    return this.post(
     'advisor-aum', // path
      {
        dateRangeType: dateRangeType || 'fixed',
        dateRange: dateRange || '5D',
        dateInterval: dateInterval || 0,
        dateIntervalUnit: dateIntervalUnit || 'D'
      }, // request body
    );
  }
}
