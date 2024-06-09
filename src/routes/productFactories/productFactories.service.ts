import { createProductFactory } from "../../database/services/productFactory";
import { CreateProductFactoryDto } from "./dto/createProductFactory.dto";

class ProductFactoriesService {
  async createProductFactory(dto: CreateProductFactoryDto) {
    return await createProductFactory(dto);
  }
}

export default ProductFactoriesService;
