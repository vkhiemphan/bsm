/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { SaleContactDetailComponent } from 'app/entities/sale-contact/sale-contact-detail.component';
import { SaleContact } from 'app/shared/model/sale-contact.model';

describe('Component Tests', () => {
    describe('SaleContact Management Detail Component', () => {
        let comp: SaleContactDetailComponent;
        let fixture: ComponentFixture<SaleContactDetailComponent>;
        const route = ({ data: of({ saleContact: new SaleContact(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [SaleContactDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SaleContactDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SaleContactDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.saleContact).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
