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
  selector: 'app-violencia-intra-familiar-page',
  templateUrl: './violencia-intra-familiar-page.component.html',
  styleUrls: ['./violencia-intra-familiar-page.component.scss']
})
export class ViolenciaIntraFamiliarPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    fiscaliaList: [],
    fiscalList: [],
    tipoPuntoList: [],
    diaList: [],
    mesList: [],
    lugarList: [],
    frecuenciaAgresorList: [],
    parroquiaList: [],
    barrioList: [],
    datosGeoReferenciacionList: [],
    tipoDelitoList: [],
  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;

  selectedItem: any = undefined;

  // === Victima Select BEGIN ===
  selectedVictima: any = undefined;

  victimaSelectFilterKeyCtrl = new FormControl();
  victimaFiltered: Observable<any[]>;

  @ViewChild('victimaSelectDialog') victimaSelectDialogTemplateRef;
  victimaSelectDialogRef: any;
  // === Victima Select END ===

  // === Descadenante Select BEGIN ===
  selectedDescadenanteList: any = undefined;

  descadenanteSelectFilterKeyCtrl = new FormControl();
  descadenanteFiltered: Observable<any[]>;

  @ViewChild('descadenanteSelectDialog') descadenanteSelectDialogTemplateRef;
  descadenanteSelectDialogRef: any;
  // === Descadenante Select END ===

  // === ObjetoAgresion Select BEGIN ===
  selectedObjetoAgresionList: any = undefined;

  objetoAgresionSelectFilterKeyCtrl = new FormControl();
  objetoAgresionFiltered: Observable<any[]>;

  @ViewChild('objetoAgresionSelectDialog') objetoAgresionSelectDialogTemplateRef;
  objetoAgresionSelectDialogRef: any;
  // === ObjetoAgresion Select END ===


  // === TipoAgresion Select BEGIN ===
  selectedTipoAgresionList: any = undefined;

  tipoAgresionSelectFilterKeyCtrl = new FormControl();
  tipoAgresionFiltered: Observable<any[]>;

  @ViewChild('tipoAgresionSelectDialog') tipoAgresionSelectDialogTemplateRef;
  tipoAgresionSelectDialogRef: any;
  // === TipoAgresion Select END ===


  // === Agresor Select BEGIN ===
  selectedAgresorList: any = undefined;

  agresorSelectFilterKeyCtrl = new FormControl();
  agresorFiltered: Observable<any[]>;

  @ViewChild('agresorSelectDialog') agresorSelectDialogTemplateRef;
  agresorSelectDialogRef: any;
  // === Agresor Select END ===


  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'viCodigoUnico',
    'viCodigoSecuencial',
    'viCodigoFiscalia',
    'viCodigoFiscal',
    'viNumeroDenuncia',
    'viClaveExpediente',
    'viCodigoTipoPunto',
    'viCodigoAdministrador',
    'viFechaIngreso',
    'viCodigoTipoDenuncia',
    'viCodigoVictima',
    'viConvivenciaAgresor',
    'viTiempoRelacionAgresor',
    'viNumeroHijos',
    'viNumeroHijas',
    'viTotalHijos',
    'viFechaAgresion',
    'viCodigoDia',
    'viCodigoMes',
    'viCodigoAnio',
    'viHoraHecho',
    'viMinutosHecho',
    'viDireccionAgresion',
    'viCodigoParroquiaAgresion',
    'viCodigoLugarAgresion',
    'viCodigoFrecuenciaAgresion',
    'viNumeroVecesDenunciado',
    'viAgresorMaltrataHijos',
    'viEstadoGestacionVictima',
    'viDescadenanteMigracion',
    'viHijosPresenciaronHecho',
    'viFechaActualizacion',
    'viObservaciones',
    'viCodigoJudicatura',
    'viCodigoParroquia',
    'viCodigoBarrio',
    'viGeoReferenciacion',
    'viCodigoGeo',
    'viCodigoTipoDelito',
    'viEstado',
    'Actions',
  ];

  dataSource: ViolenciaIntraFamiliarDataSource;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10, 20, 50];

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
    this.dataSource = new ViolenciaIntraFamiliarDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      viCodigoSecuencial: [null, Validators.compose([Validators.required])],
      viCodigoFiscalia: [null, Validators.compose([Validators.required])],
      viCodigoFiscal: [null, Validators.compose([Validators.required])],
      viNumeroDenuncia: [null, Validators.compose([Validators.required])],
      viClaveExpediente: [null, Validators.compose([Validators.required])],
      viCodigoTipoPunto: [null, Validators.compose([Validators.required])],
      viCodigoAdministrador: [null, Validators.compose([Validators.required])],
      viFechaIngreso: [null, Validators.compose([Validators.required])],
      viCodigoTipoDenuncia: [null, Validators.compose([Validators.required])],
      viCodigoVictima: [null, Validators.compose([Validators.required])],
      viConvivenciaAgresor: [null, Validators.compose([Validators.required])],
      viTiempoRelacionAgresor: [null, Validators.compose([Validators.required])],
      viNumeroHijos: [null, Validators.compose([Validators.required])],
      viNumeroHijas: [null, Validators.compose([Validators.required])],
      viTotalHijos: [null, Validators.compose([Validators.required])],
      viFechaAgresion: [null, Validators.compose([Validators.required])],
      viCodigoDia: [null, Validators.compose([Validators.required])],
      viCodigoMes: [null, Validators.compose([Validators.required])],
      viCodigoAnio: [null, Validators.compose([Validators.required])],
      viHoraHecho: [null, Validators.compose([Validators.required])],
      viMinutosHecho: [null, Validators.compose([Validators.required])],
      viDireccionAgresion: [null, Validators.compose([Validators.required])],
      viCodigoParroquiaAgresion: [null, Validators.compose([Validators.required])],
      viCodigoLugarAgresion: [null, Validators.compose([Validators.required])],
      viCodigoFrecuenciaAgresion: [null, Validators.compose([Validators.required])],
      viNumeroVecesDenunciado: [null, Validators.compose([Validators.required])],
      viAgresorMaltrataHijos: [null, Validators.compose([Validators.required])],
      viEstadoGestacionVictima: [null, Validators.compose([Validators.required])],
      viDescadenanteMigracion: [null, Validators.compose([Validators.required])],
      viHijosPresenciaronHecho: [null, Validators.compose([Validators.required])],
      viFechaActualizacion: [null, Validators.compose([Validators.required])],
      viObservaciones: [null, Validators.compose([Validators.required])],
      viCodigoJudicatura: [null, Validators.compose([Validators.required])],
      viCodigoParroquia: [null, Validators.compose([Validators.required])],
      viCodigoBarrio: [null, Validators.compose([Validators.required])],
      viGeoReferenciacion: [null, Validators.compose([Validators.required])],
      viCodigoGeo: [null, Validators.compose([Validators.required])],
      viCodigoTipoDelito: [null, Validators.compose([Validators.required])],
      viEstado: [null, Validators.compose([Validators.required])],
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

    this.selectedItem.descadenanteList = [];
    this.selectedDescadenanteList = this.selectedItem.descadenanteList;

    this.selectedItem.objetoAgresionList = [];
    this.selectedObjetoAgresionList = this.selectedItem.objetoAgresionList;

    this.selectedItem.tipoAgresionList = [];
    this.selectedTipoAgresionList = this.selectedItem.tipoAgresionList;

    this.selectedItem.agresorList = [];
    this.selectedAgresorList = this.selectedItem.agresorList;

    this.loadRelatedData(() => {

      this.createForm.reset();
      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });

  }

  create() {


    const params = this.createForm.value;

    params.viFechaIngreso = moment(params.viFechaIngreso).format('YYYY-MM-DD');
    params.viFechaAgresion = moment(params.viFechaAgresion).format('YYYY-MM-DD');
    params.viFechaActualizacion = moment(params.viFechaActualizacion).format('YYYY-MM-DD');
    params.viCodigoVictima = this.selectedItem.victima.victimaCodigo;
    params.descadenanteList = this.selectedDescadenanteList.map((item) => {
      return {
        codigo: item.codigo
      };
    });
    params.objetoAgresionList = this.selectedObjetoAgresionList.map((item) => {
      return {
        codigo: item.codigo
      };
    });
    params.tipoAgresionList = this.selectedTipoAgresionList.map((item) => {
      return {
        codigo: item.codigo
      };
    });
    params.agresorList = this.selectedAgresorList.map((item) => {
      return {
        codigo: item.codigo
      };
    });

    this.spinner.show();
    this.apiService.violenciaIntraFamiliar.create(params).subscribe(() => {
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

      this.selectedDescadenanteList = this.selectedItem.descadenanteList;
      this.selectedObjetoAgresionList = this.selectedItem.objetoAgresionList;
      this.selectedTipoAgresionList = this.selectedItem.tipoAgresionList;
      this.selectedAgresorList = this.selectedItem.agresorList;

      this.editForm.patchValue({
        viCodigoSecuencial: this.selectedItem.viCodigoSecuencial,
        viCodigoFiscalia: this.selectedItem.viCodigoFiscalia,
        viCodigoFiscal: this.selectedItem.viCodigoFiscal,
        viNumeroDenuncia: this.selectedItem.viNumeroDenuncia,
        viClaveExpediente: this.selectedItem.viClaveExpediente,
        viCodigoTipoPunto: this.selectedItem.viCodigoTipoPunto,
        viCodigoAdministrador: this.selectedItem.viCodigoAdministrador,
        viFechaIngreso: new Date(this.selectedItem.viFechaIngreso),
        viCodigoTipoDenuncia: this.selectedItem.viCodigoTipoDenuncia,
        viCodigoVictima:
          `${this.selectedItem.victima.victimaCodigo} (${this.selectedItem.victima.victimaApellidos} ${this.selectedItem.victima.victimaNombres})`,
        viConvivenciaAgresor: this.selectedItem.viConvivenciaAgresor,
        viTiempoRelacionAgresor: this.selectedItem.viTiempoRelacionAgresor,
        viNumeroHijos: this.selectedItem.viNumeroHijos,
        viNumeroHijas: this.selectedItem.viNumeroHijas,
        viTotalHijos: this.selectedItem.viTotalHijos,
        viFechaAgresion: new Date(this.selectedItem.viFechaAgresion),
        viCodigoDia: this.selectedItem.viCodigoDia,
        viCodigoMes: this.selectedItem.viCodigoMes,
        viCodigoAnio: this.selectedItem.viCodigoAnio,
        viHoraHecho: this.selectedItem.viHoraHecho,
        viMinutosHecho: this.selectedItem.viMinutosHecho,
        viDireccionAgresion: this.selectedItem.viDireccionAgresion,
        viCodigoParroquiaAgresion: this.selectedItem.viCodigoParroquiaAgresion,
        viCodigoLugarAgresion: this.selectedItem.viCodigoLugarAgresion,
        viCodigoFrecuenciaAgresion: this.selectedItem.viCodigoFrecuenciaAgresion,
        viNumeroVecesDenunciado: this.selectedItem.viNumeroVecesDenunciado,
        viAgresorMaltrataHijos: this.selectedItem.viAgresorMaltrataHijos,
        viEstadoGestacionVictima: this.selectedItem.viEstadoGestacionVictima,
        viDescadenanteMigracion: this.selectedItem.viDescadenanteMigracion,
        viHijosPresenciaronHecho: this.selectedItem.viHijosPresenciaronHecho,
        viFechaActualizacion: new Date(this.selectedItem.viFechaActualizacion),
        viObservaciones: this.selectedItem.viObservaciones,
        viCodigoJudicatura: this.selectedItem.viCodigoJudicatura,
        viCodigoParroquia: this.selectedItem.viCodigoParroquia,
        viCodigoBarrio: this.selectedItem.viCodigoBarrio,
        viGeoReferenciacion: this.selectedItem.viGeoReferenciacion,
        viCodigoGeo: this.selectedItem.viCodigoGeo,
        viCodigoTipoDelito: this.selectedItem.viCodigoTipoDelito,
        viEstado: this.selectedItem.viEstado,
      });

      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.viCodigoUnico = this.selectedItem.viCodigoUnico;
    params.viFechaIngreso = moment(params.viFechaIngreso).format('YYYY-MM-DD');
    params.viFechaAgresion = moment(params.viFechaAgresion).format('YYYY-MM-DD');
    params.viFechaActualizacion = moment(params.viFechaActualizacion).format('YYYY-MM-DD');
    params.viCodigoVictima = this.selectedItem.victima.victimaCodigo;
    params.descadenanteList = this.selectedDescadenanteList.map((item) => {
      return {
        codigo: item.codigo
      };
    });
    params.objetoAgresionList = this.selectedObjetoAgresionList.map((item) => {
      return {
        codigo: item.codigo
      };
    });
    params.tipoAgresionList = this.selectedTipoAgresionList.map((item) => {
      return {
        codigo: item.codigo
      };
    });
    params.agresorList = this.selectedAgresorList.map((item) => {
      return {
        codigo: item.codigo
      };
    });

    this.spinner.show();
    this.apiService.violenciaIntraFamiliar.update(params).subscribe(() => {
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

    this.apiService.violenciaIntraFamiliar.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.violenciaIntraFamiliar().subscribe(
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
    this.selectedItem.viVictimaCodigo = this.selectedItem.victima.victimaCodigo;

    const value2Patch = {
      viCodigoVictima:
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


  // ================================  Descadenante Select BEGIN ================================

  openDescadenanteSelectDialog() {

    this.selectedDescadenanteList = this.selectedItem.descadenanteList;

    this.descadenanteFiltered = this.descadenanteSelectFilterKeyCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.codigo || value === '') {
            return of([]);
          }
          return this.apiService.descadenante.autoComplete({
            key: value.toLowerCase()
          });
        })
      );

    this.descadenanteSelectFilterKeyCtrl.setValue('');

    this.descadenanteSelectDialogRef = this.dialog.open(this.descadenanteSelectDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });
  }


  onDescadenanteSelectDialogOk() {

    this.selectedItem.descadenanteList = this.selectedDescadenanteList;
    //
    // const value2Patch = {
    //   viCodigoVictima:
    //     `${this.selectedItem.victima.victimaCodigo} (${this.selectedItem.victima.victimaApellidos} ${this.selectedItem.victima.victimaNombres})`
    // };
    //
    // this.createForm.patchValue(value2Patch);
    // this.editForm.patchValue(value2Patch);

    this.descadenanteSelectDialogRef.close();
  }

  onDescadenanteSelectDialogCancel() {
    this.descadenanteSelectDialogRef.close();

  }

  onDescadenanteSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    let found = false;
    const selectedValue = event.option.value;

    for (const item of this.selectedDescadenanteList) {
      if (item.codigo === selectedValue.codigo) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.selectedDescadenanteList.push(selectedValue);
    }
  }

  descadenanteAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.descripcion}`;
    }
  }

  // ================================  Descadenante Select END ================================


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
    //
    // const value2Patch = {
    //   viCodigoVictima:
    //     `${this.selectedItem.victima.victimaCodigo} (${this.selectedItem.victima.victimaApellidos} ${this.selectedItem.victima.victimaNombres})`
    // };
    //
    // this.createForm.patchValue(value2Patch);
    // this.editForm.patchValue(value2Patch);

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


  // ================================  TipoAgresion Select BEGIN ================================

  openTipoAgresionSelectDialog() {

    this.selectedTipoAgresionList = this.selectedItem.tipoAgresionList;

    this.tipoAgresionFiltered = this.tipoAgresionSelectFilterKeyCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.codigo || value === '') {
            return of([]);
          }
          return this.apiService.tipoAgresion.autoComplete({
            key: value.toLowerCase()
          });
        })
      );

    this.tipoAgresionSelectFilterKeyCtrl.setValue('');

    this.tipoAgresionSelectDialogRef = this.dialog.open(this.tipoAgresionSelectDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });
  }


  onTipoAgresionSelectDialogOk() {

    this.selectedItem.tipoAgresionList = this.selectedTipoAgresionList;

    this.tipoAgresionSelectDialogRef.close();
  }

  onTipoAgresionSelectDialogCancel() {
    this.tipoAgresionSelectDialogRef.close();

  }

  onTipoAgresionSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    let found = false;
    const selectedValue = event.option.value;

    for (const item of this.selectedTipoAgresionList) {
      if (item.codigo === selectedValue.codigo) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.selectedTipoAgresionList.push(selectedValue);
    }
  }

  tipoAgresionAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.descripcion}`;
    }
  }

  // ================================  TipoAgresion Select END ================================


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
    //
    // const value2Patch = {
    //   viCodigoVictima:
    //     `${this.selectedItem.victima.victimaCodigo} (${this.selectedItem.victima.victimaApellidos} ${this.selectedItem.victima.victimaNombres})`
    // };
    //
    // this.createForm.patchValue(value2Patch);
    // this.editForm.patchValue(value2Patch);

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
}


class ViolenciaIntraFamiliarDataSource implements DataSource<any> {

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

    this.apiService.violenciaIntraFamiliar
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

