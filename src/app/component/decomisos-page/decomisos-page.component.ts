import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PAGE_STATE} from '../../define/enums';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatDialog, MatPaginator} from '@angular/material';
import {ApiService} from '../../service/api.service';
import {CommonService} from '../../service/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, fromEvent, Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';
import * as moment from 'moment';


@Component({
  selector: 'app-decomisos-page',
  templateUrl: './decomisos-page.component.html',
  styleUrls: ['./decomisos-page.component.scss']
})
export class DecomisosPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    tipoProcedimientoList: [],
    lugarDonacionList: [],
    parroquiaList: [],
    datosGeoReferenciacionList: []
  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;
  productosDecomisadosCreateForm: FormGroup;

  selectedItem: any = undefined;

  selectedVendedor: any = undefined;
  @ViewChild('vendedorSelectDialog') vendedorSelectDialogTemplateRef;
  vendedorSelectDialogRef: any;
  vendedorSelectFilterKeyCtrl = new FormControl();
  vendedorFiltered: Observable<any[]>;

  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'dcCodigoUnico',
    'dcActaRetiro',
    'dcCodigoVendedor',
    'dcDireccionInfraccion',
    'dcFechaInfraccion',
    'dcHora',
    'dcMinutos',
    'dcCodigoTipoProcedimiento',
    'dcPoseeCarnetMunicipal',
    'dcImpugnacion',
    'dcProductoEnDonacion',
    'dcCodigoLugarDonacion',
    'dcCodigoParroquia',
    'dcFechaIngreso',
    'dcGeoReferenciacion',
    'dcCodigoGeo',
    'dcEstado',
    'Actions',
  ];

  dataSource: DecomisosDataSource;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10, 20, 50];

  @ViewChild('productosDecomisadosDialog') productosDecomisadosDialogTemplateRef;
  productosDecomisadosDialogRef: any;

  productoDecomisadoFiltered: Observable<any[]>;
  selectedProductosDecomisadosList: any;



  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public common: CommonService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.dataSource = new DecomisosDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      dcActaRetiro: [null, Validators.compose([Validators.required])],
      dcCodigoVendedor: [null, Validators.compose([Validators.required])],
      dcDireccionInfraccion: [null, Validators.compose([Validators.required])],
      dcFechaInfraccion: [null, Validators.compose([Validators.required])],
      dcHora: [null, Validators.compose([Validators.required])],
      dcMinutos: [null, Validators.compose([Validators.required])],
      dcCodigoTipoProcedimiento: [null, Validators.compose([Validators.required])],
      dcPoseeCarnetMunicipal: [null, Validators.compose([Validators.required])],
      dcImpugnacion: [null, Validators.compose([Validators.required])],
      dcProductoEnDonacion: [null, Validators.compose([Validators.required])],
      dcCodigoLugarDonacion: [null, Validators.compose([Validators.required])],
      dcCodigoParroquia: [null, Validators.compose([Validators.required])],
      dcFechaIngreso: [null, Validators.compose([Validators.required])],
      dcGeoReferenciacion: [null, Validators.compose([Validators.required])],
      dcCodigoGeo: [null, Validators.compose([Validators.required])],
      dcEstado: [null, Validators.compose([Validators.required])],
    };

    this.createForm = this.fb.group(controlsConfig);

    this.editForm = this.fb.group(controlsConfig);

    this.productosDecomisadosCreateForm = this.fb.group({
      productoDecomisado: [null, Validators.compose([Validators.required])],
      pdCantidad: [null, Validators.compose([Validators.required])],
      pdValor: [null, Validators.compose([Validators.required])],
      pdDadoDonacion: [null, Validators.compose([Validators.required])],
    });

    this.createForm.controls['dcGeoReferenciacion'].valueChanges.subscribe((value) => {
      const codigoGeoControl = this.createForm.controls['dcCodigoGeo'];
      if (value === 1) {
        codigoGeoControl.setValidators([Validators.compose([Validators.required])]);
      } else {
        codigoGeoControl.setValidators([]);
      }
      codigoGeoControl.updateValueAndValidity();
    });

    this.editForm.controls['dcGeoReferenciacion'].valueChanges.subscribe((value) => {
      const codigoGeoControl = this.editForm.controls['dcCodigoGeo'];
      if (value === 1) {
        codigoGeoControl.setValidators([Validators.compose([Validators.required])]);
      } else {
        codigoGeoControl.setValidators([]);
      }
      codigoGeoControl.updateValueAndValidity();
    });
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

    this.selectedItem = {};
    this.selectedItem.productosDecomisadosList = [];

    this.loadRelatedData(() => {

      this.createForm.reset();
      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });

  }

  create() {


    const params = this.createForm.value;

    params.dcFechaInfraccion = moment(params.dcFechaInfraccion).format('YYYY-MM-DD');
    params.dcFechaIngreso = moment(params.dcFechaIngreso).format('YYYY-MM-DD');

    params.productosDecomisadosList = this.selectedProductosDecomisadosList || [];

    params.dcCodigoVendedor = this.selectedItem.vendedor.codigoVendedor;

    this.spinner.show();
    this.apiService.decomisos.create(params).subscribe(() => {
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

    this.loadRelatedData(() => {
      this.selectedItem = row;

      this.editForm.patchValue({
        dcActaRetiro: this.selectedItem.dcActaRetiro,
        dcCodigoVendedor:
          `${this.selectedItem.dcCodigoVendedor} (${this.selectedItem.vendedor.apellidos} ${this.selectedItem.vendedor.nombres})`,
        dcDireccionInfraccion: this.selectedItem.dcDireccionInfraccion,
        dcFechaInfraccion: new Date(this.selectedItem.dcFechaInfraccion),
        dcHora: this.selectedItem.dcHora,
        dcMinutos: this.selectedItem.dcMinutos,
        dcCodigoTipoProcedimiento: this.selectedItem.dcCodigoTipoProcedimiento,
        dcPoseeCarnetMunicipal: this.selectedItem.dcPoseeCarnetMunicipal,
        dcImpugnacion: this.selectedItem.dcImpugnacion,
        dcProductoEnDonacion: this.selectedItem.dcProductoEnDonacion,
        dcCodigoLugarDonacion: this.selectedItem.dcCodigoLugarDonacion,
        dcCodigoParroquia: this.selectedItem.dcCodigoParroquia,
        dcFechaIngreso: new Date(this.selectedItem.dcFechaIngreso),
        dcGeoReferenciacion: this.selectedItem.dcGeoReferenciacion,
        dcCodigoGeo: this.selectedItem.dcCodigoGeo,
        dcEstado: this.selectedItem.dcEstado,
      });
      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.dcCodigoUnico = this.selectedItem.dcCodigoUnico;
    params.dcFechaInfraccion = moment(params.dcFechaInfraccion).format('YYYY-MM-DD');
    params.dcFechaIngreso = moment(params.dcFechaIngreso).format('YYYY-MM-DD');
    params.productosDecomisadosList = this.selectedProductosDecomisadosList || [];
    params.dcCodigoVendedor = this.selectedItem.vendedor.codigoVendedor;


    this.spinner.show();
    this.apiService.decomisos.update(params).subscribe(() => {
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

  onDeleteConfirmDialogYes() {
    this.deleteConfirmDialogRef.close();

    this.spinner.show();

    this.apiService.decomisos.delete(this.selectedItem).subscribe(
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


  public loadData(showSpinner = true) {

    this.dataSource.loadData(
      this.paginator.pageIndex || 0,
      this.paginator.pageSize || this.pageSizes[0],
      this.filter.nativeElement.value,
      showSpinner);
  }

  public loadRelatedData(finishedCallback) {

    this.spinner.show();

    this.apiService.pageData.decomisos().subscribe(
      (response: any) => {
        this.spinner.hide();

        this.pageData = response;

        finishedCallback();

      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });
  }


  openProductosDecomisadosDialog() {

    this.selectedProductosDecomisadosList = this.selectedItem.productosDecomisadosList;

    this.productosDecomisadosCreateForm.reset();
    this.productosDecomisadosCreateForm.markAsUntouched();

    this.productoDecomisadoFiltered = this.productosDecomisadosCreateForm.controls['productoDecomisado'].valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.codigo || value === '') {
            return of([]);
          }
          return this.apiService.productoDecomisado.autoComplete({
            key: value.toLowerCase()
          });
        })
      );


    this.productosDecomisadosDialogRef = this.dialog.open(this.productosDecomisadosDialogTemplateRef, {
      width: '800px',
      disableClose: true
    });
  }

  createProductosDecomisados() {

    const productosDecomisados = this.productosDecomisadosCreateForm.value;

    if (!productosDecomisados.productoDecomisado.codigo) {
      return;
    }

    productosDecomisados.id = {
      pdCodigoUnico: this.selectedItem.dcCodigoUnico,
      productoDecomisadoCodigo: productosDecomisados.productoDecomisado.codigo
    };
    let found = false;

    for (const item of this.selectedProductosDecomisadosList) {
      if (item.id.pdCodigoUnico === productosDecomisados.id.pdCodigoUnico &&
        item.id.productoDecomisadoCodigo === productosDecomisados.id.productoDecomisadoCodigo) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.selectedProductosDecomisadosList.push(productosDecomisados);
    }

  }

  productoDecomisadoAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.descripcion}`;
    }
  }

  onProductoDecomisadoSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.productosDecomisadosCreateForm.controls['productoDecomisado'].setValue(event.option.value);
  }

  onProductosDecomisadosDialogDialogOk() {
    this.selectedItem.productosDecomisadosList = this.selectedProductosDecomisadosList;
    this.productosDecomisadosDialogRef.close();
  }

  onProductosDecomisadosDialogDialogCancel() {
    this.productosDecomisadosDialogRef.close();

  }


  // =======================

  vendedorAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.apellidos} ${item.nombres}`;
    }
  }


  openVendedorSelectDialog() {

    this.selectedVendedor = this.selectedItem.vendedor;

    this.vendedorFiltered = this.vendedorSelectFilterKeyCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.codigoVendedor || value === '') {
            return of([]);
          }
          return this.apiService.vendedor.autoComplete({
            key: value.toLowerCase()
          });
        })
      );

    this.vendedorSelectFilterKeyCtrl.setValue('');

    this.vendedorSelectDialogRef = this.dialog.open(this.vendedorSelectDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });
  }

  onVendedorSelectDialogOk() {
    if (!this.selectedVendedor) {
      this.toastr.warning('Seleccionar vendedor.');
      return;
    }
    this.selectedItem.vendedor = this.selectedVendedor;
    this.selectedItem.dcCodigoVendedor = this.selectedItem.vendedor.codigoVendedor;

    const value2Patch = {
      dcCodigoVendedor:
        `${this.selectedItem.dcCodigoVendedor} (${this.selectedItem.vendedor.apellidos} ${this.selectedItem.vendedor.nombres})`
    };

    this.createForm.patchValue(value2Patch);
    this.editForm.patchValue(value2Patch);

    this.vendedorSelectDialogRef.close();
  }

  onVendedorSelectDialogCancel() {
    this.vendedorSelectDialogRef.close();

  }

  onVendedorSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedVendedor = event.option.value;
  }
}


class DecomisosDataSource implements DataSource<any> {

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

    this.apiService.decomisos
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

