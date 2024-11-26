import { ICreatePaymentMethodUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper, HttpRequest } from "@/layers/presentation";

export class CreatePaymentMethodController extends AbstractController {

    constructor(
        private readonly useCase: ICreatePaymentMethodUseCase,
        log: ILog
    ) { 
        super(
            log,
            "CreatePaymentMethod",
            {
                userId: {
                    type: "string",
                    optional: false
                },
                name: {
                    type: "string",
                    optional: false
                },
                token: {
                    type: "string",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { name, token } = request.data;
        const body = { 
            userId: request.userId,
            name, 
            token
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}