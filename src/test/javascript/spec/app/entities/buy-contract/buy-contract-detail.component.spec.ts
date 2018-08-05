/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { BuyContractDetailComponent } from 'app/entities/buy-contract/buy-contract-detail.component';
import { BuyContract } from 'app/shared/model/buy-contract.model';

describe('Component Tests', () => {
    describe('BuyContract Management Detail Component', () => {
        let comp: BuyContractDetailComponent;
        let fixture: ComponentFixture<BuyContractDetailComponent>;
        const route = ({ data: of({ buyContract: new BuyContract(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [BuyContractDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BuyContractDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BuyContractDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.buyContract).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
