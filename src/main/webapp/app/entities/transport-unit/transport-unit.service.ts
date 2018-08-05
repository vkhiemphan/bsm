import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportUnit } from 'app/shared/model/transport-unit.model';

type EntityResponseType = HttpResponse<ITransportUnit>;
type EntityArrayResponseType = HttpResponse<ITransportUnit[]>;

@Injectable({ providedIn: 'root' })
export class TransportUnitService {
    private resourceUrl = SERVER_API_URL + 'api/transport-units';

    constructor(private http: HttpClient) {}

    create(transportUnit: ITransportUnit): Observable<EntityResponseType> {
        return this.http.post<ITransportUnit>(this.resourceUrl, transportUnit, { observe: 'response' });
    }

    update(transportUnit: ITransportUnit): Observable<EntityResponseType> {
        return this.http.put<ITransportUnit>(this.resourceUrl, transportUnit, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITransportUnit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransportUnit[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
