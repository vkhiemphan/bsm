import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITransportContractPart } from 'app/shared/model/transport-contract-part.model';
import { TransportContractPartService } from './transport-contract-part.service';
import { ISaleContract } from 'app/shared/model/sale-contract.model';
import { SaleContractService } from 'app/entities/sale-contract';
import { ITransportContract } from 'app/shared/model/transport-contract.model';
import { TransportContractService } from 'app/entities/transport-contract';
import { IPosition } from 'app/shared/model/position.model';
import { PositionService } from 'app/entities/position';

@Component({
    selector: 'jhi-transport-contract-part-update',
    templateUrl: './transport-contract-part-update.component.html'
})
export class TransportContractPartUpdateComponent implements OnInit {
    private _transportContractPart: ITransportContractPart;
    isSaving: boolean;

    salecontracts: ISaleContract[];

    transportcontracts: ITransportContract[];

    positions: IPosition[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private transportContractPartService: TransportContractPartService,
        private saleContractService: SaleContractService,
        private transportContractService: TransportContractService,
        private positionService: PositionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transportContractPart }) => {
            this.transportContractPart = transportContractPart;
        });
        this.saleContractService.query().subscribe(
            (res: HttpResponse<ISaleContract[]>) => {
                this.salecontracts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.transportContractService.query().subscribe(
            (res: HttpResponse<ITransportContract[]>) => {
                this.transportcontracts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.positionService.query().subscribe(
            (res: HttpResponse<IPosition[]>) => {
                this.positions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transportContractPart.id !== undefined) {
            this.subscribeToSaveResponse(this.transportContractPartService.update(this.transportContractPart));
        } else {
            this.subscribeToSaveResponse(this.transportContractPartService.create(this.transportContractPart));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransportContractPart>>) {
        result.subscribe(
            (res: HttpResponse<ITransportContractPart>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackSaleContractById(index: number, item: ISaleContract) {
        return item.id;
    }

    trackTransportContractById(index: number, item: ITransportContract) {
        return item.id;
    }

    trackPositionById(index: number, item: IPosition) {
        return item.id;
    }
    get transportContractPart() {
        return this._transportContractPart;
    }

    set transportContractPart(transportContractPart: ITransportContractPart) {
        this._transportContractPart = transportContractPart;
    }
}
