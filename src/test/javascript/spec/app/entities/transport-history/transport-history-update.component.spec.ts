/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportHistoryUpdateComponent } from 'app/entities/transport-history/transport-history-update.component';
import { TransportHistoryService } from 'app/entities/transport-history/transport-history.service';
import { TransportHistory } from 'app/shared/model/transport-history.model';

describe('Component Tests', () => {
    describe('TransportHistory Management Update Component', () => {
        let comp: TransportHistoryUpdateComponent;
        let fixture: ComponentFixture<TransportHistoryUpdateComponent>;
        let service: TransportHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportHistoryUpdateComponent]
            })
                .overrideTemplate(TransportHistoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportHistoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportHistoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransportHistory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportHistory = entity;
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
                    const entity = new TransportHistory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportHistory = entity;
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
