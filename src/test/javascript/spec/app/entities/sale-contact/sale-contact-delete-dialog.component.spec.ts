/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BuySaleManagerTestModule } from '../../../test.module';
import { SaleContactDeleteDialogComponent } from 'app/entities/sale-contact/sale-contact-delete-dialog.component';
import { SaleContactService } from 'app/entities/sale-contact/sale-contact.service';

describe('Component Tests', () => {
    describe('SaleContact Management Delete Component', () => {
        let comp: SaleContactDeleteDialogComponent;
        let fixture: ComponentFixture<SaleContactDeleteDialogComponent>;
        let service: SaleContactService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [SaleContactDeleteDialogComponent]
            })
                .overrideTemplate(SaleContactDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SaleContactDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SaleContactService);
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
