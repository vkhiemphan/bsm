import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportHistory } from 'app/shared/model/transport-history.model';

@Component({
    selector: 'jhi-transport-history-detail',
    templateUrl: './transport-history-detail.component.html'
})
export class TransportHistoryDetailComponent implements OnInit {
    transportHistory: ITransportHistory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportHistory }) => {
            this.transportHistory = transportHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
