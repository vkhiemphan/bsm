import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITransportHistory } from 'app/shared/model/transport-history.model';
import { TransportHistoryService } from './transport-history.service';
import { ITransportContractPart } from 'app/shared/model/transport-contract-part.model';
import { TransportContractPartService } from 'app/entities/transport-contract-part';

@Component({
    selector: 'jhi-transport-history-update',
    templateUrl: './transport-history-update.component.html'
})
export class TransportHistoryUpdateComponent implements OnInit {
    private _transportHistory: ITransportHistory;
    isSaving: boolean;

    transportcontractparts: ITransportContractPart[];
    transportDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private transportHistoryService: TransportHistoryService,
        private transportContractPartService: TransportContractPartService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transportHistory }) => {
            this.transportHistory = transportHistory;
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
        if (this.transportHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.transportHistoryService.update(this.transportHistory));
        } else {
            this.subscribeToSaveResponse(this.transportHistoryService.create(this.transportHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransportHistory>>) {
        result.subscribe((res: HttpResponse<ITransportHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get transportHistory() {
        return this._transportHistory;
    }

    set transportHistory(transportHistory: ITransportHistory) {
        this._transportHistory = transportHistory;
    }
}
