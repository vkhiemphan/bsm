/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { BuyContactDetailComponent } from 'app/entities/buy-contact/buy-contact-detail.component';
import { BuyContact } from 'app/shared/model/buy-contact.model';

describe('Component Tests', () => {
    describe('BuyContact Management Detail Component', () => {
        let comp: BuyContactDetailComponent;
        let fixture: ComponentFixture<BuyContactDetailComponent>;
        const route = ({ data: of({ buyContact: new BuyContact(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [BuyContactDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BuyContactDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BuyContactDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.buyContact).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
