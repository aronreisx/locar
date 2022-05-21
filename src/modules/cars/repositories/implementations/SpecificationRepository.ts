import { Specification } from '../../models/Specification';
import {
  ISpecificationRepository,
  ICreateSpecificationsDTO,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationsDTO): void {
    const specification = new Specification(
      name,
      description,
    );

    this.specifications.push(specification);
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}

export { SpecificationsRepository };
