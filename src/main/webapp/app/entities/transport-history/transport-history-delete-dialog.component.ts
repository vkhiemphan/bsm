import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportHistory } from 'app/shared/model/transport-history.model';
import { TransportHistoryService } from './transport-history.service';

@Component({
    selector: 'jhi-transport-history-delete-dialog',
    templateUrl: './transport-history-delete-dialog.component.html'
})
export class TransportHistoryDeleteDialogComponent {
    transportHistory: ITransportHistory;

    constructor(
        private transportHistoryService: TransportHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transportHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transportHistoryListModification',
                content: 'Deleted an transportHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transport-history-delete-popup',
    template: ''
})
export class TransportHistoryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransportHistoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transportHistory = transportHistory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
