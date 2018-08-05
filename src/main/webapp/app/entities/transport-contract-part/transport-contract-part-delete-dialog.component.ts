import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportContractPart } from 'app/shared/model/transport-contract-part.model';
import { TransportContractPartService } from './transport-contract-part.service';

@Component({
    selector: 'jhi-transport-contract-part-delete-dialog',
    templateUrl: './transport-contract-part-delete-dialog.component.html'
})
export class TransportContractPartDeleteDialogComponent {
    transportContractPart: ITransportContractPart;

    constructor(
        private transportContractPartService: TransportContractPartService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transportContractPartService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transportContractPartListModification',
                content: 'Deleted an transportContractPart'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transport-contract-part-delete-popup',
    template: ''
})
export class TransportContractPartDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportContractPart }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransportContractPartDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transportContractPart = transportContractPart;
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
