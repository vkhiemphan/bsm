import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBuyContract } from 'app/shared/model/buy-contract.model';
import { BuyContractService } from './buy-contract.service';

@Component({
    selector: 'jhi-buy-contract-delete-dialog',
    templateUrl: './buy-contract-delete-dialog.component.html'
})
export class BuyContractDeleteDialogComponent {
    buyContract: IBuyContract;

    constructor(private buyContractService: BuyContractService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.buyContractService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'buyContractListModification',
                content: 'Deleted an buyContract'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-buy-contract-delete-popup',
    template: ''
})
export class BuyContractDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ buyContract }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BuyContractDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.buyContract = buyContract;
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
