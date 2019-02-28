import { RESTDataSource } from 'apollo-datasource-rest';

export default class TopHoldingsAPI extends RESTDataSource {
  get baseURL() {
    return `${this.context.env}/api/analytic/`;
  }

  async GET(args, token) {
    const { limit, sortBy, offset } = args;
    return this.post(
     'top-holdings', // path
      {
        sortMethod: sortBy || 'securityName',
        resultLimit: limit || 5,
        offset: offset || 0,
      }, // request body
    );
  }
}
