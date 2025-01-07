import { AbstractEntity } from "../abstract/abstract.entity";
import {
    DomainError,
    PlanAmountValueObject,
    PlanEntity,
} from "@/layers/domain";

export type SubscriptionProps = {
    userId: string;
    plan: PlanEntity;
    amount: number;
    active: boolean;
    renewable: boolean;
    startDate: Date;
    endDate?: Date;
    updatedAt?: Date;
};

export class SubscriptionEntity extends AbstractEntity<SubscriptionProps> {
    constructor(props: SubscriptionProps, id?: string, createdAt?: Date) {
        super(props, id, createdAt);

        if (this.endDate?.getTime() <= this.startDate.getTime())
            throw new DomainError(
                "A data de término da assinatura deve ser maior que a data de início",
            );

        const valueObjects = {
            amount: PlanAmountValueObject.create(props.amount),
        };

        this.validate(valueObjects);
    }

    get userId(): string {
        return this.props.userId;
    }

    get plan(): PlanEntity {
        return this.props.plan;
    }

    get amount(): number {
        return this.props.amount;
    }

    get active(): boolean {
        return this.props.active;
    }

    set active(active: boolean) {
        if (this.props.active === active)
            throw new DomainError(
                `A assinatura já está ${active ? "ativa" : "como não ativa"}`,
            );
        this.props.active = active;
        this.props.updatedAt = new Date();
    }

    get renewable(): boolean {
        return this.props.renewable;
    }

    set renewable(renewable: boolean) {
        if (this.props.renewable === renewable)
            throw new DomainError(
                `A assinatura já está ${renewable ? "renovável" : "como não renovável "}`,
            );
        this.props.renewable = renewable;
        this.props.updatedAt = new Date();
    }

    get startDate(): Date {
        return this.props.startDate;
    }

    get endDate(): Date {
        return this.props.endDate;
    }

    get updatedAt(): Date | null {
        return this.props.updatedAt;
    }
}
