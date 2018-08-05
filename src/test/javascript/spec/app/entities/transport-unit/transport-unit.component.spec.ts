/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportUnitComponent } from 'app/entities/transport-unit/transport-unit.component';
import { TransportUnitService } from 'app/entities/transport-unit/transport-unit.service';
import { TransportUnit } from 'app/shared/model/transport-unit.model';

describe('Component Tests', () => {
    describe('TransportUnit Management Component', () => {
        let comp: TransportUnitComponent;
        let fixture: ComponentFixture<TransportUnitComponent>;
        let service: TransportUnitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportUnitComponent],
                providers: []
            })
                .overrideTemplate(TransportUnitComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportUnitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportUnitService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TransportUnit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transportUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
