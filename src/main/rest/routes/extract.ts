import { AuthorizationUserActionMiddleware } from "@/layers/presentation";
import {
    createExtractController,
    deleteExpiredExtractsController,
    getUserExtractsController,
    authenticationUserMiddleware,
    getUserSubscriptionUseCase,
    basicAuthenticationMiddleware,
    winstonAdapter,
} from "@/main/factories";
import { RestAdapter } from "@/main/rest";

import { Router } from "express";

export default (router: Router): void => {
    router.post(
        "/extracts",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "create:extract",
                winstonAdapter,
            ),
        ),
        RestAdapter.route(createExtractController),
    );
    router.delete(
        "/extracts/expired",
        RestAdapter.middleware(basicAuthenticationMiddleware),
        RestAdapter.route(deleteExpiredExtractsController),
    );
    router.get(
        "/extracts",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "get:extract",
                winstonAdapter,
            ),
        ),
        RestAdapter.route(getUserExtractsController),
    );
};
