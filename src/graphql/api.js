import AumHistoryAPI from './AumHistory/api';
import TopClientsAPI from './TopClients/api';
import TopHoldingsAPI from './TopHoldings/api';
import UsersAPI from './Users/api';

export default {
  AumHistoryAPI: new AumHistoryAPI,
  topClientsAPI: new TopClientsAPI,
  topHoldingsAPI: new TopHoldingsAPI,
  usersAPI: new UsersAPI
};

