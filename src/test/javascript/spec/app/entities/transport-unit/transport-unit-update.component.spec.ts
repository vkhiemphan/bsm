/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportUnitUpdateComponent } from 'app/entities/transport-unit/transport-unit-update.component';
import { TransportUnitService } from 'app/entities/transport-unit/transport-unit.service';
import { TransportUnit } from 'app/shared/model/transport-unit.model';

describe('Component Tests', () => {
    describe('TransportUnit Management Update Component', () => {
        let comp: TransportUnitUpdateComponent;
        let fixture: ComponentFixture<TransportUnitUpdateComponent>;
        let service: TransportUnitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportUnitUpdateComponent]
            })
                .overrideTemplate(TransportUnitUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportUnitUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportUnitService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransportUnit(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportUnit = entity;
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
                    const entity = new TransportUnit();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportUnit = entity;
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
