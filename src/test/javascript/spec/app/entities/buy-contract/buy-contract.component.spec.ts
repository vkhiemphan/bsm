/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { BuyContractComponent } from 'app/entities/buy-contract/buy-contract.component';
import { BuyContractService } from 'app/entities/buy-contract/buy-contract.service';
import { BuyContract } from 'app/shared/model/buy-contract.model';

describe('Component Tests', () => {
    describe('BuyContract Management Component', () => {
        let comp: BuyContractComponent;
        let fixture: ComponentFixture<BuyContractComponent>;
        let service: BuyContractService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [BuyContractComponent],
                providers: []
            })
                .overrideTemplate(BuyContractComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BuyContractComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BuyContractService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BuyContract(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.buyContracts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
