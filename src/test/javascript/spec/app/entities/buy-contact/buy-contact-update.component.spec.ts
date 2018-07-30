/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { BuyContactUpdateComponent } from 'app/entities/buy-contact/buy-contact-update.component';
import { BuyContactService } from 'app/entities/buy-contact/buy-contact.service';
import { BuyContact } from 'app/shared/model/buy-contact.model';

describe('Component Tests', () => {
    describe('BuyContact Management Update Component', () => {
        let comp: BuyContactUpdateComponent;
        let fixture: ComponentFixture<BuyContactUpdateComponent>;
        let service: BuyContactService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [BuyContactUpdateComponent]
            })
                .overrideTemplate(BuyContactUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BuyContactUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BuyContactService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BuyContact(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.buyContact = entity;
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
                    const entity = new BuyContact();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.buyContact = entity;
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
