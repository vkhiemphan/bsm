/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportUnitDetailComponent } from 'app/entities/transport-unit/transport-unit-detail.component';
import { TransportUnit } from 'app/shared/model/transport-unit.model';

describe('Component Tests', () => {
    describe('TransportUnit Management Detail Component', () => {
        let comp: TransportUnitDetailComponent;
        let fixture: ComponentFixture<TransportUnitDetailComponent>;
        const route = ({ data: of({ transportUnit: new TransportUnit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportUnitDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransportUnitDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportUnitDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transportUnit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
