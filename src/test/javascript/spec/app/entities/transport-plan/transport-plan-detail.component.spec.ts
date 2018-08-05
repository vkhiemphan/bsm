/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportPlanDetailComponent } from 'app/entities/transport-plan/transport-plan-detail.component';
import { TransportPlan } from 'app/shared/model/transport-plan.model';

describe('Component Tests', () => {
    describe('TransportPlan Management Detail Component', () => {
        let comp: TransportPlanDetailComponent;
        let fixture: ComponentFixture<TransportPlanDetailComponent>;
        const route = ({ data: of({ transportPlan: new TransportPlan(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportPlanDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransportPlanDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportPlanDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transportPlan).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
