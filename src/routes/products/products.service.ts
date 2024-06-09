import {
  createProduct,
  getAllProducts,
  searchProducts,
} from "../../database/services/products";
import { CreateProductDto } from "./dto/createProduct.dto";
import { SearchProductsDto } from "./dto/searchProducts.dto";

class ProductsService {
  async getAllProducts() {
    return await getAllProducts();
  }

  async searchProducts(dto: SearchProductsDto) {
    return await searchProducts(dto);
  }

  async createProduct(dto: CreateProductDto) {
    return await createProduct(dto);
  }
}

export default ProductsService;
