import { getCustomRepository } from 'typeorm';
import ProductRepository from './../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	id: string;
}
class DeleteProductService {
	public async execute({ id }: IRequest): Promise<void> {
		const productsRepository = getCustomRepository(ProductRepository);

		//pesquisa se há produto com id informado
		const product = await productsRepository.findOne(id);
		//senão houver dispara erro
		if (!product) {
			throw new AppError('Product not found.');
		}

		await productsRepository.remove(product);
	}
}

export default DeleteProductService;
