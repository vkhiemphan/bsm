/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportContractPartComponent } from 'app/entities/transport-contract-part/transport-contract-part.component';
import { TransportContractPartService } from 'app/entities/transport-contract-part/transport-contract-part.service';
import { TransportContractPart } from 'app/shared/model/transport-contract-part.model';

describe('Component Tests', () => {
    describe('TransportContractPart Management Component', () => {
        let comp: TransportContractPartComponent;
        let fixture: ComponentFixture<TransportContractPartComponent>;
        let service: TransportContractPartService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportContractPartComponent],
                providers: []
            })
                .overrideTemplate(TransportContractPartComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportContractPartComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportContractPartService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TransportContractPart(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transportContractParts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
