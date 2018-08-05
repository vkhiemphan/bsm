/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportHistoryComponent } from 'app/entities/transport-history/transport-history.component';
import { TransportHistoryService } from 'app/entities/transport-history/transport-history.service';
import { TransportHistory } from 'app/shared/model/transport-history.model';

describe('Component Tests', () => {
    describe('TransportHistory Management Component', () => {
        let comp: TransportHistoryComponent;
        let fixture: ComponentFixture<TransportHistoryComponent>;
        let service: TransportHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportHistoryComponent],
                providers: []
            })
                .overrideTemplate(TransportHistoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportHistoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TransportHistory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transportHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
