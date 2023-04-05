import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let store: MockStore;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore(),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('closeModal', () => {
    it('should emit modalClose event', (done) => {
      let storeSpy = spyOn(store, 'dispatch').and.callThrough();

      component.close();
      fixture.detectChanges();
      expect(storeSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should set styles to modal-small when size is small', () => {
    component.size = 'small';
    component.ngOnInit();
    expect(component.styles).toEqual('modal modal-small');
  });

  it('should set styles to modal-medium when size is medium', () => {
    component.size = 'medium';
    component.ngOnInit();
    expect(component.styles).toEqual('modal modal-medium');
  });
});
