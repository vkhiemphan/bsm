/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportContractComponent } from 'app/entities/transport-contract/transport-contract.component';
import { TransportContractService } from 'app/entities/transport-contract/transport-contract.service';
import { TransportContract } from 'app/shared/model/transport-contract.model';

describe('Component Tests', () => {
    describe('TransportContract Management Component', () => {
        let comp: TransportContractComponent;
        let fixture: ComponentFixture<TransportContractComponent>;
        let service: TransportContractService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportContractComponent],
                providers: []
            })
                .overrideTemplate(TransportContractComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportContractComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportContractService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TransportContract(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transportContracts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
