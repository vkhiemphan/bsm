/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { BuySaleRelationComponent } from 'app/entities/buy-sale-relation/buy-sale-relation.component';
import { BuySaleRelationService } from 'app/entities/buy-sale-relation/buy-sale-relation.service';
import { BuySaleRelation } from 'app/shared/model/buy-sale-relation.model';

describe('Component Tests', () => {
    describe('BuySaleRelation Management Component', () => {
        let comp: BuySaleRelationComponent;
        let fixture: ComponentFixture<BuySaleRelationComponent>;
        let service: BuySaleRelationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [BuySaleRelationComponent],
                providers: []
            })
                .overrideTemplate(BuySaleRelationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BuySaleRelationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BuySaleRelationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BuySaleRelation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.buySaleRelations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
