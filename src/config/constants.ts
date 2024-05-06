// Indicates whether payment date should be included in salary calculations
export const INCLUDE_PAYMENT_DATE = true

// Enum defining different salary types
export enum SalaryTypes {
  DAILY = 1, // Salary calculated on a daily basis
  MONTHLY = 2, // Salary calculated on a monthly basis
  MONTH_TO_DATE = 3, // Salary calculated from the start of the month to the current date
}

// Salary Types Description
export const SalaryTypesDescription = {
  [SalaryTypes.DAILY]: 'Daily rate',
  [SalaryTypes.MONTHLY]: 'Monthly rate',
  [SalaryTypes.MONTH_TO_DATE]: 'Monthly rate with payment date',
}
