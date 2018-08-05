/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportHistoryDetailComponent } from 'app/entities/transport-history/transport-history-detail.component';
import { TransportHistory } from 'app/shared/model/transport-history.model';

describe('Component Tests', () => {
    describe('TransportHistory Management Detail Component', () => {
        let comp: TransportHistoryDetailComponent;
        let fixture: ComponentFixture<TransportHistoryDetailComponent>;
        const route = ({ data: of({ transportHistory: new TransportHistory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransportHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transportHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
