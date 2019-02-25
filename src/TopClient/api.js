// const { RESTDataSource } = require('apollo-datasource-rest');
import { RESTDataSource } from 'apollo-datasource-rest';

export default class TopClientsAPI extends RESTDataSource {
  constructor() {
    super();
    // use environment variable for local and dev
    this.baseURL = 'http://localhost:3000/api/analytic/top-clients';
  }

  async getTopClients(args) {
    return this.post(
     'top-clients', // path
      args, // request body
    );
  }

 // If we decide to use GET
 // GET is cachable but POST is not
 // async getTopClients(args) {
 //   const data = await this.get('top-clients', args);
 //   console.log("the data is", data);
 //   return data.results;
 // }
}
