import { ExpenseEntity } from "@/layers/domain";
import { IDeleteExpenseUseCase, IUnitOfWorkRepository, NotFoundError, DeleteExpenseDTO } from "@/layers/application";

export class DeleteExpenseUseCase implements IDeleteExpenseUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ id, deleteExpensePaymentHistory }: DeleteExpenseDTO): Promise<string> {
        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();
        const paymentHistoryRepository = this.unitOfWorkRepository.getPaymentHistoryRepository();

        const expense = await expenseRepository.getExpenseById(id);
        if(!expense) throw new NotFoundError("Essa despesa não existe");

        let expenseDeleted: ExpenseEntity;

        await this.unitOfWorkRepository.transaction(async () => {
           expenseDeleted = await expenseRepository.deleteExpenseById(id);
           if(deleteExpensePaymentHistory) await paymentHistoryRepository.deletePaymentHistoriesByExpenseId(id);
        });

        return expenseDeleted.id;
    }
}