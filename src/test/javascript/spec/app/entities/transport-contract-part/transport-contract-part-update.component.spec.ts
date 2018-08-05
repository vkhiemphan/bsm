/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { TransportContractPartUpdateComponent } from 'app/entities/transport-contract-part/transport-contract-part-update.component';
import { TransportContractPartService } from 'app/entities/transport-contract-part/transport-contract-part.service';
import { TransportContractPart } from 'app/shared/model/transport-contract-part.model';

describe('Component Tests', () => {
    describe('TransportContractPart Management Update Component', () => {
        let comp: TransportContractPartUpdateComponent;
        let fixture: ComponentFixture<TransportContractPartUpdateComponent>;
        let service: TransportContractPartService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [TransportContractPartUpdateComponent]
            })
                .overrideTemplate(TransportContractPartUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransportContractPartUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransportContractPartService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransportContractPart(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportContractPart = entity;
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
                    const entity = new TransportContractPart();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transportContractPart = entity;
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
