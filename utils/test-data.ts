import { faker } from '@faker-js/faker';
import { OwnerDto } from '../models/OwnerDto';
import { PetDto } from '../models/PetDto';
import { VisitDto } from '../models/VisitDto';

import { PetType } from '../models/PetType';

export const generateOwner = (): OwnerDto => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    telephone: faker.string.numeric(10),
});

export const generatePet = (ownerName: string): PetDto => ({
    name: `${faker.animal.type()}_${faker.string.alpha(5)}`,
    birthDate: faker.date.past().toISOString().split('T')[0],
    type: faker.helpers.enumValue(PetType),
});

export const generateVisit = (): VisitDto => ({
    date: faker.date.future().toISOString().split('T')[0],
    description: faker.lorem.sentence(),
});
