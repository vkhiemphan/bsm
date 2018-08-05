import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISaleContract } from 'app/shared/model/sale-contract.model';
import { SaleContractService } from './sale-contract.service';

@Component({
    selector: 'jhi-sale-contract-delete-dialog',
    templateUrl: './sale-contract-delete-dialog.component.html'
})
export class SaleContractDeleteDialogComponent {
    saleContract: ISaleContract;

    constructor(
        private saleContractService: SaleContractService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.saleContractService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'saleContractListModification',
                content: 'Deleted an saleContract'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sale-contract-delete-popup',
    template: ''
})
export class SaleContractDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ saleContract }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SaleContractDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.saleContract = saleContract;
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
