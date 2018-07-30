/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { SaleContactComponent } from 'app/entities/sale-contact/sale-contact.component';
import { SaleContactService } from 'app/entities/sale-contact/sale-contact.service';
import { SaleContact } from 'app/shared/model/sale-contact.model';

describe('Component Tests', () => {
    describe('SaleContact Management Component', () => {
        let comp: SaleContactComponent;
        let fixture: ComponentFixture<SaleContactComponent>;
        let service: SaleContactService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [SaleContactComponent],
                providers: []
            })
                .overrideTemplate(SaleContactComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SaleContactComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SaleContactService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SaleContact(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.saleContacts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
