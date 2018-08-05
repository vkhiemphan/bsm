/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { BuyContractUpdateComponent } from 'app/entities/buy-contract/buy-contract-update.component';
import { BuyContractService } from 'app/entities/buy-contract/buy-contract.service';
import { BuyContract } from 'app/shared/model/buy-contract.model';

describe('Component Tests', () => {
    describe('BuyContract Management Update Component', () => {
        let comp: BuyContractUpdateComponent;
        let fixture: ComponentFixture<BuyContractUpdateComponent>;
        let service: BuyContractService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [BuyContractUpdateComponent]
            })
                .overrideTemplate(BuyContractUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BuyContractUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BuyContractService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BuyContract(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.buyContract = entity;
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
                    const entity = new BuyContract();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.buyContract = entity;
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
