import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBuyContact } from 'app/shared/model/buy-contact.model';
import {IBuyContactForSale} from 'app/shared/model/buy-contact-for-sale.model';
import {IBuyContactWithSaleData} from 'app/shared/model/buy-contact-with-sale-data.model';

type EntityResponseType = HttpResponse<IBuyContact>;
type EntityArrayResponseType = HttpResponse<IBuyContact[]>;
type EntityWithSaleDataArrayResponseType = HttpResponse<IBuyContactWithSaleData[]>;

@Injectable({ providedIn: 'root' })
export class BuyContactService {
    private resourceUrl = SERVER_API_URL + 'api/buy-contacts';

    constructor(private http: HttpClient) {}

    create(buyContact: IBuyContact): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(buyContact);
        return this.http
            .post<IBuyContact>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(buyContact: IBuyContact): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(buyContact);
        return this.http
            .put<IBuyContact>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBuyContact>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    getAllBuyContactsForSaleContact(scId: number): Observable<EntityArrayResponseType> {
        return this.http
            .get<IBuyContactForSale[]>(`${this.resourceUrl}` + '/for-sale-contact/' + `${scId}`, { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getAllBuyContactsWithSaleData(): Observable<EntityWithSaleDataArrayResponseType> {
        return this.http
            .get<IBuyContactWithSaleData[]>(`${this.resourceUrl}` + '/get-all-with-sale-data/', { observe: 'response' })
            .pipe(map((res: EntityWithSaleDataArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBuyContact[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(buyContact: IBuyContact): IBuyContact {
        const copy: IBuyContact = Object.assign({}, buyContact, {
            contactDate:
                buyContact.contactDate != null && buyContact.contactDate.isValid() ? buyContact.contactDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.contactDate = res.body.contactDate != null ? moment(res.body.contactDate) : null;
        res.body.etaDate = res.body.etaDate != null ? moment(res.body.etaDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((buyContact: IBuyContact) => {
            buyContact.contactDate = buyContact.contactDate != null ? moment(buyContact.contactDate) : null;
            buyContact.etaDate = buyContact.etaDate != null ? moment(buyContact.etaDate) : null;
        });
        return res;
    }
}
