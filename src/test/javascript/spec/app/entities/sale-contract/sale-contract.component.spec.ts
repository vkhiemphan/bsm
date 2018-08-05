/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { SaleContractComponent } from 'app/entities/sale-contract/sale-contract.component';
import { SaleContractService } from 'app/entities/sale-contract/sale-contract.service';
import { SaleContract } from 'app/shared/model/sale-contract.model';

describe('Component Tests', () => {
    describe('SaleContract Management Component', () => {
        let comp: SaleContractComponent;
        let fixture: ComponentFixture<SaleContractComponent>;
        let service: SaleContractService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [SaleContractComponent],
                providers: []
            })
                .overrideTemplate(SaleContractComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SaleContractComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SaleContractService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SaleContract(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.saleContracts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
