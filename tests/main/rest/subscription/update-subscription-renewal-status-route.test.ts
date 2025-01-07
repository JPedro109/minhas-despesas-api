jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (renewable: unknown): object => {
    return { renewable };
};

describe("/api/subscriptions/renewal-status - PATCH", () => {
    setup();

    test("Should not update subscription renewal status because field is invalid", async () => {
        const body = makeBody(undefined);
        const token = await loginRest(
            "email-with-plan-gold-and-with-expenses-and-extracts@test.com",
        );

        const response = await request(setupServer())
            .patch("/api/subscriptions/renewal-status")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not update subscription renewal status because user have the plan free", async () => {
        const body = makeBody(true);
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .patch("/api/subscriptions/renewal-status")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(403);
    });

    test("Should not update subscription renewal status to active because user does not have payment method", async () => {
        const body = makeBody(true);
        const token = await loginRest(
            "email-with-plan-gold-with-codes-expired-without-payment-method@test.com",
        );

        const response = await request(setupServer())
            .patch("/api/subscriptions/renewal-status")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(403);
    });

    test("Should update subscription renewal status to inactive", async () => {
        const body = makeBody(false);
        const token = await loginRest(
            "email-with-plan-gold-with-codes-expired-without-payment-method@test.com",
        );

        const response = await request(setupServer())
            .patch("/api/subscriptions/renewal-status")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });

    test("Should update subscription renewal status to active", async () => {
        const body = makeBody(false);
        const token = await loginRest(
            "email-with-plan-gold-and-with-expenses-and-extracts@test.com",
        );

        const response = await request(setupServer())
            .patch("/api/subscriptions/renewal-status")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
