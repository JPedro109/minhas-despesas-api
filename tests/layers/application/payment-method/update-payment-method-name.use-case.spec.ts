import {
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStub,
    paymentMethodRepositoryStub
} from "../__mocks__";
import { NotFoundError, UpdatePaymentMethodNameUseCase } from "@/layers/application";

const makeSut = (): {
    sut: UpdatePaymentMethodNameUseCase,
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub
} => {
    const sut = new UpdatePaymentMethodNameUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        paymentMethodRepositoryStub
    };
};

describe("Use case - UpdatePaymentMethodNameUseCase", () => {

    test("Should not update payment method name because payment method does not exist", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const id = "2";
        const name = "New Payment Method Name";
        jest.spyOn(paymentMethodRepositoryStub, "getPaymentMethodById").mockReturnValueOnce(Promise.resolve(null));

        const result = sut.execute({ id, name });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should update payment method name successfully", async () => {
        const { sut } = makeSut();
        const id = "1";
        const name = "Updated Payment Method Name";

        const result = await sut.execute({ id, name });

        expect(result).toBe(name);
    });
});