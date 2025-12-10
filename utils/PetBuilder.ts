import { faker } from '@faker-js/faker';
import { PetDto } from '../models/PetDto';
import { PetType } from '../models/PetType';

export class PetBuilder {
    private pet: PetDto;

    constructor() {
        this.pet = {
            name: `${faker.animal.type()}_${faker.string.alpha(5)}`,
            birthDate: faker.date.past().toISOString().split('T')[0],
            type: faker.helpers.enumValue(PetType),
        };
    }

    withName(name: string): PetBuilder {
        this.pet.name = name;
        return this;
    }

    withBirthDate(birthDate: string): PetBuilder {
        this.pet.birthDate = birthDate;
        return this;
    }

    withType(type: PetType): PetBuilder {
        this.pet.type = type;
        return this;
    }

    build(): PetDto {
        return { ...this.pet };
    }
}
