import { PetType } from './PetType';

export interface PetDto {
    name: string;
    birthDate: string;
    type: PetType;
}
