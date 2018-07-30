import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBuySaleRelation } from 'app/shared/model/buy-sale-relation.model';
import { BuySaleRelationService } from './buy-sale-relation.service';

@Component({
    selector: 'jhi-buy-sale-relation-delete-dialog',
    templateUrl: './buy-sale-relation-delete-dialog.component.html'
})
export class BuySaleRelationDeleteDialogComponent {
    buySaleRelation: IBuySaleRelation;

    constructor(
        private buySaleRelationService: BuySaleRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.buySaleRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'buySaleRelationListModification',
                content: 'Deleted an buySaleRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-buy-sale-relation-delete-popup',
    template: ''
})
export class BuySaleRelationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ buySaleRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BuySaleRelationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.buySaleRelation = buySaleRelation;
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
