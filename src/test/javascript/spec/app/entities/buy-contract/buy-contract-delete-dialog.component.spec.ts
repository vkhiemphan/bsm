/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BuySaleManagerTestModule } from '../../../test.module';
import { BuyContractDeleteDialogComponent } from 'app/entities/buy-contract/buy-contract-delete-dialog.component';
import { BuyContractService } from 'app/entities/buy-contract/buy-contract.service';

describe('Component Tests', () => {
    describe('BuyContract Management Delete Component', () => {
        let comp: BuyContractDeleteDialogComponent;
        let fixture: ComponentFixture<BuyContractDeleteDialogComponent>;
        let service: BuyContractService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [BuyContractDeleteDialogComponent]
            })
                .overrideTemplate(BuyContractDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BuyContractDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BuyContractService);
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
