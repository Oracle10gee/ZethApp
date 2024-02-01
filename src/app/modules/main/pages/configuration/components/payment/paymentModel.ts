export interface multiplePayment {
    id: number,
    feeName: string,
    amount: string,
    accountNo: string
  };

  export interface splitPayment{
    id: number,
    feeName: string,
    value: string,
    accountNo: string
  }