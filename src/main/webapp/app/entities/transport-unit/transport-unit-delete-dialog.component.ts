import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransportUnit } from 'app/shared/model/transport-unit.model';
import { TransportUnitService } from './transport-unit.service';

@Component({
    selector: 'jhi-transport-unit-delete-dialog',
    templateUrl: './transport-unit-delete-dialog.component.html'
})
export class TransportUnitDeleteDialogComponent {
    transportUnit: ITransportUnit;

    constructor(
        private transportUnitService: TransportUnitService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transportUnitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transportUnitListModification',
                content: 'Deleted an transportUnit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transport-unit-delete-popup',
    template: ''
})
export class TransportUnitDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportUnit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransportUnitDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transportUnit = transportUnit;
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
