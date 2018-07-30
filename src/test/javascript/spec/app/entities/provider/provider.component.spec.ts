/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BuySaleManagerTestModule } from '../../../test.module';
import { ProviderComponent } from 'app/entities/provider/provider.component';
import { ProviderService } from 'app/entities/provider/provider.service';
import { Provider } from 'app/shared/model/provider.model';

describe('Component Tests', () => {
    describe('Provider Management Component', () => {
        let comp: ProviderComponent;
        let fixture: ComponentFixture<ProviderComponent>;
        let service: ProviderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BuySaleManagerTestModule],
                declarations: [ProviderComponent],
                providers: []
            })
                .overrideTemplate(ProviderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProviderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Provider(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.providers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
