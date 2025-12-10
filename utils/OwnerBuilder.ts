import { faker } from '@faker-js/faker';
import { OwnerDto } from '../models/OwnerDto';

export class OwnerBuilder {
    private owner: OwnerDto;

    constructor() {
        this.owner = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            telephone: faker.string.numeric(10),
        };
    }

    withFirstName(firstName: string): OwnerBuilder {
        this.owner.firstName = firstName;
        return this;
    }

    withLastName(lastName: string): OwnerBuilder {
        this.owner.lastName = lastName;
        return this;
    }

    withAddress(address: string): OwnerBuilder {
        this.owner.address = address;
        return this;
    }

    withCity(city: string): OwnerBuilder {
        this.owner.city = city;
        return this;
    }

    withTelephone(telephone: string): OwnerBuilder {
        this.owner.telephone = telephone;
        return this;
    }

    build(): OwnerDto {
        return { ...this.owner };
    }
}
