export interface CategoryTypes {
  _id: string;
  name: string;
  __v: number;
}

export interface GameItemTypes {
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BanksTypes {
  _id: string;
  name: string;
  bankName: string;
  noRekening: string;
}

export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BanksTypes[];
}

export interface NominalTypes {
  _id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface UserTypes {
  email: string;
  name: string;
  username: string;
  avatar: string;
  id: string;
}

export interface JWTPayloadsTypes {
  player: UserTypes;
  iat: string;
}

export interface SignUpTypes {
  email: string;
  name: string;
  username: string;
  password: string;
  role: string;
  status: string;
  avatar: string;
  favorite: string;
}

export interface checkoutTypes {
  voucher: string;
  nominal: string;
  payment: string;
  bank: string;
  name: string;
  accountUser: string;
}

export interface HistoryVoucherTopUpTypes {
  category: string;
  coinName: string;
  coinQuantity: string;
  gameName: string;
  price: string;
  thumbnail: string;
  id: string;
}

export interface HistoryPaymentTypes {
  bankName: string;
  name: string;
  noRekening: string;
  type: string;
}

export interface historyTransactionsTypes {
  _id: string;
  historyVoucherTopup: HistoryVoucherTopUpTypes;
  value: number;
  status: string;
  name: string;
  accountUser: string;
  tax: number;
  historyPayment: HistoryPaymentTypes;
}

export interface HistoryTopUpCatgoriesTypes {
  _id: string;
  value: number;
  name: string;
}
