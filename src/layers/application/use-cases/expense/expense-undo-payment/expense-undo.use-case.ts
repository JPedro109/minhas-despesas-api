import {
    IExpenseUndoPaymentUseCase,
    IUnitOfWorkRepository,
    NotFoundError,
    ExpenseUndoPaymentDTO,
} from "@/layers/application";

export class ExpenseUndoPaymentUseCase implements IExpenseUndoPaymentUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) {}

    async execute({ id }: ExpenseUndoPaymentDTO): Promise<void> {
        const expenseRepository =
            this.unitOfWorkRepository.getExpenseRepository();
        const paymentHistoryRepository =
            this.unitOfWorkRepository.getPaymentHistoryRepository();

        const expense = await expenseRepository.getExpenseById(id);
        if (!expense) throw new NotFoundError("Essa despesa não existe");

        expense.paid = false;

        await this.unitOfWorkRepository.transaction(async () => {
            await expenseRepository.updateExpenseById(id, expense);
            await paymentHistoryRepository.deletePaymentHistoryByExpenseIdAndDueMonthAndDueYear(
                id,
                expense.dueDate.getUTCMonth() + 1,
                expense.dueDate.getUTCFullYear(),
            );
        });
    }
}
