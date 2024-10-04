import { AbstractEntity } from "../abstract/abstract.entity";
import {
    PlanNameValueObject,
    PlanDescriptionValueObject,
    PlanAmountValueObject
} from "@/layers/domain";

export type PlanActionProps = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date;
}

export type PlanProps = {
    name: string;
    amount: number;
    description: string;
    actions: {
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt?: Date;
    }[];
    updatedAt?: Date;
}

export class PlanEntity extends AbstractEntity<PlanProps> {

    constructor(props: PlanProps, id?: string, createdAt?: Date) {
        super(props, id, createdAt);

        const valueObjects = {
            name: PlanNameValueObject.create(props.name),
            description: PlanDescriptionValueObject.create(props.description),
            amount: PlanAmountValueObject.create(props.amount)
        };

        this.validate(valueObjects);
    }

    get name(): string {
        return this.props.name;
    }

    get description(): string {
        return this.props.description;
    }

    set description(description: string) {
        const result = PlanDescriptionValueObject.create(description);
        if (result instanceof Error) throw result;
        this.props.description = result.value;
        this.props.updatedAt = new Date();
    }

    get amount(): number {
        return this.props.amount;
    }

    get actions(): PlanActionProps[] {
        return this.props.actions;
    }

    get updatedAt(): Date | null {
        return this.props.updatedAt;
    }
}