/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportContractUpdateComponent } from 'app/entities/transport-contract/transport-contract-update.component';
import { TransportContractService } from 'app/entities/transport-contract/transport-contract.service';
import { TransportContract } from 'app/shared/model/transport-contract.model';

describe('Component Tests', () => {
    describe('TransportContract Management Update Component', () => {
        let comp: TransportContractUpdateComponent;
        let fixture: ComponentFixture<TransportContractUpdateComponent>;
        let service: TransportContractService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportContractUpdateComponent]
            })
                .overrideTemplate(TransportContractUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportContractUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportContractService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransportContract(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportContract = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransportContract();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportContract = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
