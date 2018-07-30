/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { SaleContactUpdateComponent } from 'app/entities/sale-contact/sale-contact-update.component';
import { SaleContactService } from 'app/entities/sale-contact/sale-contact.service';
import { SaleContact } from 'app/shared/model/sale-contact.model';

describe('Component Tests', () => {
    describe('SaleContact Management Update Component', () => {
        let comp: SaleContactUpdateComponent;
        let fixture: ComponentFixture<SaleContactUpdateComponent>;
        let service: SaleContactService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [SaleContactUpdateComponent]
            })
                .overrideTemplate(SaleContactUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SaleContactUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SaleContactService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SaleContact(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.saleContact = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SaleContact();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.saleContact = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
