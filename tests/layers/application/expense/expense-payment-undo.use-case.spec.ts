import { DomainError } from "@/layers/domain";
import { ExpenseUndoPaymentUseCase, NotFoundError } from "@/layers/application";
import {
    ExpenseRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    testExpenseEntityPaid
} from "../__mocks__";

const makeSut = (): {
    sut: ExpenseUndoPaymentUseCase,
    expenseRepositoryStub: ExpenseRepositoryStub
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new ExpenseUndoPaymentUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        expenseRepositoryStub: unitOfWorkRepositoryStub.getExpenseRepository()
    };
};

describe("Use case - ExpenseUndoPaymentUseCase", () => {

    test("Should not paid because expense does not exist", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        jest.spyOn(expenseRepositoryStub, "getExpenseById").mockResolvedValueOnce(null);

        const result = sut.execute({ id: "2" });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not paid because expense is already unpaid", async () => {
        const { sut } = makeSut();

        const result = sut.execute({ id: "1" });

        await expect(result).rejects.toThrow(DomainError);
    });

    test("Should mark expense as unpaid and delete a payment history", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        jest.spyOn(expenseRepositoryStub, "getExpenseById").mockResolvedValueOnce(testExpenseEntityPaid());

        const result = await sut.execute({ id: "1" });

        expect(result).toBe("1");
    });
});