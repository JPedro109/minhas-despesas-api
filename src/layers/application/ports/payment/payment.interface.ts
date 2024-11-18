import { PaymentCurrencyEnum } from "./payment-currency.enum";

export interface IPayment {
    createCustomer(email: string): Promise<string>;
    updateCustomerEmailByCustomerId(customerId: string, email: string): Promise<void>;
    deleteCustomer(customerId: string): Promise<void>;
    createPaymentMethod(customerId: string, paymentMethodId: string): Promise<void>;
    deletePaymentMethodByToken(token: string): Promise<void>;
    pay(customerId: string, paymentMethodId: string, amount: number, currency: PaymentCurrencyEnum): Promise<void>;
}