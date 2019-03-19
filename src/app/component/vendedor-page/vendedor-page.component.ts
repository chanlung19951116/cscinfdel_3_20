import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PAGE_STATE} from '../../define/enums';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatPaginator} from '@angular/material';
import {ApiService} from '../../service/api.service';
import {CommonService} from '../../service/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {catchError, debounceTime, distinctUntilChanged, finalize, tap} from 'rxjs/operators';
import {BehaviorSubject, fromEvent, Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';

@Component({
  selector: 'app-vendedor-page',
  templateUrl: './vendedor-page.component.html',
  styleUrls: ['./vendedor-page.component.scss']
})
export class VendedorPageComponent implements OnInit, AfterViewInit {

  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;

  public createForm: FormGroup;
  public editForm: FormGroup;

  selectedItem: any = {};

  displayedColumns: string[] = [
    'codigoVendedor',
    'Identificacion',
    'Nombres',
    'Apellidos',
    'Telefonos',
    'Direccion',
    'Edad',
    'Estado',
    'Sexo',
    'Actions',
  ];
  dataSource: VendedorDataSource;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10, 20, 50];

  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  constructor(
    private fb: FormBuilder,
    public apiService: ApiService,
    private common: CommonService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
  }


  ngOnInit() {

    this.dataSource = new VendedorDataSource(this.apiService, this.spinner);

    this.initForms();
  }


  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      identificacion: [null, Validators.compose([Validators.required])],
      nombres: [null, Validators.compose([Validators.required])],
      apellidos: [null, Validators.compose([Validators.required])],
      telefonos: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([Validators.required])],
      edad: [null, Validators.compose([Validators.required])],
      estado: [null, Validators.compose([Validators.required])],
      sexo: [null, Validators.compose([Validators.required])],
    };

    this.createForm = this.fb.group(controlsConfig);

    this.editForm = this.fb.group(controlsConfig);

  }

  initPaginator() {
    this.paginator.page
      .pipe(
        tap(() => this.loadData())
      )
      .subscribe();
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadData(false);
        })
      )
      .subscribe();
  }

  startCreating() {


    this.createForm.reset();
    this.createForm.markAsUntouched();


    this.state = PAGE_STATE.CREATING;
  }

  create() {

    const params = this.createForm.value;
    params.vendedorNombreCompleto = `${params.apellidos} ${params.nombres}`;

    this.spinner.show();

    this.apiService.vendedor.create(params).subscribe(() => {
        this.spinner.hide();
        this.toastr.success('Creado existosamente');
        this.state = PAGE_STATE.SHOWING;
        this.loadData();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });
  }

  startEditing(row) {

    this.selectedItem = row;

    this.editForm.patchValue({
      codigoVendedor: this.selectedItem.codigoVendedor,
      identificacion: this.selectedItem.identificacion,
      nombres: this.selectedItem.nombres,
      apellidos: this.selectedItem.apellidos,
      telefonos: this.selectedItem.telefonos,
      direccion: this.selectedItem.direccion,
      edad: this.selectedItem.edad,
      estado: this.selectedItem.estado,
      sexo: this.selectedItem.sexo,
    });

    this.editForm.markAsUntouched();

    this.state = PAGE_STATE.EDITING;
  }

  save() {

    const params = this.editForm.value;

    params.codigoVendedor = this.selectedItem.codigoVendedor;
    params.vendedorNombreCompleto = `${params.apellidos} ${params.nombres}`;

    this.spinner.show();
    this.apiService.vendedor.update(params).subscribe(() => {
        this.spinner.hide();
        this.toastr.success('Guardado exitoso');
        this.state = PAGE_STATE.SHOWING;
        this.loadData();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });
  }

  deleteItem(row) {

    this.selectedItem = row;

    this.deleteConfirmDialogRef = this.dialog.open(this.deleteConfirmDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });

  }

  public loadData(showSpinner = true) {

    this.dataSource.loadData(
      this.paginator.pageIndex || 0,
      this.paginator.pageSize || this.pageSizes[0],
      this.filter.nativeElement.value,
      showSpinner);
  }

  onDeleteConfirmDialogYes() {
    this.deleteConfirmDialogRef.close();

    this.spinner.show();

    this.spinner.show();

    this.apiService.vendedor.delete(this.selectedItem).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('Eliminado exitosamente');
        this.loadData();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });
  }

  onDeleteConfirmDialogNo() {
    this.deleteConfirmDialogRef.close();
  }


}


class VendedorDataSource implements DataSource<any> {

  private dataSubject = new BehaviorSubject<any[]>([]);
  public totalCount;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
  }

  loadData(pageIndex, pageSize, filter = '', showSpinner = true) {

    if (showSpinner) {
      this.spinner.show();
    }

    this.apiService.vendedor
      .getByPageAndFilter({
        pageNumber: pageIndex,
        pageSize: pageSize,
        filter: filter
      })
      .pipe(
        catchError(() => of({
          totalCount: 0,
          items: []
        })),
        finalize(() => this.spinner.hide())
      )
      .subscribe(data => {
        this.totalCount = data.totalCount;
        return this.dataSubject.next(data.items);
      });
  }

}

