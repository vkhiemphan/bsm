import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITransportContract } from 'app/shared/model/transport-contract.model';
import { TransportContractService } from './transport-contract.service';
import { ITransportUnit } from 'app/shared/model/transport-unit.model';
import { TransportUnitService } from 'app/entities/transport-unit';

@Component({
    selector: 'jhi-transport-contract-update',
    templateUrl: './transport-contract-update.component.html'
})
export class TransportContractUpdateComponent implements OnInit {
    private _transportContract: ITransportContract;
    isSaving: boolean;

    transportunits: ITransportUnit[];
    contractDateDp: any;
    startDateDp: any;
    finishDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private transportContractService: TransportContractService,
        private transportUnitService: TransportUnitService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transportContract }) => {
            this.transportContract = transportContract;
        });
        this.transportUnitService.query().subscribe(
            (res: HttpResponse<ITransportUnit[]>) => {
                this.transportunits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transportContract.id !== undefined) {
            this.subscribeToSaveResponse(this.transportContractService.update(this.transportContract));
        } else {
            this.subscribeToSaveResponse(this.transportContractService.create(this.transportContract));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransportContract>>) {
        result.subscribe((res: HttpResponse<ITransportContract>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTransportUnitById(index: number, item: ITransportUnit) {
        return item.id;
    }
    get transportContract() {
        return this._transportContract;
    }

    set transportContract(transportContract: ITransportContract) {
        this._transportContract = transportContract;
    }
}
