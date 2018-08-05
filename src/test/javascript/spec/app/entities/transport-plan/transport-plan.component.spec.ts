/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportPlanComponent } from 'app/entities/transport-plan/transport-plan.component';
import { TransportPlanService } from 'app/entities/transport-plan/transport-plan.service';
import { TransportPlan } from 'app/shared/model/transport-plan.model';

describe('Component Tests', () => {
    describe('TransportPlan Management Component', () => {
        let comp: TransportPlanComponent;
        let fixture: ComponentFixture<TransportPlanComponent>;
        let service: TransportPlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportPlanComponent],
                providers: []
            })
                .overrideTemplate(TransportPlanComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportPlanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportPlanService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TransportPlan(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transportPlans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
