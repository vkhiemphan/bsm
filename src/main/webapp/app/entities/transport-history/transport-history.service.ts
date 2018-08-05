import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportHistory } from 'app/shared/model/transport-history.model';

type EntityResponseType = HttpResponse<ITransportHistory>;
type EntityArrayResponseType = HttpResponse<ITransportHistory[]>;

@Injectable({ providedIn: 'root' })
export class TransportHistoryService {
    private resourceUrl = SERVER_API_URL + 'api/transport-histories';

    constructor(private http: HttpClient) {}

    create(transportHistory: ITransportHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transportHistory);
        return this.http
            .post<ITransportHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(transportHistory: ITransportHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transportHistory);
        return this.http
            .put<ITransportHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransportHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransportHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(transportHistory: ITransportHistory): ITransportHistory {
        const copy: ITransportHistory = Object.assign({}, transportHistory, {
            transportDate:
                transportHistory.transportDate != null && transportHistory.transportDate.isValid()
                    ? transportHistory.transportDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.transportDate = res.body.transportDate != null ? moment(res.body.transportDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((transportHistory: ITransportHistory) => {
            transportHistory.transportDate = transportHistory.transportDate != null ? moment(transportHistory.transportDate) : null;
        });
        return res;
    }
}
