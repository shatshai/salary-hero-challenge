// Indicates whether payment date should be included in salary calculations
export const INCLUDE_PAYMENT_DATE = true;

// Enum defining different salary types - Map from Salary Type data table.
export enum SalaryTypes {
  DAILY = 1,            // Salary calculated on a daily basis
  MONTHLY = 2,          // Salary calculated on a monthly basis
  MONTH_TO_DATE = 3,    // Salary calculated from the start of the month to the current date
}
