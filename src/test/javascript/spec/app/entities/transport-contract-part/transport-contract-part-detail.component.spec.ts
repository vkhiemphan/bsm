/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportContractPartDetailComponent } from 'app/entities/transport-contract-part/transport-contract-part-detail.component';
import { TransportContractPart } from 'app/shared/model/transport-contract-part.model';

describe('Component Tests', () => {
    describe('TransportContractPart Management Detail Component', () => {
        let comp: TransportContractPartDetailComponent;
        let fixture: ComponentFixture<TransportContractPartDetailComponent>;
        const route = ({ data: of({ transportContractPart: new TransportContractPart(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportContractPartDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransportContractPartDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportContractPartDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transportContractPart).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
