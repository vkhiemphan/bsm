/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { BuyContactComponent } from 'app/entities/buy-contact/buy-contact.component';
import { BuyContactService } from 'app/entities/buy-contact/buy-contact.service';
import { BuyContact } from 'app/shared/model/buy-contact.model';

describe('Component Tests', () => {
    describe('BuyContact Management Component', () => {
        let comp: BuyContactComponent;
        let fixture: ComponentFixture<BuyContactComponent>;
        let service: BuyContactService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [BuyContactComponent],
                providers: []
            })
                .overrideTemplate(BuyContactComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BuyContactComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BuyContactService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BuyContact(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.buyContacts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
