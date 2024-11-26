import { IManageSubscriptionRenewalUseCase } from "@/layers/application";
import { ManageSubscriptionRenewalController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: ManageSubscriptionRenewalController,
    mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IManageSubscriptionRenewalUseCase>
} => {
    const mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IManageSubscriptionRenewalUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new ManageSubscriptionRenewalController(
        mockExecuteChargeToExpiredSubscriptionUseCase, 
        logStub
    );

    return {
        sut,
        mockExecuteChargeToExpiredSubscriptionUseCase
    };
};

describe("Controller - ManageSubscriptionRenewalController", () => {

    test("Should not manage subscription renewal because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";
        const renew = undefined;

        const result = await sut.http({
            data: {
                renew
            },
            userId
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should manage subscription renewal", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const renew = true;

        const result = await sut.http({
            data: {
                renew
            },
            userId
        });

        expect(result.statusCode).toBe(204);
    });
});