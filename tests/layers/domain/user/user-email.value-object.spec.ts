import { UserEmailValueObject, InvalidUserEmailError } from "@/layers/domain";

describe(("Object Value - UserEmailValueObject"), () => {
    
	test("Should not create user email, because email is empty" , () => {
		const invalidUserEmail = "";

		const sut = UserEmailValueObject.create(invalidUserEmail);

		expect(sut).toBeInstanceOf(InvalidUserEmailError);
	});
    
	test("Should not create user email, because email has more than 256 characters" , () => {
		const invalidUserEmail = "c".repeat(300);

		const sut = UserEmailValueObject.create(invalidUserEmail);

		expect(sut).toBeInstanceOf(InvalidUserEmailError);
	});

	test("Should not create user email, because email is not respect regEx" , () => {
		const invalidUserEmail = "email.com";
				
		const sut = UserEmailValueObject.create(invalidUserEmail);

		expect(sut).toBeInstanceOf(InvalidUserEmailError);
	});

	test("Should not create user email, because the email account has more than 64 characters" , () => {
		const invalidAccount = "c".repeat(100);

		const sut = UserEmailValueObject.create(`${invalidAccount}@test.com`);

		expect(sut).toBeInstanceOf(InvalidUserEmailError);
	});

	test("Should not create user email, because the email domain has more than 64 characters" , () => {
		const invalidDomain = "c".repeat(300);

		const sut = UserEmailValueObject.create(`email@${invalidDomain}.com`);

		expect(sut).toBeInstanceOf(InvalidUserEmailError);
	});

	test("Should create user email" , () => {
		const userEmail = "email@test.com";
		
		const sut = UserEmailValueObject.create(userEmail);

		expect(sut).toBeInstanceOf(UserEmailValueObject);
	});
});