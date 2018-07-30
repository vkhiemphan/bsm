import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBuyContact } from 'app/shared/model/buy-contact.model';
import { BuyContactService } from './buy-contact.service';

@Component({
    selector: 'jhi-buy-contact-delete-dialog',
    templateUrl: './buy-contact-delete-dialog.component.html'
})
export class BuyContactDeleteDialogComponent {
    buyContact: IBuyContact;

    constructor(private buyContactService: BuyContactService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.buyContactService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'buyContactListModification',
                content: 'Deleted an buyContact'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-buy-contact-delete-popup',
    template: ''
})
export class BuyContactDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ buyContact }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BuyContactDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.buyContact = buyContact;
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
