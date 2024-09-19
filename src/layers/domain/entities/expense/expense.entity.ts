import { AbstractEntity } from "../abstract/abstract.entity";
import { ExpenseNameValueObject, ExpenseValueValueObject, ExpenseDueDateValueObject, DomainError } from "@/layers/domain";

export type ExpenseProps = {
    expenseName: string;
    expenseValue: number;
    dueDate: Date;
    paid: boolean;
	updatedAt?: Date;
}

export class ExpenseEntity extends AbstractEntity<ExpenseProps> {

    constructor(props: ExpenseProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);

		const valueObjets = {
			expenseName: ExpenseNameValueObject.create(props.expenseName),
			expenseValue: ExpenseValueValueObject.create(props.expenseValue),
			dueDate: ExpenseDueDateValueObject.create(props.dueDate),
		};

		const result = this.validate(valueObjets);

		if(!result.valid) throw new DomainError(result.errors);
	}

    get expenseName(): string {
        return this.props.expenseName;
    }

    set expenseName(expenseName: string) {
        const result = ExpenseNameValueObject.create(expenseName);
		if (result instanceof Error) throw result;
        this.props.expenseName = result.value;
        this.props.updatedAt = new Date();
    }

    get expenseValue(): number {
        return this.props.expenseValue;
    }

    set expenseValue(expenseValue: number) {
        const result = ExpenseValueValueObject.create(expenseValue);
		if (result instanceof Error) throw result;
        this.props.expenseValue = result.value;
        this.props.updatedAt = new Date();
    }

    get dueDate(): Date {
        return this.props.dueDate;
    }

    set dueDate(dueDate: Date) {
        const result = ExpenseDueDateValueObject.create(dueDate);
		if (result instanceof Error) throw result;
        this.props.dueDate = result.value;
        this.props.updatedAt = new Date();
    }

    get paid(): boolean {
        return this.props.paid;
    }

    set paid(paid: boolean) {
		if(this.props.paid === paid) throw new DomainError(`A despesa já está ${paid ? "paga" : "como não paga"}`);
        this.props.paid = paid;
        this.props.updatedAt = new Date();
    }

    get updatedAt(): Date | null {
        return this.props.updatedAt;
    }
}