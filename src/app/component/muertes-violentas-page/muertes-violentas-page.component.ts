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
  selector: 'app-muertes-violentas-page',
  templateUrl: './muertes-violentas-page.component.html',
  styleUrls: ['./muertes-violentas-page.component.scss']
})
export class MuertesViolentasPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    armMedioSucesoList: [],
    datosGeoReferenciacionList: [],
    fiscalList: [],
    fiscaliaList: [],
    lugarLevantamientoList: [],
    lugarTrasladoList: [],
    medicoList: [],
    motivoMuerteList: [],
    parroquiaList: [],
    restoVictimaList: [],
    tipoMuerteList: [],
    alcoholVictimaList: [],

    diaList: [],
    mesList: []
  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;

  selectedItem: any = undefined;

  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'mvCodigoUnico',
    'mvSecuencial',
    'mvCodigoParroquia',
    'mvCodigoFiscalia',
    'mvCodigoFiscal',
    'mvNumeroExpedienteFiscalia',
    'mvFechaDenuncia',
    'mvNumeroExpediente',
    'mvCodigoTipoMuerte',
    'mvCodigoVictima',
    'mvFechaLevantamiento',
    'mvHoraLevantamiento',
    'mvCodLugarLevantamiento',
    'mvFehaHecho',
    'mvCodigoDia',
    'mvCodigoMes',
    'mvCodigoAnio',
    'mvHora',
    'mvMinutos',
    'mvDireccion',
    'mvCodigoArmMedioSuceso',
    'mvCodigoMotivoMuerte',
    'mvCodigoAlcohol',
    'mvHistorialClinico',
    'mvCodigoLugarTranslado',
    'mvCodigoMedico',
    'mvDisect',
    'mvDelitoFlagrante',
    'mvObservaciones',
    'mvFechaActualizacion',
    'mvCodigoDigitadorActual',
    'mvArchivo',
    'mvArchivo2',
    'mvTipoVehiculoVictima',
    'mvVictimaConduce',
    'mvMuerteViolentaPol',
    'mvCodigoRestosVictimas',
    'mvCodigoGeo',
    'mvEstado',
    'Actions',
  ];

  dataSource: MuertesViolentasDataSource;
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
    this.dataSource = new MuertesViolentasDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      mvSecuencial: [null, Validators.compose([Validators.required])],
      mvCodigoParroquia: [null, Validators.compose([Validators.required])],
      mvCodigoFiscalia: [null, Validators.compose([Validators.required])],
      mvCodigoFiscal: [null, Validators.compose([Validators.required])],
      mvNumeroExpedienteFiscalia: [null, Validators.compose([Validators.required])],
      mvFechaDenuncia: [null, Validators.compose([Validators.required])],
      mvNumeroExpediente: [null, Validators.compose([Validators.required])],
      mvCodigoTipoMuerte: [null, Validators.compose([Validators.required])],
      mvCodigoVictima: [null, Validators.compose([Validators.required])],
      mvFechaLevantamiento: [null, Validators.compose([Validators.required])],
      mvHoraLevantamiento: [null, Validators.compose([Validators.required])],
      mvCodLugarLevantamiento: [null, Validators.compose([Validators.required])],
      mvFehaHecho: [null, Validators.compose([Validators.required])],
      mvCodigoDia: [null, Validators.compose([Validators.required])],
      mvCodigoMes: [null, Validators.compose([Validators.required])],
      mvCodigoAnio: [null, Validators.compose([Validators.required])],
      mvHora: [null, Validators.compose([Validators.required])],
      mvMinutos: [null, Validators.compose([Validators.required])],
      mvDireccion: [null, Validators.compose([Validators.required])],
      mvCodigoArmMedioSuceso: [null, Validators.compose([Validators.required])],
      mvCodigoMotivoMuerte: [null, Validators.compose([Validators.required])],
      mvCodigoAlcohol: [null, Validators.compose([Validators.required])],
      mvHistorialClinico: [null, Validators.compose([Validators.required])],
      mvCodigoLugarTranslado: [null, Validators.compose([Validators.required])],
      mvCodigoMedico: [null, Validators.compose([Validators.required])],
      mvDisect: [null, Validators.compose([Validators.required])],
      mvDelitoFlagrante: [null, Validators.compose([Validators.required])],
      mvObservaciones: [null, Validators.compose([Validators.required])],
      mvFechaActualizacion: [null, Validators.compose([Validators.required])],
      mvCodigoDigitadorActual: [null, Validators.compose([Validators.required])],
      mvArchivo: [null, Validators.compose([Validators.required])],
      mvArchivo2: [null, Validators.compose([Validators.required])],
      mvTipoVehiculoVictima: [null, Validators.compose([Validators.required])],
      mvVictimaConduce: [null, Validators.compose([Validators.required])],
      mvMuerteViolentaPol: [null, Validators.compose([Validators.required])],
      mvCodigoRestosVictimas: [null, Validators.compose([Validators.required])],
      mvCodigoGeo: [null, Validators.compose([Validators.required])],
      mvEstado: [null, Validators.compose([Validators.required])],

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

    params.mvCodigoVictima = this.selectedItem.victima.victimaCodigo;

    this.spinner.show();
    this.apiService.muertesViolentas.create(params).subscribe(() => {
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
        mvSecuencial: this.selectedItem.mvSecuencial,
        mvCodigoParroquia: this.selectedItem.mvCodigoParroquia,
        mvCodigoFiscalia: this.selectedItem.mvCodigoFiscalia,
        mvCodigoFiscal: this.selectedItem.mvCodigoFiscal,
        mvNumeroExpedienteFiscalia: this.selectedItem.mvNumeroExpedienteFiscalia,
        mvFechaDenuncia: this.selectedItem.mvFechaDenuncia,
        mvNumeroExpediente: this.selectedItem.mvNumeroExpediente,
        mvCodigoTipoMuerte: this.selectedItem.mvCodigoTipoMuerte,
        mvCodigoVictima:
          `${this.selectedItem.mvCodigoVictima} (${this.selectedItem.victima.victimaApellidos} ${this.selectedItem.victima.victimaNombres})`,
        mvFechaLevantamiento: this.selectedItem.mvFechaLevantamiento,
        mvHoraLevantamiento: this.selectedItem.mvHoraLevantamiento,
        mvCodLugarLevantamiento: this.selectedItem.mvCodLugarLevantamiento,
        mvFehaHecho: this.selectedItem.mvFehaHecho,
        mvCodigoDia: this.selectedItem.mvCodigoDia,
        mvCodigoMes: this.selectedItem.mvCodigoMes,
        mvCodigoAnio: this.selectedItem.mvCodigoAnio,
        mvHora: this.selectedItem.mvHora,
        mvMinutos: this.selectedItem.mvMinutos,
        mvDireccion: this.selectedItem.mvDireccion,
        mvCodigoArmMedioSuceso: this.selectedItem.mvCodigoArmMedioSuceso,
        mvCodigoMotivoMuerte: this.selectedItem.mvCodigoMotivoMuerte,
        mvCodigoAlcohol: this.selectedItem.mvCodigoAlcohol,
        mvHistorialClinico: this.selectedItem.mvHistorialClinico,
        mvCodigoLugarTranslado: this.selectedItem.mvCodigoLugarTranslado,
        mvCodigoMedico: this.selectedItem.mvCodigoMedico,
        mvDisect: this.selectedItem.mvDisect,
        mvDelitoFlagrante: this.selectedItem.mvDelitoFlagrante,
        mvObservaciones: this.selectedItem.mvObservaciones,
        mvFechaActualizacion: this.selectedItem.mvFechaActualizacion,
        mvCodigoDigitadorActual: this.selectedItem.mvCodigoDigitadorActual,
        mvArchivo: this.selectedItem.mvArchivo,
        mvArchivo2: this.selectedItem.mvArchivo2,
        mvTipoVehiculoVictima: this.selectedItem.mvTipoVehiculoVictima,
        mvVictimaConduce: this.selectedItem.mvVictimaConduce,
        mvMuerteViolentaPol: this.selectedItem.mvMuerteViolentaPol,
        mvCodigoRestosVictimas: this.selectedItem.mvCodigoRestosVictimas,
        mvCodigoGeo: this.selectedItem.mvCodigoGeo,
        mvEstado: this.selectedItem.mvEstado,
      });
      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.mvCodigoUnico = this.selectedItem.mvCodigoUnico;

    this.spinner.show();
    this.apiService.muertesViolentas.update(params).subscribe(() => {
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

    this.apiService.muertesViolentas.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.muertesViolentas().subscribe(
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
    this.selectedItem.mvCodigoVictima = this.selectedItem.victima.victimaCodigo;

    const value2Patch = {
      mvCodigoVictima:
        `${this.selectedItem.mvCodigoVictima} (${this.selectedItem.victima.victimaApellidos} ${this.selectedItem.victima.victimaNombres})`
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


class MuertesViolentasDataSource implements DataSource<any> {

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

    this.apiService.muertesViolentas
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

