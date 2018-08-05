import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportContract } from 'app/shared/model/transport-contract.model';

type EntityResponseType = HttpResponse<ITransportContract>;
type EntityArrayResponseType = HttpResponse<ITransportContract[]>;

@Injectable({ providedIn: 'root' })
export class TransportContractService {
    private resourceUrl = SERVER_API_URL + 'api/transport-contracts';

    constructor(private http: HttpClient) {}

    create(transportContract: ITransportContract): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transportContract);
        return this.http
            .post<ITransportContract>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(transportContract: ITransportContract): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transportContract);
        return this.http
            .put<ITransportContract>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransportContract>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransportContract[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(transportContract: ITransportContract): ITransportContract {
        const copy: ITransportContract = Object.assign({}, transportContract, {
            contractDate:
                transportContract.contractDate != null && transportContract.contractDate.isValid()
                    ? transportContract.contractDate.format(DATE_FORMAT)
                    : null,
            startDate:
                transportContract.startDate != null && transportContract.startDate.isValid()
                    ? transportContract.startDate.format(DATE_FORMAT)
                    : null,
            finishDate:
                transportContract.finishDate != null && transportContract.finishDate.isValid()
                    ? transportContract.finishDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.contractDate = res.body.contractDate != null ? moment(res.body.contractDate) : null;
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.finishDate = res.body.finishDate != null ? moment(res.body.finishDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((transportContract: ITransportContract) => {
            transportContract.contractDate = transportContract.contractDate != null ? moment(transportContract.contractDate) : null;
            transportContract.startDate = transportContract.startDate != null ? moment(transportContract.startDate) : null;
            transportContract.finishDate = transportContract.finishDate != null ? moment(transportContract.finishDate) : null;
        });
        return res;
    }
}
