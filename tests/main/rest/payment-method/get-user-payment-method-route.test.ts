jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

describe("/api/payment-methods - GET", () => {
    setup();

    test("Should return null when the user exists but has no payment method", async () => {
        const token = await loginRest(
            "email-verified-with-exclude-payment-method-and-sub-with-full@test.com",
        );

        const response = await request(setupServer())
            .get("/api/payment-methods")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeNull();
    });

    test("Should return the user payment method successfully", async () => {
        const token = await loginRest(
            "email-payment-method-and-inactive-sub-expenses@test.com",
        );

        const response = await request(setupServer())
            .get("/api/payment-methods")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
    });
});
