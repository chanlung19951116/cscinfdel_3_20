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
  selector: 'app-accidente-transito-page',
  templateUrl: './accidente-transito-page.component.html',
  styleUrls: ['./accidente-transito-page.component.scss']
})
export class AccidenteTransitoPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    tipoPuntoList: [],
    fiscaliaList: [],
    fiscalList: [],
    barrioList: [],
    parroquiaList: [],
    diaList: [],
    mesList: [],
    procedenciaParteList: [],
    lugarList: [],
    momentoAccidenteList: [],
    tipoViaList: [],
    condicionCalzadaList: [],
    claseAccidenteList: [],
    causaAccidenteList: [],
    vehiculoList: [],
    alcoholVictimaList: [],
    gradoAlcoholVictimaList: [],
    alcoholAgresorList: [],
    gradoAlcoholAgresorList: [],
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
    'codigoRegistro',
    'secuencial',
    'claveFicha',
    'codigoTipoPunto',
    'codigoFiscalia',
    'codigoFiscal',
    'numeroDenuncia',
    'fechaDenuncia',
    'direccionHecho',
    'codigoBarrio',
    'codigoParroquia',
    'fechaHecho',
    'codigoDia',
    'codigoMes',
    'anioHecho',
    'horaHecho',
    'minutoHecho',
    'codigoProcedenciaParte',
    'codigoLugar',
    'codigoMomentoAccidente',
    'codigoTipoVia',
    'codigoCondicionCalzada',
    'codigoClaseAccidente',
    'codigoCausaAccidente',
    'delitoFragante',
    'codigoVictima',
    'placaVehiculoVictima',
    'codigoAlcoholVictima',
    'codigoGradoAlcoholVictima',
    'numHombresVehiculoVictima',
    'numMujeresVehiculoVictima',
    'placaVehiculoAgresor',
    'numHombresVehiculoAgresor',
    'numMujeresVehiculoAgresor',
    'codigoAgresor',
    'codigoAlcoholAgresor',
    'codGradoAlcoholAgresor',
    'observacion',
    'numPersonaVehiculoVictima',
    'fechaActual',
    'georeferenciacion',
    'codigoGeo',
    'estado',
    'Actions',
  ];

  dataSource: AccidenteTransitoDataSource;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10, 20, 50];


  // === Agresor Select BEGIN ===
  selectedAgresor: any = undefined;

  agresorSelectFilterKeyCtrl = new FormControl();
  agresorFiltered: Observable<any[]>;

  @ViewChild('agresorSelectDialog') agresorSelectDialogTemplateRef;
  agresorSelectDialogRef: any;
  // === Agresor Select END ===



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
    this.dataSource = new AccidenteTransitoDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      secuencial: [null, Validators.compose([Validators.required])],
      claveFicha: [null, Validators.compose([Validators.required])],
      codigoTipoPunto: [null, Validators.compose([Validators.required])],
      codigoFiscalia: [null, Validators.compose([Validators.required])],
      codigoFiscal: [null, Validators.compose([Validators.required])],
      numeroDenuncia: [null, Validators.compose([Validators.required])],
      fechaDenuncia: [null, Validators.compose([Validators.required])],
      direccionHecho: [null, Validators.compose([Validators.required])],
      codigoBarrio: [null, Validators.compose([Validators.required])],
      codigoParroquia: [null, Validators.compose([Validators.required])],
      fechaHecho: [null, Validators.compose([Validators.required])],
      codigoDia: [null, Validators.compose([Validators.required])],
      codigoMes: [null, Validators.compose([Validators.required])],
      anioHecho: [null, Validators.compose([Validators.required])],
      horaHecho: [null, Validators.compose([Validators.required])],
      minutoHecho: [null, Validators.compose([Validators.required])],
      codigoProcedenciaParte: [null, Validators.compose([Validators.required])],
      codigoLugar: [null, Validators.compose([Validators.required])],
      codigoMomentoAccidente: [null, Validators.compose([Validators.required])],
      codigoTipoVia: [null, Validators.compose([Validators.required])],
      codigoCondicionCalzada: [null, Validators.compose([Validators.required])],
      codigoClaseAccidente: [null, Validators.compose([Validators.required])],
      codigoCausaAccidente: [null, Validators.compose([Validators.required])],
      delitoFragante: [null, Validators.compose([Validators.required])],
      codigoVictima: [null, Validators.compose([Validators.required])],
      placaVehiculoVictima: [null, Validators.compose([Validators.required])],
      codigoAlcoholVictima: [null, Validators.compose([Validators.required])],
      codigoGradoAlcoholVictima: [null, Validators.compose([Validators.required])],
      numHombresVehiculoVictima: [null, Validators.compose([Validators.required])],
      numMujeresVehiculoVictima: [null, Validators.compose([Validators.required])],
      placaVehiculoAgresor: [null, Validators.compose([Validators.required])],
      numHombresVehiculoAgresor: [null, Validators.compose([Validators.required])],
      numMujeresVehiculoAgresor: [null, Validators.compose([Validators.required])],
      codigoAgresor: [null, Validators.compose([Validators.required])],
      codigoAlcoholAgresor: [null, Validators.compose([Validators.required])],
      codGradoAlcoholAgresor: [null, Validators.compose([Validators.required])],
      observacion: [null, Validators.compose([Validators.required])],
      numPersonaVehiculoVictima: [null, Validators.compose([Validators.required])],
      fechaActual: [null, Validators.compose([Validators.required])],
      georeferenciacion: [null, Validators.compose([Validators.required])],
      codigoGeo: [null, Validators.compose([Validators.required])],
      estado: [null, Validators.compose([Validators.required])],
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

    params.fechaDenuncia = moment(params.fechaDenuncia).format('YYYY-MM-DD');
    params.fechaHecho = moment(params.fechaHecho).format('YYYY-MM-DD');
    params.fechaActual = moment(params.fechaActual).format('YYYY-MM-DD');

    params.codigoVictima = this.selectedItem.victima.victimaCodigo;
    params.codigoAgresor = this.selectedItem.agresor.codigo;


    this.spinner.show();
    this.apiService.accidenteTransito.create(params).subscribe(() => {
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
        secuencial: this.selectedItem.secuencial,
        claveFicha: this.selectedItem.claveFicha,
        codigoTipoPunto: this.selectedItem.codigoTipoPunto,
        codigoFiscalia: this.selectedItem.codigoFiscalia,
        codigoFiscal: this.selectedItem.codigoFiscal,
        numeroDenuncia: this.selectedItem.numeroDenuncia,
        fechaDenuncia: new Date(this.selectedItem.fechaDenuncia),
        direccionHecho: this.selectedItem.direccionHecho,
        codigoBarrio: this.selectedItem.codigoBarrio,
        codigoParroquia: this.selectedItem.codigoParroquia,
        fechaHecho: new Date(this.selectedItem.fechaHecho),
        codigoDia: this.selectedItem.codigoDia,
        codigoMes: this.selectedItem.codigoMes,
        anioHecho: this.selectedItem.anioHecho,
        horaHecho: this.selectedItem.horaHecho,
        minutoHecho: this.selectedItem.minutoHecho,
        codigoProcedenciaParte: this.selectedItem.codigoProcedenciaParte,
        codigoLugar: this.selectedItem.codigoLugar,
        codigoMomentoAccidente: this.selectedItem.codigoMomentoAccidente,
        codigoTipoVia: this.selectedItem.codigoTipoVia,
        codigoCondicionCalzada: this.selectedItem.codigoCondicionCalzada,
        codigoClaseAccidente: this.selectedItem.codigoClaseAccidente,
        codigoCausaAccidente: this.selectedItem.codigoCausaAccidente,
        delitoFragante: this.selectedItem.delitoFragante,
        codigoVictima:
          `${this.selectedItem.victima.victimaCodigo} (${this.selectedItem.victima.victimaApellidos} ${this.selectedItem.victima.victimaNombres})`,
        placaVehiculoVictima: this.selectedItem.placaVehiculoVictima,
        codigoAlcoholVictima: this.selectedItem.codigoAlcoholVictima,
        codigoGradoAlcoholVictima: this.selectedItem.codigoGradoAlcoholVictima,
        numHombresVehiculoVictima: this.selectedItem.numHombresVehiculoVictima,
        numMujeresVehiculoVictima: this.selectedItem.numMujeresVehiculoVictima,
        placaVehiculoAgresor: this.selectedItem.placaVehiculoAgresor,
        numHombresVehiculoAgresor: this.selectedItem.numHombresVehiculoAgresor,
        numMujeresVehiculoAgresor: this.selectedItem.numMujeresVehiculoAgresor,
        codigoAgresor:
          `${this.selectedItem.agresor.codigo} (${this.selectedItem.agresor.apellidos} ${this.selectedItem.agresor.nombres})`,
        codigoAlcoholAgresor: this.selectedItem.codigoAlcoholAgresor,
        codGradoAlcoholAgresor: this.selectedItem.codGradoAlcoholAgresor,
        observacion: this.selectedItem.observacion,
        numPersonaVehiculoVictima: this.selectedItem.numPersonaVehiculoVictima,
        fechaActual: new Date(this.selectedItem.fechaActual),
        georeferenciacion: this.selectedItem.georeferenciacion,
        codigoGeo: this.selectedItem.codigoGeo,
        estado: this.selectedItem.estado,
      });
      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.codigoRegistro = this.selectedItem.codigoRegistro;

    params.fechaDenuncia = moment(params.fechaDenuncia).format('YYYY-MM-DD');
    params.fechaHecho = moment(params.fechaHecho).format('YYYY-MM-DD');
    params.fechaActual = moment(params.fechaActual).format('YYYY-MM-DD');

    params.codigoVictima = this.selectedItem.victima.victimaCodigo;
    params.codigoAgresor = this.selectedItem.agresor.codigo;


    this.spinner.show();
    this.apiService.accidenteTransito.update(params).subscribe(() => {
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

    this.apiService.accidenteTransito.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.accidenteTransito().subscribe(
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
    this.selectedItem.codigoVictima = this.selectedItem.victima.victimaCodigo;

    const value2Patch = {
      codigoVictima:
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



  // ================================  Agresor Select BEGIN ================================

  openAgresorSelectDialog() {

    this.selectedAgresor = this.selectedItem.agresor;

    this.agresorFiltered = this.agresorSelectFilterKeyCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.codigo || value === '') {
            return of([]);
          }
          return this.apiService.agresor.autoComplete({
            key: value.toLowerCase()
          });
        })
      );

    this.agresorSelectFilterKeyCtrl.setValue('');

    this.agresorSelectDialogRef = this.dialog.open(this.agresorSelectDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });
  }


  onAgresorSelectDialogOk() {
    if (!this.selectedAgresor) {
      this.toastr.warning('Seleccionar agresor.');
      return;
    }
    this.selectedItem.agresor = this.selectedAgresor;
    this.selectedItem.codigoAgresor = this.selectedItem.agresor.codigo;

    const value2Patch = {
      codigoAgresor:
        `${this.selectedItem.agresor.codigo} (${this.selectedItem.agresor.apellidos} ${this.selectedItem.agresor.nombres})`
    };

    this.createForm.patchValue(value2Patch);
    this.editForm.patchValue(value2Patch);

    this.agresorSelectDialogRef.close();
  }

  onAgresorSelectDialogCancel() {
    this.agresorSelectDialogRef.close();

  }

  onAgresorSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedAgresor = event.option.value;
  }

  agresorAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.apellidos} ${item.nombres}`;
    }
  }

  // ================================  Agresor Select END ================================






}


class AccidenteTransitoDataSource implements DataSource<any> {

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

    this.apiService.accidenteTransito
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

