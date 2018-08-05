import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISaleContract } from 'app/shared/model/sale-contract.model';

type EntityResponseType = HttpResponse<ISaleContract>;
type EntityArrayResponseType = HttpResponse<ISaleContract[]>;

@Injectable({ providedIn: 'root' })
export class SaleContractService {
    private resourceUrl = SERVER_API_URL + 'api/sale-contracts';

    constructor(private http: HttpClient) {}

    create(saleContract: ISaleContract): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(saleContract);
        return this.http
            .post<ISaleContract>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(saleContract: ISaleContract): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(saleContract);
        return this.http
            .put<ISaleContract>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISaleContract>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISaleContract[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(saleContract: ISaleContract): ISaleContract {
        const copy: ISaleContract = Object.assign({}, saleContract, {
            contractDate:
                saleContract.contractDate != null && saleContract.contractDate.isValid() ? saleContract.contractDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.contractDate = res.body.contractDate != null ? moment(res.body.contractDate) : null;
        res.body.deliveryDate = res.body.deliveryDate != null ? moment(res.body.deliveryDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((saleContract: ISaleContract) => {
            saleContract.contractDate = saleContract.contractDate != null ? moment(saleContract.contractDate) : null;
            saleContract.deliveryDate = saleContract.deliveryDate != null ? moment(saleContract.deliveryDate) : null;
        });
        return res;
    }
}
