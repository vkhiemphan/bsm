/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { SaleContractUpdateComponent } from 'app/entities/sale-contract/sale-contract-update.component';
import { SaleContractService } from 'app/entities/sale-contract/sale-contract.service';
import { SaleContract } from 'app/shared/model/sale-contract.model';

describe('Component Tests', () => {
    describe('SaleContract Management Update Component', () => {
        let comp: SaleContractUpdateComponent;
        let fixture: ComponentFixture<SaleContractUpdateComponent>;
        let service: SaleContractService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [SaleContractUpdateComponent]
            })
                .overrideTemplate(SaleContractUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SaleContractUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SaleContractService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SaleContract(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.saleContract = entity;
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
                    const entity = new SaleContract();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.saleContract = entity;
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
