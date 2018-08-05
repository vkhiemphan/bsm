/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BuySaleManagerTestModule } from '../../../test.module';
import { SaleContractDeleteDialogComponent } from 'app/entities/sale-contract/sale-contract-delete-dialog.component';
import { SaleContractService } from 'app/entities/sale-contract/sale-contract.service';

describe('Component Tests', () => {
    describe('SaleContract Management Delete Component', () => {
        let comp: SaleContractDeleteDialogComponent;
        let fixture: ComponentFixture<SaleContractDeleteDialogComponent>;
        let service: SaleContractService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [SaleContractDeleteDialogComponent]
            })
                .overrideTemplate(SaleContractDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SaleContractDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SaleContractService);
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
