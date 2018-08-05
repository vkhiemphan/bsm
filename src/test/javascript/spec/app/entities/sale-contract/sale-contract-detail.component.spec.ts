/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { SaleContractDetailComponent } from 'app/entities/sale-contract/sale-contract-detail.component';
import { SaleContract } from 'app/shared/model/sale-contract.model';

describe('Component Tests', () => {
    describe('SaleContract Management Detail Component', () => {
        let comp: SaleContractDetailComponent;
        let fixture: ComponentFixture<SaleContractDetailComponent>;
        const route = ({ data: of({ saleContract: new SaleContract(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [SaleContractDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SaleContractDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SaleContractDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.saleContract).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
