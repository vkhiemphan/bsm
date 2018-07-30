/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuySaleManagerTestModule } from '../../../test.module';
import { BuySaleRelationDetailComponent } from 'app/entities/buy-sale-relation/buy-sale-relation-detail.component';
import { BuySaleRelation } from 'app/shared/model/buy-sale-relation.model';

describe('Component Tests', () => {
    describe('BuySaleRelation Management Detail Component', () => {
        let comp: BuySaleRelationDetailComponent;
        let fixture: ComponentFixture<BuySaleRelationDetailComponent>;
        const route = ({ data: of({ buySaleRelation: new BuySaleRelation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [BuySaleRelationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BuySaleRelationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BuySaleRelationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.buySaleRelation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
