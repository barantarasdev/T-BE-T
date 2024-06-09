import { createFactory } from "../../database/services/factories";
import { CreateFactoryDto } from "./dto/createFactory.dto";

class FactoriesService {
  async createFactory(dto: CreateFactoryDto) {
    return await createFactory(dto);
  }
}

export default FactoriesService;
