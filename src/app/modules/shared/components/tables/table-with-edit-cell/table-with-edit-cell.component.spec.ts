import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TableWithEditCellComponent } from './table-with-edit-cell.component';
import { MatDialog } from '@angular/material/dialog';
import { Table } from '../../../models/table';
import { TableService } from '../../../services/tables/table.service';
import { of } from 'rxjs';
import { TestType } from 'src/app/modules/core/features/API/services/resource.service.spec';

describe('TableWithEditCellComponent', () => {
  let component: TableWithEditCellComponent<TestType>;
  const table = new Table<TestType>([], [], new TableService<TestType>);
  let fixture: ComponentFixture<TableWithEditCellComponent<TestType>>;
  let dialog: MatDialog;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TableWithEditCellComponent
      ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock }  
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(TableWithEditCellComponent<TestType>);
    component = fixture.componentInstance;
    component.table = table;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the component', () => {
      const spy = vi.spyOn(component as any, 'subscribe');
      component.ngOnInit();
      expect(component.dataSource).toBeTruthy();
      expect(spy).toHaveBeenCalled();
      expect(component.headers.length).toBe(0);
      expect(component.tableColumns.length).toBe(0);
      expect(component.displayedColumns.length).toBe(0);
      expect(component.dataTable).toBeTruthy();
    });
  });

  it('should emit clicked event when icon is clicked', () => {
    const clickedSpy = vi.spyOn(component.clicked, 'emit');
    const testItem = { id: 1, name: 'test' };
    component.iconClicked(testItem);
    expect(clickedSpy).toHaveBeenCalledWith(testItem);
  });



  describe('ngOnDestroy', () => {
    it('should unsubscribe from all subscriptions', () => {
      const subscription1 = of(null).subscribe();
      const subscription2 = of(null).subscribe();
      component.subscriptions.add(subscription1);
      component.subscriptions.add(subscription2);
      vi.spyOn(component.subscriptions, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
    });
  });

});

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of()
    };
  }
}
