import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISaleContact } from 'app/shared/model/sale-contact.model';

type EntityResponseType = HttpResponse<ISaleContact>;
type EntityArrayResponseType = HttpResponse<ISaleContact[]>;

@Injectable({ providedIn: 'root' })
export class SaleContactService {
    private resourceUrl = SERVER_API_URL + 'api/sale-contacts';

    constructor(private http: HttpClient) {}

    create(saleContact: ISaleContact): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(saleContact);
        return this.http
            .post<ISaleContact>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(saleContact: ISaleContact): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(saleContact);
        return this.http
            .put<ISaleContact>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISaleContact>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISaleContact[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(saleContact: ISaleContact): ISaleContact {
        const copy: ISaleContact = Object.assign({}, saleContact, {
            contactDate:
                saleContact.contactDate != null && saleContact.contactDate.isValid() ? saleContact.contactDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.contactDate = res.body.contactDate != null ? moment(res.body.contactDate) : null;
        res.body.deliveryDate = res.body.deliveryDate != null ? moment(res.body.deliveryDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((saleContact: ISaleContact) => {
            saleContact.contactDate = saleContact.contactDate != null ? moment(saleContact.contactDate) : null;
            saleContact.deliveryDate = saleContact.deliveryDate != null ? moment(saleContact.deliveryDate) : null;
        });
        return res;
    }
}
