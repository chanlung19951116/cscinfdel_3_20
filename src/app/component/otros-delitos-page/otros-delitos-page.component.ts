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

@Component({
  selector: 'app-otros-delitos-page',
  templateUrl: './otros-delitos-page.component.html',
  styleUrls: ['./otros-delitos-page.component.scss']
})
export class OtrosDelitosPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    parroquiaList: [],
    fiscaliaList: [],
    fiscalList: [],
    diaList: [],
    mesList: [],
    datosGeoReferenciacionList: [],
  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;

  selectedItem: any = undefined;

  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'odCodigoUnico',
    'odCodigoParroquia',
    'odFechaDenuncia',
    'odCodigoSecuencial',
    'odCodigoFiscalia',
    'odCodigoFiscal',
    'odNumeroDenuncia',
    'odNumeroExpediente',
    'odFechaHecho',
    'odCodigoDia',
    'odCodigoMes',
    'odCodigoAnio',
    'odCodigoVictima',
    'odTipoCaso',
    'odDireccionIncidente',
    'odObservaciones',
    'odCodigoDigitadorActual',
    'odFechaActualizacion',
    'odFechaIngreso',
    'odGeoReferenciacion',
    'odCodigoGeo',
    'odEstado',
    'Actions',
  ];

  dataSource: OtrosDelitosDataSource;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10, 20, 50];


  // === Victima Select BEGIN ===
  selectedVictima: any = undefined;

  victimaSelectFilterKeyCtrl = new FormControl();
  victimaFiltered: Observable<any[]>;

  @ViewChild('victimaSelectDialog') victimaSelectDialogTemplateRef;
  victimaSelectDialogRef: any;

  // === Victima Select END ===


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
    this.dataSource = new OtrosDelitosDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      odCodigoParroquia: [null, Validators.compose([Validators.required])],
      odFechaDenuncia: [null, Validators.compose([Validators.required])],
      odCodigoSecuencial: [null, Validators.compose([Validators.required])],
      odCodigoFiscalia: [null, Validators.compose([Validators.required])],
      odCodigoFiscal: [null, Validators.compose([Validators.required])],
      odNumeroDenuncia: [null, Validators.compose([Validators.required])],
      odNumeroExpediente: [null, Validators.compose([Validators.required])],
      odFechaHecho: [null, Validators.compose([Validators.required])],
      odCodigoDia: [null, Validators.compose([Validators.required])],
      odCodigoMes: [null, Validators.compose([Validators.required])],
      odCodigoAnio: [null, Validators.compose([Validators.required])],
      odCodigoVictima: [null, Validators.compose([Validators.required])],
      odTipoCaso: [null, Validators.compose([Validators.required])],
      odDireccionIncidente: [null, Validators.compose([Validators.required])],
      odObservaciones: [null, Validators.compose([Validators.required])],
      odCodigoDigitadorActual: [null, Validators.compose([Validators.required])],
      odFechaActualizacion: [null, Validators.compose([Validators.required])],
      odFechaIngreso: [null, Validators.compose([Validators.required])],
      odGeoReferenciacion: [null, Validators.compose([Validators.required])],
      odCodigoGeo: [null, Validators.compose([Validators.required])],
      odEstado: [null, Validators.compose([Validators.required])],

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

    this.selectedItem = {};

    this.loadRelatedData(() => {

      this.createForm.reset();
      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });

  }

  create() {


    const params = this.createForm.value;

    params.odCodigoVictima = this.selectedItem.victima.victimaCodigo;


    this.spinner.show();
    this.apiService.otrosDelitos.create(params).subscribe(() => {
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
        odCodigoParroquia: this.selectedItem.odCodigoParroquia,
        odFechaDenuncia: this.selectedItem.odFechaDenuncia,
        odCodigoSecuencial: this.selectedItem.odCodigoSecuencial,
        odCodigoFiscalia: this.selectedItem.odCodigoFiscalia,
        odCodigoFiscal: this.selectedItem.odCodigoFiscal,
        odNumeroDenuncia: this.selectedItem.odNumeroDenuncia,
        odNumeroExpediente: this.selectedItem.odNumeroExpediente,
        odFechaHecho: this.selectedItem.odFechaHecho,
        odCodigoDia: this.selectedItem.odCodigoDia,
        odCodigoMes: this.selectedItem.odCodigoMes,
        odCodigoAnio: this.selectedItem.odCodigoAnio,
        odCodigoVictima:
          `${this.selectedItem.victima.victimaCodigo} (${this.selectedItem.victima.victimaApellidos} ${this.selectedItem.victima.victimaNombres})`,
        odTipoCaso: this.selectedItem.odTipoCaso,
        odDireccionIncidente: this.selectedItem.odDireccionIncidente,
        odObservaciones: this.selectedItem.odObservaciones,
        odCodigoDigitadorActual: this.selectedItem.odCodigoDigitadorActual,
        odFechaActualizacion: this.selectedItem.odFechaActualizacion,
        odFechaIngreso: this.selectedItem.odFechaIngreso,
        odGeoReferenciacion: this.selectedItem.odGeoReferenciacion,
        odCodigoGeo: this.selectedItem.odCodigoGeo,
        odEstado: this.selectedItem.odEstado,

      });
      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.odCodigoUnico = this.selectedItem.odCodigoUnico;
    params.odCodigoVictima = this.selectedItem.victima.victimaCodigo;

    this.spinner.show();
    this.apiService.otrosDelitos.update(params).subscribe(() => {
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

    this.apiService.otrosDelitos.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.otrosDelitos().subscribe(
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


  // ================================  Victima Select BEGIN ================================

  openVictimaSelectDialog() {

    this.selectedVictima = this.selectedItem.victima;

    this.victimaFiltered = this.victimaSelectFilterKeyCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.victimaCodigo || value === '') {
            return of([]);
          }
          return this.apiService.victima.autoComplete({
            key: value.toLowerCase()
          });
        })
      );

    this.victimaSelectFilterKeyCtrl.setValue('');

    this.victimaSelectDialogRef = this.dialog.open(this.victimaSelectDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });
  }


  onVictimaSelectDialogOk() {
    if (!this.selectedVictima) {
      this.toastr.warning('Seleccionar victima.');
      return;
    }
    this.selectedItem.victima = this.selectedVictima;
    this.selectedItem.odCodigoVictima = this.selectedItem.victima.victimaCodigo;

    const value2Patch = {
      odCodigoVictima:
        `${this.selectedItem.victima.victimaCodigo} (${this.selectedItem.victima.victimaApellidos} ${this.selectedItem.victima.victimaNombres})`
    };

    this.createForm.patchValue(value2Patch);
    this.editForm.patchValue(value2Patch);

    this.victimaSelectDialogRef.close();
  }

  onVictimaSelectDialogCancel() {
    this.victimaSelectDialogRef.close();

  }

  onVictimaSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedVictima = event.option.value;
  }

  victimaAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.victimaApellidos} ${item.victimaNombres}`;
    }
  }

  // ================================  Victima Select END ================================


}


class OtrosDelitosDataSource implements DataSource<any> {

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

    this.apiService.otrosDelitos
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

