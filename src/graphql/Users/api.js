import { RESTDataSource } from 'apollo-datasource-rest';

export default class UsersAPI extends RESTDataSource {
  get baseURL() {
    return `${this.context.env}/api/advisors/`;
  }

  async GET(userID) {
    return this.get(`${userID}/clients`);
  }
}
