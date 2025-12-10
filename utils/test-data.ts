import { OwnerDto } from '../models/OwnerDto';
import { PetDto } from '../models/PetDto';
import { VisitDto } from '../models/VisitDto';
import { OwnerBuilder } from './OwnerBuilder';
import { PetBuilder } from './PetBuilder';
import { VisitBuilder } from './VisitBuilder';

export * from './OwnerBuilder';
export * from './PetBuilder';
export * from './VisitBuilder';

export const generateOwner = (): OwnerDto => {
    return new OwnerBuilder().build();
};

export const generatePet = (): PetDto => {
    return new PetBuilder().build();
};

export const generateVisit = (): VisitDto => {
    return new VisitBuilder().build();
};
