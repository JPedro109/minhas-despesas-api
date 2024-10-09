import { CustomerEntity } from "@/layers/domain";

export interface ICustomerRepository {
    setContext(context: unknown): void;    
    createCustomer(customer: CustomerEntity): Promise<CustomerEntity>;
}