import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportContractPart } from 'app/shared/model/transport-contract-part.model';

@Component({
    selector: 'jhi-transport-contract-part-detail',
    templateUrl: './transport-contract-part-detail.component.html'
})
export class TransportContractPartDetailComponent implements OnInit {
    transportContractPart: ITransportContractPart;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportContractPart }) => {
            this.transportContractPart = transportContractPart;
        });
    }

    previousState() {
        window.history.back();
    }
}
