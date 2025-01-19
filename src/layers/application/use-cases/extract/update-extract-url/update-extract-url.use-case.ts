import { UpdateExtractUrlDTO, IUpdateExtractUrlUseCase, IUnitOfWorkRepository, NotFoundError } from "@/layers/application";

export class UpdateExtractUrlUseCase implements IUpdateExtractUrlUseCase {

    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository
    ) { }

    async execute({ id, url }: UpdateExtractUrlDTO): Promise<string> {
        const extractRepository = this.unitOfWorkRepository.getExtractRepository();

        const extract = await extractRepository.getExtractById(id);

        if(!extract) throw new NotFoundError("Esse extrato não existe");

        extract.url = url;
        await extractRepository.updateExtract(extract);
        
        return extract.id;
    }
}