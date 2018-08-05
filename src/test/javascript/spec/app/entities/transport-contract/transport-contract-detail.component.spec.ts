/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportContractDetailComponent } from 'app/entities/transport-contract/transport-contract-detail.component';
import { TransportContract } from 'app/shared/model/transport-contract.model';

describe('Component Tests', () => {
    describe('TransportContract Management Detail Component', () => {
        let comp: TransportContractDetailComponent;
        let fixture: ComponentFixture<TransportContractDetailComponent>;
        const route = ({ data: of({ transportContract: new TransportContract(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportContractDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransportContractDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransportContractDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transportContract).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
