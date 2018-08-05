/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportContractDeleteDialogComponent } from 'app/entities/transport-contract/transport-contract-delete-dialog.component';
import { TransportContractService } from 'app/entities/transport-contract/transport-contract.service';

describe('Component Tests', () => {
    describe('TransportContract Management Delete Component', () => {
        let comp: TransportContractDeleteDialogComponent;
        let fixture: ComponentFixture<TransportContractDeleteDialogComponent>;
        let service: TransportContractService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportContractDeleteDialogComponent]
            })
                .overrideTemplate(TransportContractDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportContractDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportContractService);
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
