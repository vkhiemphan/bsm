import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITransportUnit } from 'app/shared/model/transport-unit.model';
import { TransportUnitService } from './transport-unit.service';

@Component({
    selector: 'jhi-transport-unit-update',
    templateUrl: './transport-unit-update.component.html'
})
export class TransportUnitUpdateComponent implements OnInit {
    private _transportUnit: ITransportUnit;
    isSaving: boolean;

    constructor(private transportUnitService: TransportUnitService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transportUnit }) => {
            this.transportUnit = transportUnit;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transportUnit.id !== undefined) {
            this.subscribeToSaveResponse(this.transportUnitService.update(this.transportUnit));
        } else {
            this.subscribeToSaveResponse(this.transportUnitService.create(this.transportUnit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransportUnit>>) {
        result.subscribe((res: HttpResponse<ITransportUnit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get transportUnit() {
        return this._transportUnit;
    }

    set transportUnit(transportUnit: ITransportUnit) {
        this._transportUnit = transportUnit;
    }
}
