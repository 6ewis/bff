import { gql } from 'apollo-server-express';

const schema = gql`
  enum AllowedDateRangeType {
    FIXED
    CUSTOM
  }

  enum AllowedDateRange {
    FIVE_DAYS
    ONE_MONTH
    SIX_MONTH
    YEAR_TO_DATE
    ONE_YEAR
    FIVE_YEAR
  }

  enum AllowedDateIntervalUnit {
    D
    M
    Q
    S
    Y
  }

  extend type Query {
    aumHistory(
      dateRangeType: AllowedDateRangeType, 
      dateRange: AllowedDateRange, 
      dateInterval: Int,
      dateIntervalUnit: AllowedDateIntervalUnit,
      ): [AdvisorAUM!] 
  }

  type AdvisorAUM {
    date: String!
    aumValue: Float!
    marketChanged: Float!
    aumPercentage: Float!
  }
`;

export default schema;
