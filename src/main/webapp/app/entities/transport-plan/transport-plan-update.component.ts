import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITransportPlan } from 'app/shared/model/transport-plan.model';
import { TransportPlanService } from './transport-plan.service';
import { ITransportContractPart } from 'app/shared/model/transport-contract-part.model';
import { TransportContractPartService } from 'app/entities/transport-contract-part';

@Component({
    selector: 'jhi-transport-plan-update',
    templateUrl: './transport-plan-update.component.html'
})
export class TransportPlanUpdateComponent implements OnInit {
    private _transportPlan: ITransportPlan;
    isSaving: boolean;

    transportcontractparts: ITransportContractPart[];
    transportDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private transportPlanService: TransportPlanService,
        private transportContractPartService: TransportContractPartService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transportPlan }) => {
            this.transportPlan = transportPlan;
        });
        this.transportContractPartService.query().subscribe(
            (res: HttpResponse<ITransportContractPart[]>) => {
                this.transportcontractparts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transportPlan.id !== undefined) {
            this.subscribeToSaveResponse(this.transportPlanService.update(this.transportPlan));
        } else {
            this.subscribeToSaveResponse(this.transportPlanService.create(this.transportPlan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransportPlan>>) {
        result.subscribe((res: HttpResponse<ITransportPlan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTransportContractPartById(index: number, item: ITransportContractPart) {
        return item.id;
    }
    get transportPlan() {
        return this._transportPlan;
    }

    set transportPlan(transportPlan: ITransportPlan) {
        this._transportPlan = transportPlan;
    }
}
