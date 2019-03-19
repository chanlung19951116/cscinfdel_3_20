import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PAGE_STATE} from '../../define/enums';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatDialog, MatPaginator} from '@angular/material';
import {BehaviorSubject, fromEvent, Observable, of} from 'rxjs';
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
  selector: 'app-robos-hurtos-general-page',
  templateUrl: './robos-hurtos-general-page.component.html',
  styleUrls: ['./robos-hurtos-general-page.component.scss']
})
export class RobosHurtosGeneralPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    parroquiaList: [],
    tipoPuntoList: [],
    responsableEscanerList: [],
    fiscaliaList: [],
    fiscalList: [],
    diaList: [],
    mesList: [],
    tipoDelitoList: [],
    afectadoList: [],
    lugarList: [],
    autorDelitoList: [],
    modalidadDelitoList: [],
    tipoAgresionList: [],
    objetoAgresionList: [],
    objetoRobadoVehiculoList: [],
    datosGeoReferenciacionList: [],
    objetoHurtadoList: [],
  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;
  objetosHurtadosCreateForm: FormGroup;

  selectedItem: any = undefined;


  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [

    'rhCodigoUnico',
    'rhCodigoParroquia',
    'rhFechaDenuncia',
    'rhCodigoSecuencial',
    'rhClaveExpediente',
    'rhCodigoTipoPunto',
    'rhCodigoResponsableScanner',
    'rhCodigoFiscalia',
    'rhCodigoFiscal',
    'rhNumeroDenuncia',
    'rhDireccionDenuncia',
    'rhFechaHecho',
    'rhCodigoDia',
    'rhCodigoMes',
    'rhCodigoAnio',
    'rhHora',
    'rhMinutos',
    'rhHorarioHecho',
    'rhCodigoTipoDelito',
    'rhCodigoAfectados',
    'rhCodigoLugar',
    'rhCodigoAutorDelito',
    'rhCodigoModalidadDelito',
    'rhCodigoTipoAgresion',
    'rhCodigoObjetoAgresion',
    'rhDelitoFlagrantes',
    'rhNumeroAgresoresHombres',
    'rhNumeroAgresoresMujeres',
    'rhFechaIngreso',
    'rhObservaciones',
    'rhCodigoDigitadorModifica',
    'rhFechaModificacion',
    'rhGeoReferenciacion',
    'rhCodigoGeo',
    'rhAvaluoTotal',
    'rhEstado',

    'Actions',
  ];

  dataSource: RobosHurtosGeneralDataSource;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10, 20, 50];

  @ViewChild('objetosHurtadosDialog') objetosHurtadosDialogTemplateRef;
  objetosHurtadosDialogRef: any;

  selectedObjetosHurtadosList: any;


  // === Agresor Select BEGIN ===
  selectedAgresorList: any = undefined;

  agresorSelectFilterKeyCtrl = new FormControl();
  agresorFiltered: Observable<any[]>;

  @ViewChild('agresorSelectDialog') agresorSelectDialogTemplateRef;
  agresorSelectDialogRef: any;
  // === Agresor Select END ===


  // === Victima Select BEGIN ===
  selectedVictimaList: any = undefined;

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
    this.dataSource = new RobosHurtosGeneralDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {

      rhCodigoParroquia: [null, Validators.compose([Validators.required])],
      rhFechaDenuncia: [null, Validators.compose([Validators.required])],
      rhCodigoSecuencial: [null, Validators.compose([Validators.required])],
      rhClaveExpediente: [null, Validators.compose([Validators.required])],
      rhCodigoTipoPunto: [null, Validators.compose([Validators.required])],
      rhCodigoResponsableScanner: [null, Validators.compose([Validators.required])],
      rhCodigoFiscalia: [null, Validators.compose([Validators.required])],
      rhCodigoFiscal: [null, Validators.compose([Validators.required])],
      rhNumeroDenuncia: [null, Validators.compose([Validators.required])],
      rhDireccionDenuncia: [null, Validators.compose([Validators.required])],
      rhFechaHecho: [null, Validators.compose([Validators.required])],
      rhCodigoDia: [null, Validators.compose([Validators.required])],
      rhCodigoMes: [null, Validators.compose([Validators.required])],
      rhCodigoAnio: [null, Validators.compose([Validators.required])],
      rhHora: [null, Validators.compose([Validators.required])],
      rhMinutos: [null, Validators.compose([Validators.required])],
      rhHorarioHecho: [null, Validators.compose([Validators.required])],
      rhCodigoTipoDelito: [null, Validators.compose([Validators.required])],
      rhCodigoAfectados: [null, Validators.compose([Validators.required])],
      rhCodigoLugar: [null, Validators.compose([Validators.required])],
      rhCodigoAutorDelito: [null, Validators.compose([Validators.required])],
      rhCodigoModalidadDelito: [null, Validators.compose([Validators.required])],
      rhCodigoTipoAgresion: [null, Validators.compose([Validators.required])],
      rhCodigoObjetoAgresion: [null, Validators.compose([Validators.required])],
      rhDelitoFlagrantes: [null, Validators.compose([Validators.required])],
      rhNumeroAgresoresHombres: [null, Validators.compose([Validators.required])],
      rhNumeroAgresoresMujeres: [null, Validators.compose([Validators.required])],
      rhFechaIngreso: [null, Validators.compose([Validators.required])],
      rhObservaciones: [null, Validators.compose([Validators.required])],
      rhCodigoDigitadorModifica: [null, Validators.compose([Validators.required])],
      rhFechaModificacion: [null, Validators.compose([Validators.required])],
      rhGeoReferenciacion: [null, Validators.compose([Validators.required])],
      rhCodigoGeo: [null, Validators.compose([Validators.required])],
      rhAvaluoTotal: [null, Validators.compose([Validators.required])],
      rhEstado: [null, Validators.compose([Validators.required])],

    };

    this.createForm = this.fb.group(controlsConfig);

    this.editForm = this.fb.group(controlsConfig);


    this.objetosHurtadosCreateForm = this.fb.group({

      ohCodigo: [null, Validators.compose([Validators.required])],
      ohObjetoRecuperado: [null, Validators.compose([Validators.required])],
    });

    this.createForm.controls['rhGeoReferenciacion'].valueChanges.subscribe((value) => {
      const codigoGeoControl = this.createForm.controls['rhCodigoGeo'];
      if (value === 1) {
        codigoGeoControl.setValidators([Validators.compose([Validators.required])]);
      } else {
        codigoGeoControl.setValidators([]);
      }
      codigoGeoControl.updateValueAndValidity();
    });

    this.editForm.controls['rhGeoReferenciacion'].valueChanges.subscribe((value) => {
      const codigoGeoControl = this.editForm.controls['rhCodigoGeo'];
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

    this.selectedItem.victimaList = [];
    this.selectedVictimaList = this.selectedItem.victimaList;

    this.selectedItem.objetoAgresionList = [];
    this.selectedObjetoAgresionList = this.selectedItem.objetoAgresionList;


    this.selectedItem.objetosHurtadosList = [];

    this.loadRelatedData(() => {

      this.createForm.reset();
      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });

  }

  create() {


    const params = this.createForm.value;

    params.rhFechaDenuncia = moment(params.rhFechaDenuncia).format('YYYY-MM-DD');
    params.rhFechaHecho = moment(params.rhFechaHecho).format('YYYY-MM-DD');
    params.rhFechaIngreso = moment(params.rhFechaIngreso).format('YYYY-MM-DD');
    params.rhFechaModificacion = moment(params.rhFechaModificacion).format('YYYY-MM-DD');

    params.objetosHurtadosList = this.selectedObjetosHurtadosList || [];

    params.agresorList = this.selectedAgresorList.map((item) => {
      return {
        codigo: item.codigo
      };
    });

    params.victimaList = this.selectedVictimaList.map((item) => {
      return {
        victimaCodigo: item.victimaCodigo
      };
    });

    params.objetoAgresionList = this.selectedObjetoAgresionList.map((item) => {
      return {
        codigo: item.codigo
      };
    });


    this.spinner.show();
    this.apiService.robosHurtosGeneral.create(params).subscribe(() => {
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
      this.selectedVictimaList = this.selectedItem.victimaList;

      this.editForm.patchValue({
        rhCodigoParroquia: this.selectedItem.rhCodigoParroquia,
        rhFechaDenuncia: this.selectedItem.rhFechaDenuncia,
        rhCodigoSecuencial: this.selectedItem.rhCodigoSecuencial,
        rhClaveExpediente: this.selectedItem.rhClaveExpediente,
        rhCodigoTipoPunto: this.selectedItem.rhCodigoTipoPunto,
        rhCodigoResponsableScanner: this.selectedItem.rhCodigoResponsableScanner,
        rhCodigoFiscalia: this.selectedItem.rhCodigoFiscalia,
        rhCodigoFiscal: this.selectedItem.rhCodigoFiscal,
        rhNumeroDenuncia: this.selectedItem.rhNumeroDenuncia,
        rhDireccionDenuncia: this.selectedItem.rhDireccionDenuncia,
        rhFechaHecho: this.selectedItem.rhFechaHecho,
        rhCodigoDia: this.selectedItem.rhCodigoDia,
        rhCodigoMes: this.selectedItem.rhCodigoMes,
        rhCodigoAnio: this.selectedItem.rhCodigoAnio,
        rhHora: this.selectedItem.rhHora,
        rhMinutos: this.selectedItem.rhMinutos,
        rhHorarioHecho: this.selectedItem.rhHorarioHecho,
        rhCodigoTipoDelito: this.selectedItem.rhCodigoTipoDelito,
        rhCodigoAfectados: this.selectedItem.rhCodigoAfectados,
        rhCodigoLugar: this.selectedItem.rhCodigoLugar,
        rhCodigoAutorDelito: this.selectedItem.rhCodigoAutorDelito,
        rhCodigoModalidadDelito: this.selectedItem.rhCodigoModalidadDelito,
        rhCodigoTipoAgresion: this.selectedItem.rhCodigoTipoAgresion,
        rhCodigoObjetoAgresion: this.selectedItem.rhCodigoObjetoAgresion,
        rhDelitoFlagrantes: this.selectedItem.rhDelitoFlagrantes,
        rhNumeroAgresoresHombres: this.selectedItem.rhNumeroAgresoresHombres,
        rhNumeroAgresoresMujeres: this.selectedItem.rhNumeroAgresoresMujeres,
        rhFechaIngreso: this.selectedItem.rhFechaIngreso,
        rhObservaciones: this.selectedItem.rhObservaciones,
        rhCodigoDigitadorModifica: this.selectedItem.rhCodigoDigitadorModifica,
        rhFechaModificacion: this.selectedItem.rhFechaModificacion,
        rhGeoReferenciacion: this.selectedItem.rhGeoReferenciacion,
        rhCodigoGeo: this.selectedItem.rhCodigoGeo,
        rhAvaluoTotal: this.selectedItem.rhAvaluoTotal,
        rhEstado: this.selectedItem.rhEstado,
      });
      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.rhCodigoUnico = this.selectedItem.rhCodigoUnico;

    params.rhFechaDenuncia = moment(params.rhFechaDenuncia).format('YYYY-MM-DD');
    params.rhFechaHecho = moment(params.rhFechaHecho).format('YYYY-MM-DD');
    params.rhFechaIngreso = moment(params.rhFechaIngreso).format('YYYY-MM-DD');
    params.rhFechaModificacion = moment(params.rhFechaModificacion).format('YYYY-MM-DD');

    params.objetosHurtadosList = this.selectedObjetosHurtadosList || [];

    params.agresorList = this.selectedAgresorList.map((item) => {
      return {
        codigo: item.codigo
      };
    });


    params.victimaList = this.selectedVictimaList.map((item) => {
      return {
        victimaCodigo: item.victimaCodigo
      };
    });

    params.objetoAgresionList = this.selectedObjetoAgresionList.map((item) => {
      return {
        codigo: item.codigo
      };
    });

    this.spinner.show();
    this.apiService.robosHurtosGeneral.update(params).subscribe(() => {
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

    this.apiService.robosHurtosGeneral.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.robosHurtosGeneral().subscribe(
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


  openObjetosHurtadosDialog() {

    this.selectedObjetosHurtadosList = this.selectedItem.objetosHurtadosList;

    this.objetosHurtadosCreateForm.reset();
    this.objetosHurtadosCreateForm.markAsUntouched();


    this.objetosHurtadosDialogRef = this.dialog.open(this.objetosHurtadosDialogTemplateRef, {
      width: '800px',
      disableClose: true
    });
  }

  createObjetosHurtados() {

    const objetosHurtados = this.objetosHurtadosCreateForm.value;

    objetosHurtados.id = {
      ohCodigo: objetosHurtados.codigo,
      ohCodigoUnico: this.selectedItem.rhCodigoUnico
    };
    let found = false;

    for (const item of this.selectedObjetosHurtadosList) {
      if (item.id.ohCodigo === objetosHurtados.id.ohCodigo &&
        item.id.ohCodigoUnico === objetosHurtados.id.ohCodigoUnico) {
        found = true;
        break;
      }
    }

    for (const item of this.pageData.objetoHurtadoList) {
      if (item.codigo === objetosHurtados.ohCodigo) {
        objetosHurtados.objetoHurtado = item;
        break;
      }
    }


    if (!found) {
      this.selectedObjetosHurtadosList.push(objetosHurtados);
    }

  }

  onObjetosHurtadosDialogDialogOk() {
    this.selectedItem.objetosHurtadosList = this.selectedObjetosHurtadosList;
    this.objetosHurtadosDialogRef.close();
  }

  onObjetosHurtadosDialogDialogCancel() {
    this.objetosHurtadosDialogRef.close();
  }


  // ================================  Victima Select BEGIN ================================

  openVictimaSelectDialog() {

    this.selectedVictimaList = this.selectedItem.victimaList;

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

    this.selectedItem.victimaList = this.selectedVictimaList;

    this.victimaSelectDialogRef.close();
  }

  onVictimaSelectDialogCancel() {
    this.victimaSelectDialogRef.close();

  }

  onVictimaSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    let found = false;
    const selectedValue = event.option.value;

    for (const item of this.selectedVictimaList) {
      if (item.codigo === selectedValue.codigo) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.selectedVictimaList.push(selectedValue);
    }
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


class RobosHurtosGeneralDataSource implements DataSource<any> {

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

    this.apiService.robosHurtosGeneral
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

