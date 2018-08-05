import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportContract } from 'app/shared/model/transport-contract.model';

@Component({
    selector: 'jhi-transport-contract-detail',
    templateUrl: './transport-contract-detail.component.html'
})
export class TransportContractDetailComponent implements OnInit {
    transportContract: ITransportContract;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportContract }) => {
            this.transportContract = transportContract;
        });
    }

    previousState() {
        window.history.back();
    }
}
