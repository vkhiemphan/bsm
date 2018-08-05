/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportHistoryDeleteDialogComponent } from 'app/entities/transport-history/transport-history-delete-dialog.component';
import { TransportHistoryService } from 'app/entities/transport-history/transport-history.service';

describe('Component Tests', () => {
    describe('TransportHistory Management Delete Component', () => {
        let comp: TransportHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<TransportHistoryDeleteDialogComponent>;
        let service: TransportHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportHistoryDeleteDialogComponent]
            })
                .overrideTemplate(TransportHistoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
