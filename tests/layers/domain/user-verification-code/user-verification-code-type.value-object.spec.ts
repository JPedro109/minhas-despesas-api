import { UserVerificationCodeTypeValueObject, InvalidUserVerificationCodeTypeError } from "@/layers/domain";

describe(("Value Object - UserVerificationCodeTypeValueObject"), () => {
    
	test("Should not create user verification code type, because user verification code type is empty" , () => {
		const invalidUserVerificationCodeTypeName = "";

		const sut = UserVerificationCodeTypeValueObject.create(invalidUserVerificationCodeTypeName);

		expect(sut).toBeInstanceOf(InvalidUserVerificationCodeTypeError);
	});

	test("Should not create user verification code type, because the user verification code type is invalid" , () => {
		const invalidUserVerificationCodeTypeName = "invalid_type";

		const sut = UserVerificationCodeTypeValueObject.create(invalidUserVerificationCodeTypeName);

		expect(sut).toBeInstanceOf(InvalidUserVerificationCodeTypeError);
	});

	test("Should create user verification code type" , () => {
		const userVerificationCodeTypeName = "create_user";

		const sut = UserVerificationCodeTypeValueObject.create(userVerificationCodeTypeName);

		expect(sut).toBeInstanceOf(UserVerificationCodeTypeValueObject);
	});
});