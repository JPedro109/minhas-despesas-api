import { UpdatePreviousMonthPaidExpensesToUnpaidUseCase } from "@/layers/application";
import {
    ExpenseRepositoryStub,
    unitOfWorkRepositoryStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: UpdatePreviousMonthPaidExpensesToUnpaidUseCase;
    expenseRepositoryStub: ExpenseRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new UpdatePreviousMonthPaidExpensesToUnpaidUseCase(
        unitOfWorkRepositoryStub,
    );

    return {
        sut,
        expenseRepositoryStub: unitOfWorkRepositoryStub.getExpenseRepository(),
    };
};

describe("Use case - UpdatePreviousMonthPaidExpensesToUnpaidUseCase", () => {
    test("Should update paid expenses from the previous month to unpaid", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        const date = new Date();
        const dateWithPreviousMonth = new Date().setMonth(date.getMonth() - 1);
        const previousMonth = new Date(dateWithPreviousMonth).getMonth() + 1;
        const updatePaidExpensesToUnpaidSpy = jest.spyOn(
            expenseRepositoryStub,
            "updatePaidExpensesToUnpaidAndSumOneInDueMonthByDueMonth",
        );

        await sut.execute();

        expect(updatePaidExpensesToUnpaidSpy).toHaveBeenCalledWith(
            previousMonth,
        );
    });
});
