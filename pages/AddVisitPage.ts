import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { VisitDto } from '../models/VisitDto';

export class AddVisitPage extends BasePage {
    readonly dateInput: Locator;
    readonly descriptionInput: Locator;
    readonly addVisitBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.dateInput = page.locator('#date');
        this.descriptionInput = page.locator('#description');
        this.addVisitBtn = page.getByRole('button', { name: 'Add Visit' });
    }

    async addVisit(visit: VisitDto) {
        await this.dateInput.fill(visit.date);
        await this.descriptionInput.fill(visit.description);
        await this.addVisitBtn.click();
    }
}
