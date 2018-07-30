/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { BuySaleRelationUpdateComponent } from 'app/entities/buy-sale-relation/buy-sale-relation-update.component';
import { BuySaleRelationService } from 'app/entities/buy-sale-relation/buy-sale-relation.service';
import { BuySaleRelation } from 'app/shared/model/buy-sale-relation.model';

describe('Component Tests', () => {
    describe('BuySaleRelation Management Update Component', () => {
        let comp: BuySaleRelationUpdateComponent;
        let fixture: ComponentFixture<BuySaleRelationUpdateComponent>;
        let service: BuySaleRelationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [BuySaleRelationUpdateComponent]
            })
                .overrideTemplate(BuySaleRelationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BuySaleRelationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BuySaleRelationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BuySaleRelation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.buySaleRelation = entity;
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
                    const entity = new BuySaleRelation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.buySaleRelation = entity;
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
