/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportContractPartDeleteDialogComponent } from 'app/entities/transport-contract-part/transport-contract-part-delete-dialog.component';
import { TransportContractPartService } from 'app/entities/transport-contract-part/transport-contract-part.service';

describe('Component Tests', () => {
    describe('TransportContractPart Management Delete Component', () => {
        let comp: TransportContractPartDeleteDialogComponent;
        let fixture: ComponentFixture<TransportContractPartDeleteDialogComponent>;
        let service: TransportContractPartService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportContractPartDeleteDialogComponent]
            })
                .overrideTemplate(TransportContractPartDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportContractPartDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportContractPartService);
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
