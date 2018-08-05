import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportContractPart } from 'app/shared/model/transport-contract-part.model';

type EntityResponseType = HttpResponse<ITransportContractPart>;
type EntityArrayResponseType = HttpResponse<ITransportContractPart[]>;

@Injectable({ providedIn: 'root' })
export class TransportContractPartService {
    private resourceUrl = SERVER_API_URL + 'api/transport-contract-parts';

    constructor(private http: HttpClient) {}

    create(transportContractPart: ITransportContractPart): Observable<EntityResponseType> {
        return this.http.post<ITransportContractPart>(this.resourceUrl, transportContractPart, { observe: 'response' });
    }

    update(transportContractPart: ITransportContractPart): Observable<EntityResponseType> {
        return this.http.put<ITransportContractPart>(this.resourceUrl, transportContractPart, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITransportContractPart>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransportContractPart[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
