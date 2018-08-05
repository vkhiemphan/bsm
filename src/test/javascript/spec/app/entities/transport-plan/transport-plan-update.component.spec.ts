/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportPlanUpdateComponent } from 'app/entities/transport-plan/transport-plan-update.component';
import { TransportPlanService } from 'app/entities/transport-plan/transport-plan.service';
import { TransportPlan } from 'app/shared/model/transport-plan.model';

describe('Component Tests', () => {
    describe('TransportPlan Management Update Component', () => {
        let comp: TransportPlanUpdateComponent;
        let fixture: ComponentFixture<TransportPlanUpdateComponent>;
        let service: TransportPlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportPlanUpdateComponent]
            })
                .overrideTemplate(TransportPlanUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportPlanUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportPlanService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransportPlan(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportPlan = entity;
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
                    const entity = new TransportPlan();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportPlan = entity;
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
