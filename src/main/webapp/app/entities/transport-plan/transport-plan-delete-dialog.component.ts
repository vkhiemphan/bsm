import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportPlan } from 'app/shared/model/transport-plan.model';
import { TransportPlanService } from './transport-plan.service';

@Component({
    selector: 'jhi-transport-plan-delete-dialog',
    templateUrl: './transport-plan-delete-dialog.component.html'
})
export class TransportPlanDeleteDialogComponent {
    transportPlan: ITransportPlan;

    constructor(
        private transportPlanService: TransportPlanService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transportPlanService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transportPlanListModification',
                content: 'Deleted an transportPlan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transport-plan-delete-popup',
    template: ''
})
export class TransportPlanDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportPlan }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransportPlanDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transportPlan = transportPlan;
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
