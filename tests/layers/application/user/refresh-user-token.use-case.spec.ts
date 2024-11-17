import { UnauthorizedError, RefreshUserTokenUseCase, InvalidJsonWebTokenError } from "@/layers/application";
import {
    UserRepositoryStub,
    AuthenticationStub,
    unitOfWorkRepositoryStubFactory,
    authenticationStubFactory
} from "../__mocks__";

const makeSut = (): {
    sut: RefreshUserTokenUseCase,
    userRepositoryStub: UserRepositoryStub,
    authenticationStub: AuthenticationStub
} => {
    const authenticationStub = authenticationStubFactory();
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new RefreshUserTokenUseCase(unitOfWorkRepositoryStub, authenticationStub);

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        authenticationStub
    };
};

describe("Use case - RefreshUserTokenUseCase", () => {
    test("Should throw error if refresh token is invalid", () => {
        const { sut, authenticationStub } = makeSut();
        jest
            .spyOn(authenticationStub, "verifyJsonWebToken")
            .mockImplementationOnce(() => {
                throw new InvalidJsonWebTokenError("Token is invalid");
            });

        const result = sut.execute({ refreshToken: "invalid-token" });

        expect(result).rejects.toThrow(InvalidJsonWebTokenError);
    });

    test("Should throw error if refresh token is not of the right type", () => {
        const { sut } = makeSut();

        const result = sut.execute({ refreshToken: "invalid-token" });

        expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should throw error if user does not exist", async () => {
        const { sut, userRepositoryStub, authenticationStub } = makeSut();
        jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(null);
        jest
            .spyOn(authenticationStub, "verifyJsonWebToken")
            .mockImplementationOnce(() => ({
                id: "1",
                email: "email@test.com",
                type: "refresh_token"
            }));

        const result = sut.execute({ refreshToken: "valid-refresh-token" });

        await expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should return new access token on successful token refresh", async () => {
        const { sut, authenticationStub } = makeSut();
        jest
            .spyOn(authenticationStub, "verifyJsonWebToken")
            .mockImplementationOnce(() => ({
                id: "1",
                email: "email@test.com",
                type: "refresh_token"
            }));

        const result = await sut.execute({ refreshToken: "valid-refresh-token" });

        expect(result).toBe("token");
    });
});