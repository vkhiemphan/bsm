import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBuyContract } from 'app/shared/model/buy-contract.model';
import {IBuyContractForSale} from 'app/shared/model/buy-contract-for-sale.model';
import {IBuyContractWithSaleData} from 'app/shared/model/buy-contract-with-sale-data.model';

type EntityResponseType = HttpResponse<IBuyContract>;
type EntityArrayResponseType = HttpResponse<IBuyContract[]>;
type EntityWithSaleDataArrayResponseType = HttpResponse<IBuyContractWithSaleData[]>;

@Injectable({ providedIn: 'root' })
export class BuyContractService {
    private resourceUrl = SERVER_API_URL + 'api/buy-contracts';

    constructor(private http: HttpClient) {}

    create(buyContract: IBuyContract): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(buyContract);
        return this.http
            .post<IBuyContract>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(buyContract: IBuyContract): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(buyContract);
        return this.http
            .put<IBuyContract>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBuyContract>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    getAllBuyContractsForSaleContract(scId: number): Observable<EntityArrayResponseType> {
        return this.http
            .get<IBuyContractForSale[]>(`${this.resourceUrl}` + '/for-sale-contract/' + `${scId}`, { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getAllBuyContractsWithSaleData(): Observable<EntityWithSaleDataArrayResponseType> {
        return this.http
            .get<IBuyContractWithSaleData[]>(`${this.resourceUrl}` + '/get-all-with-sale-data/', { observe: 'response' })
            .pipe(map((res: EntityWithSaleDataArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBuyContract[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(buyContract: IBuyContract): IBuyContract {
        const copy: IBuyContract = Object.assign({}, buyContract, {
            contractDate:
                buyContract.contractDate != null && buyContract.contractDate.isValid() ? buyContract.contractDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.contractDate = res.body.contractDate != null ? moment(res.body.contractDate) : null;
        res.body.etaDate = res.body.etaDate != null ? moment(res.body.etaDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((buyContract: IBuyContract) => {
            buyContract.contractDate = buyContract.contractDate != null ? moment(buyContract.contractDate) : null;
            buyContract.etaDate = buyContract.etaDate != null ? moment(buyContract.etaDate) : null;
        });
        return res;
    }
}
