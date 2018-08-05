import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportPlan } from 'app/shared/model/transport-plan.model';

type EntityResponseType = HttpResponse<ITransportPlan>;
type EntityArrayResponseType = HttpResponse<ITransportPlan[]>;

@Injectable({ providedIn: 'root' })
export class TransportPlanService {
    private resourceUrl = SERVER_API_URL + 'api/transport-plans';

    constructor(private http: HttpClient) {}

    create(transportPlan: ITransportPlan): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transportPlan);
        return this.http
            .post<ITransportPlan>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(transportPlan: ITransportPlan): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transportPlan);
        return this.http
            .put<ITransportPlan>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransportPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransportPlan[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(transportPlan: ITransportPlan): ITransportPlan {
        const copy: ITransportPlan = Object.assign({}, transportPlan, {
            transportDate:
                transportPlan.transportDate != null && transportPlan.transportDate.isValid()
                    ? transportPlan.transportDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.transportDate = res.body.transportDate != null ? moment(res.body.transportDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((transportPlan: ITransportPlan) => {
            transportPlan.transportDate = transportPlan.transportDate != null ? moment(transportPlan.transportDate) : null;
        });
        return res;
    }
}
