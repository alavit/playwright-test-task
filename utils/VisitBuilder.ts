import { faker } from '@faker-js/faker';
import { VisitDto } from '../models/VisitDto';

export class VisitBuilder {
    private visit: VisitDto;

    constructor() {
        this.visit = {
            date: faker.date.future().toISOString().split('T')[0],
            description: faker.lorem.sentence(),
        };
    }

    withDate(date: string): VisitBuilder {
        this.visit.date = date;
        return this;
    }

    withDescription(description: string): VisitBuilder {
        this.visit.description = description;
        return this;
    }

    build(): VisitDto {
        return { ...this.visit };
    }
}
