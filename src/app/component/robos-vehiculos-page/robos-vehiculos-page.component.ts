import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PAGE_STATE} from '../../define/enums';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, fromEvent, Observable, of} from 'rxjs';
import {MatAutocompleteSelectedEvent, MatDialog, MatPaginator} from '@angular/material';
import {ApiService} from '../../service/api.service';
import {CommonService} from '../../service/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {HttpErrorResponse} from '@angular/common/http';
import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';

@Component({
  selector: 'app-robos-vehiculos-page',
  templateUrl: './robos-vehiculos-page.component.html',
  styleUrls: ['./robos-vehiculos-page.component.scss']
})
export class RobosVehiculosPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    parroquiaList: [],
    tipoPuntoList: [],
    responsableEscanerList: [],
    fiscaliaList: [],
    fiscalList: [],
    diaList: [],
    mesList: [],
    lugarList: [],
    tipoDelitoList: [],
    autorDelitoList: [],
    tipoAgresionList: [],
    modalidadRoboList: [],
    objetoRobadoVehiculoList: [],
    datosGeoReferenciacionList: [],
    vehiculoList: [],
    parteRobadaVehiculoList: []
  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;
  rhvParteRobadasCreateForm: FormGroup;

  selectedItem: any = undefined;


  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'rvCodigoUnico',
    'rvCodigoParroquia',
    'rvCodigoSecuencial',
    'rvNumeroExpediente',
    'rvCodigoTipoPunto',
    'rvCodigoResponsableScanner',
    'rvCodigoFiscalia',
    'rvCodigoFiscal',
    'rvNumeroDenuncia',
    'rvFechaDenuncia',
    'rvTipoDelito',
    'rvDireccionHecho',
    'rvFechaHecho',
    'rvCodigoDia',
    'rvCodigoMes',
    'rvCodigoAnio',
    'rvAnioHecho',
    'rvHoraHecho',
    'rvMinutoHecho',
    'rvCodigoLugar',
    'rvCodigoAutorDelito',
    'rvCodigoVictimasDelito',
    'rvCodigoTipoAgresion',
    'rvCircunstanciasVehiculo',
    'rvCodigoModalidadRobo',
    'rvDelitoFlagrante',
    'rvPlacaVehiculoVictima',
    'rvCodigoObjetoRobadoVh',
    'rvNumeroHombresAgresor',
    'rvNumeroMujeresAgresor',
    'rvVehiculoRecuperado',
    'rvObservaciones',
    'rvCodigoDigitadorActualiza',
    'rvFechaActualizacion',
    'rvGeoReferenciacion',
    'rvFechaValidacion',
    'rvNombreValidacion',
    'rvCodigoGeo',
    'rvEstado',
    'rvPartesRobadas',
    'Actions',
  ];

  dataSource: RobosVehiculosDataSource;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10, 20, 50];

  @ViewChild('rhvParteRobadasDialog') rhvParteRobadasDialogTemplateRef;
  rhvParteRobadasDialogRef: any;

  selectedRhvParteRobadasList: any;



  // === Agresor Select BEGIN ===
  selectedAgresorList: any = undefined;

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




  // === ObjetoAgresion Select BEGIN ===
  selectedObjetoAgresionList: any = undefined;

  objetoAgresionSelectFilterKeyCtrl = new FormControl();
  objetoAgresionFiltered: Observable<any[]>;

  @ViewChild('objetoAgresionSelectDialog') objetoAgresionSelectDialogTemplateRef;
  objetoAgresionSelectDialogRef: any;
  // === ObjetoAgresion Select END ===




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
    this.dataSource = new RobosVehiculosDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      rvCodigoParroquia: [null, Validators.compose([Validators.required])],
      rvCodigoSecuencial: [null, Validators.compose([Validators.required])],
      rvNumeroExpediente: [null, Validators.compose([Validators.required])],
      rvCodigoTipoPunto: [null, Validators.compose([Validators.required])],
      rvCodigoResponsableScanner: [null, Validators.compose([Validators.required])],
      rvCodigoFiscalia: [null, Validators.compose([Validators.required])],
      rvCodigoFiscal: [null, Validators.compose([Validators.required])],
      rvNumeroDenuncia: [null, Validators.compose([Validators.required])],
      rvFechaDenuncia: [null, Validators.compose([Validators.required])],
      rvTipoDelito: [null, Validators.compose([Validators.required])],
      rvDireccionHecho: [null, Validators.compose([Validators.required])],
      rvFechaHecho: [null, Validators.compose([Validators.required])],
      rvCodigoDia: [null, Validators.compose([Validators.required])],
      rvCodigoMes: [null, Validators.compose([Validators.required])],
      rvCodigoAnio: [null, Validators.compose([Validators.required])],
      rvAnioHecho: [null, Validators.compose([Validators.required])],
      rvHoraHecho: [null, Validators.compose([Validators.required])],
      rvMinutoHecho: [null, Validators.compose([Validators.required])],
      rvCodigoLugar: [null, Validators.compose([Validators.required])],
      rvCodigoAutorDelito: [null, Validators.compose([Validators.required])],
      rvCodigoVictimasDelito: [null, Validators.compose([Validators.required])],
      rvCodigoTipoAgresion: [null, Validators.compose([Validators.required])],
      rvCircunstanciasVehiculo: [null, Validators.compose([Validators.required])],
      rvCodigoModalidadRobo: [null, Validators.compose([Validators.required])],
      rvDelitoFlagrante: [null, Validators.compose([Validators.required])],
      rvPlacaVehiculoVictima: [null, Validators.compose([Validators.required])],
      rvCodigoObjetoRobadoVh: [null, Validators.compose([Validators.required])],
      rvNumeroHombresAgresor: [null, Validators.compose([Validators.required])],
      rvNumeroMujeresAgresor: [null, Validators.compose([Validators.required])],
      rvVehiculoRecuperado: [null, Validators.compose([Validators.required])],
      rvObservaciones: [null, Validators.compose([Validators.required])],
      rvCodigoDigitadorActualiza: [null, Validators.compose([Validators.required])],
      rvFechaActualizacion: [null, Validators.compose([Validators.required])],
      rvGeoReferenciacion: [null, Validators.compose([Validators.required])],
      rvFechaValidacion: [null, Validators.compose([Validators.required])],
      rvNombreValidacion: [null, Validators.compose([Validators.required])],
      rvCodigoGeo: [null, Validators.compose([Validators.required])],
      rvEstado: [null, Validators.compose([Validators.required])],
      rvPartesRobadas: [null, Validators.compose([Validators.required])],
    };

    this.createForm = this.fb.group(controlsConfig);

    this.editForm = this.fb.group(controlsConfig);





    this.rhvParteRobadasCreateForm = this.fb.group({

      parteRobada: [null, Validators.compose([Validators.required])],
      cantidad: [null, Validators.compose([Validators.required])],
      valor: [null, Validators.compose([Validators.required])],
      recuperada: [null, Validators.compose([Validators.required])],
    });

    this.createForm.controls['rvGeoReferenciacion'].valueChanges.subscribe((value) => {
      const codigoGeoControl = this.createForm.controls['rvCodigoGeo'];
      if (value === 1) {
        codigoGeoControl.setValidators([Validators.compose([Validators.required])]);
      } else {
        codigoGeoControl.setValidators([]);
      }
      codigoGeoControl.updateValueAndValidity();
    });

    this.editForm.controls['rvGeoReferenciacion'].valueChanges.subscribe((value) => {
      const codigoGeoControl = this.editForm.controls['rvCodigoGeo'];
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

    this.selectedItem.agresorList = [];
    this.selectedAgresorList = this.selectedItem.agresorList;

    this.selectedItem.objetoAgresionList = [];
    this.selectedObjetoAgresionList = this.selectedItem.objetoAgresionList;


    this.selectedItem.rhvParteRobadasList = [];

    this.loadRelatedData(() => {

      this.createForm.reset();
      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });

  }

  create() {


    const params = this.createForm.value;

    params.rvFechaDenuncia = moment(params.rvFechaDenuncia).format('YYYY-MM-DD');
    params.rvFechaHecho = moment(params.rvFechaHecho).format('YYYY-MM-DD');
    params.rvFechaActualizacion = moment(params.rvFechaActualizacion).format('YYYY-MM-DD');
    params.rvFechaValidacion = moment(params.rvFechaValidacion).format('YYYY-MM-DD');

    params.rvCodigoVictimasDelito = this.selectedItem.victima.victimaCodigo;

    params.rhvParteRobadasList = this.selectedRhvParteRobadasList || [];

    params.agresorList = this.selectedAgresorList.map((item) => {
      return {
        codigo: item.codigo
      };
    });

    params.objetoAgresionList = this.selectedObjetoAgresionList.map((item) => {
      return {
        codigo: item.codigo
      };
    });



    this.spinner.show();
    this.apiService.robosVehiculos.create(params).subscribe(() => {
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

      this.selectedObjetoAgresionList = this.selectedItem.objetoAgresionList;
      this.selectedAgresorList = this.selectedItem.agresorList;

      this.editForm.patchValue({
        rvCodigoParroquia: this.selectedItem.rvCodigoParroquia,
        rvCodigoSecuencial: this.selectedItem.rvCodigoSecuencial,
        rvNumeroExpediente: this.selectedItem.rvNumeroExpediente,
        rvCodigoTipoPunto: this.selectedItem.rvCodigoTipoPunto,
        rvCodigoResponsableScanner: this.selectedItem.rvCodigoResponsableScanner,
        rvCodigoFiscalia: this.selectedItem.rvCodigoFiscalia,
        rvCodigoFiscal: this.selectedItem.rvCodigoFiscal,
        rvNumeroDenuncia: this.selectedItem.rvNumeroDenuncia,
        rvFechaDenuncia: new Date(this.selectedItem.rvFechaDenuncia),
        rvTipoDelito: this.selectedItem.rvTipoDelito,
        rvDireccionHecho: this.selectedItem.rvDireccionHecho,
        rvFechaHecho: new Date(this.selectedItem.rvFechaHecho),
        rvCodigoDia: this.selectedItem.rvCodigoDia,
        rvCodigoMes: this.selectedItem.rvCodigoMes,
        rvCodigoAnio: this.selectedItem.rvCodigoAnio,
        rvAnioHecho: this.selectedItem.rvAnioHecho,
        rvHoraHecho: this.selectedItem.rvHoraHecho,
        rvMinutoHecho: this.selectedItem.rvMinutoHecho,
        rvCodigoLugar: this.selectedItem.rvCodigoLugar,
        rvCodigoAutorDelito: this.selectedItem.rvCodigoAutorDelito,
        rvCodigoVictimasDelito:
        `${this.selectedItem.victima.victimaCodigo} (${this.selectedItem.victima.victimaApellidos} ${this.selectedItem.victima.victimaNombres})`,
        rvCodigoTipoAgresion: this.selectedItem.rvCodigoTipoAgresion,
        rvCircunstanciasVehiculo: this.selectedItem.rvCircunstanciasVehiculo,
        rvCodigoModalidadRobo: this.selectedItem.rvCodigoModalidadRobo,
        rvDelitoFlagrante: this.selectedItem.rvDelitoFlagrante,
        rvPlacaVehiculoVictima: this.selectedItem.rvPlacaVehiculoVictima,
        rvCodigoObjetoRobadoVh: this.selectedItem.rvCodigoObjetoRobadoVh,
        rvNumeroHombresAgresor: this.selectedItem.rvNumeroHombresAgresor,
        rvNumeroMujeresAgresor: this.selectedItem.rvNumeroMujeresAgresor,
        rvVehiculoRecuperado: this.selectedItem.rvVehiculoRecuperado,
        rvObservaciones: this.selectedItem.rvObservaciones,
        rvCodigoDigitadorActualiza: this.selectedItem.rvCodigoDigitadorActualiza,
        rvFechaActualizacion: new Date(this.selectedItem.rvFechaActualizacion),
        rvGeoReferenciacion: this.selectedItem.rvGeoReferenciacion,
        rvFechaValidacion: new Date(this.selectedItem.rvFechaValidacion),
        rvNombreValidacion: this.selectedItem.rvNombreValidacion,
        rvCodigoGeo: this.selectedItem.rvCodigoGeo,
        rvEstado: this.selectedItem.rvEstado,
        rvPartesRobadas: this.selectedItem.rvPartesRobadas,
      });
      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.rvCodigoUnico = this.selectedItem.rvCodigoUnico;
    params.rvFechaDenuncia = moment(params.rvFechaDenuncia).format('YYYY-MM-DD');
    params.rvFechaHecho = moment(params.rvFechaHecho).format('YYYY-MM-DD');
    params.rvFechaActualizacion = moment(params.rvFechaActualizacion).format('YYYY-MM-DD');
    params.rvFechaValidacion = moment(params.rvFechaValidacion).format('YYYY-MM-DD');

    params.rvCodigoVictimasDelito = this.selectedItem.victima.victimaCodigo;

    params.rhvParteRobadasList = this.selectedRhvParteRobadasList || [];

    params.agresorList = this.selectedAgresorList.map((item) => {
      return {
        codigo: item.codigo
      };
    });


    params.objetoAgresionList = this.selectedObjetoAgresionList.map((item) => {
      return {
        codigo: item.codigo
      };
    });

    this.spinner.show();
    this.apiService.robosVehiculos.update(params).subscribe(() => {
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

    this.apiService.robosVehiculos.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.robosVehiculos().subscribe(
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


  openRhvParteRobadasDialog() {

    this.selectedRhvParteRobadasList = this.selectedItem.rhvParteRobadasList;

    this.rhvParteRobadasCreateForm.reset();
    this.rhvParteRobadasCreateForm.markAsUntouched();


    this.rhvParteRobadasDialogRef = this.dialog.open(this.rhvParteRobadasDialogTemplateRef, {
      width: '800px',
      disableClose: true
    });
  }

  createRhvParteRobadas() {

    const rhvParteRobadas = this.rhvParteRobadasCreateForm.value;

    rhvParteRobadas.id = {
      rvCodigoUnico: this.selectedItem.rvCodigoUnico,
      codigoParteRobada: rhvParteRobadas.parteRobada
    };
    let found = false;

    for (const item of this.selectedRhvParteRobadasList) {
      if (item.id.rvCodigoUnico === rhvParteRobadas.id.rvCodigoUnico &&
        item.id.codigoParteRobada === rhvParteRobadas.id.codigoParteRobada) {
        found = true;
        break;
      }
    }

    for (const item of this.pageData.parteRobadaVehiculoList) {
      if (item.codigo === rhvParteRobadas.parteRobada) {
        rhvParteRobadas.parteRobadaVehiculo = item;
        break;
      }
    }


    if (!found) {
      this.selectedRhvParteRobadasList.push(rhvParteRobadas);
    }

  }
  onRhvParteRobadasDialogDialogOk() {
    this.selectedItem.rhvParteRobadasList = this.selectedRhvParteRobadasList;
    this.rhvParteRobadasDialogRef.close();
  }

  onRhvParteRobadasDialogDialogCancel() {
    this.rhvParteRobadasDialogRef.close();
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
    this.selectedItem.rvCodigoVictimasDelito = this.selectedItem.victima.victimaCodigo;

    const value2Patch = {
      rvCodigoVictimasDelito:
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

    this.selectedAgresorList = this.selectedItem.agresorList;

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

    this.selectedItem.agresorList = this.selectedAgresorList;

    this.agresorSelectDialogRef.close();
  }

  onAgresorSelectDialogCancel() {
    this.agresorSelectDialogRef.close();

  }

  onAgresorSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    let found = false;
    const selectedValue = event.option.value;

    for (const item of this.selectedAgresorList) {
      if (item.codigo === selectedValue.codigo) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.selectedAgresorList.push(selectedValue);
    }
  }

  agresorAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.apellidos} ${item.nombres}`;
    }
  }

  // ================================  Agresor Select END ================================







  // ================================  ObjetoAgresion Select BEGIN ================================

  openObjetoAgresionSelectDialog() {

    this.selectedObjetoAgresionList = this.selectedItem.objetoAgresionList;

    this.objetoAgresionFiltered = this.objetoAgresionSelectFilterKeyCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.codigo || value === '') {
            return of([]);
          }
          return this.apiService.objetoAgresion.autoComplete({
            key: value.toLowerCase()
          });
        })
      );

    this.objetoAgresionSelectFilterKeyCtrl.setValue('');

    this.objetoAgresionSelectDialogRef = this.dialog.open(this.objetoAgresionSelectDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });
  }


  onObjetoAgresionSelectDialogOk() {

    this.selectedItem.objetoAgresionList = this.selectedObjetoAgresionList;

    this.objetoAgresionSelectDialogRef.close();
  }

  onObjetoAgresionSelectDialogCancel() {
    this.objetoAgresionSelectDialogRef.close();

  }

  onObjetoAgresionSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    let found = false;
    const selectedValue = event.option.value;

    for (const item of this.selectedObjetoAgresionList) {
      if (item.codigo === selectedValue.codigo) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.selectedObjetoAgresionList.push(selectedValue);
    }
  }

  objetoAgresionAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.descripcion}`;
    }
  }

  // ================================  ObjetoAgresion Select END ================================



}


class RobosVehiculosDataSource implements DataSource<any> {

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

    this.apiService.robosVehiculos
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

