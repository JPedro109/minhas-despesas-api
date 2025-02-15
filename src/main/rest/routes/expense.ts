import { AuthorizationUserActionMiddleware } from "@/layers/presentation";
import {
    createExpenseController,
    deleteExpenseController,
    expenseUndoPaymentController,
    getUserExpensesController,
    payExpenseController,
    updateExpenseController,
    updatePreviousMonthPaidExpensesToUnpaidController,
    authenticationUserMiddleware,
    basicAuthenticationMiddleware,
    getUserSubscriptionUseCase,
    winstonAdapter,
} from "@/main/factories";
import { RestAdapter } from "@/main/rest";

import { Router } from "express";

export default (router: Router): void => {
    router.post(
        "/expenses",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "create:expense",
                winstonAdapter,
            ),
        ),
        RestAdapter.route(createExpenseController),
    );
    router.delete(
        "/expenses/:id",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "delete:expense",
                winstonAdapter,
            ),
        ),
        RestAdapter.route(deleteExpenseController),
    );
    router.patch(
        "/expenses/undo-payment/:id",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "undo-payment:expense",
                winstonAdapter,
            ),
        ),
        RestAdapter.route(expenseUndoPaymentController),
    );
    router.get(
        "/expenses",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "get:expense",
                winstonAdapter,
            ),
        ),
        RestAdapter.route(getUserExpensesController),
    );
    router.patch(
        "/expenses/pay/:id",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "pay:expense",
                winstonAdapter,
            ),
        ),
        RestAdapter.route(payExpenseController),
    );
    router.put(
        "/expenses/:id",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "update:expense",
                winstonAdapter,
            ),
        ),
        RestAdapter.route(updateExpenseController),
    );
    router.post(
        "/expenses/update-unpaid",
        RestAdapter.middleware(basicAuthenticationMiddleware),
        RestAdapter.route(updatePreviousMonthPaidExpensesToUnpaidController),
    );
};
