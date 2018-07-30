import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBuySaleRelation } from 'app/shared/model/buy-sale-relation.model';

type EntityResponseType = HttpResponse<IBuySaleRelation>;
type EntityArrayResponseType = HttpResponse<IBuySaleRelation[]>;

@Injectable({ providedIn: 'root' })
export class BuySaleRelationService {
    private resourceUrl = SERVER_API_URL + 'api/buy-sale-relations';

    constructor(private http: HttpClient) {}

    create(buySaleRelation: IBuySaleRelation): Observable<EntityResponseType> {
        return this.http.post<IBuySaleRelation>(this.resourceUrl, buySaleRelation, { observe: 'response' });
    }

    update(buySaleRelation: IBuySaleRelation): Observable<EntityResponseType> {
        return this.http.put<IBuySaleRelation>(this.resourceUrl, buySaleRelation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBuySaleRelation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBuySaleRelation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    saveSelectedGoodResources(scId: number, buyContactsForSale: any[]): Observable<EntityArrayResponseType> {
        return this.http
            .post<IBuySaleRelation[]>(`${this.resourceUrl}` + '/save-selected-good-resources/' + `${scId}`, buyContactsForSale, { observe: 'response' });
    }

    findAllBySaleContract(scId: number): Observable<EntityArrayResponseType> {
        return this.http.get<IBuySaleRelation[]>(`${this.resourceUrl}` + '/get-all-by-sale-contract/' + `${scId}`, { observe: 'response' });
    }

    findAllByBuyContract(bcId: number): Observable<EntityArrayResponseType> {
        return this.http.get<IBuySaleRelation[]>(`${this.resourceUrl}` + '/get-all-by-buy-contract/' + `${bcId}`, { observe: 'response' });
    }
}
