import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PAGE_STATE} from '../../define/enums';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
import {LibadorCreateDialogComponent} from '../libador-create-dialog/libador-create-dialog.component';
import {LesionCreateDialogComponent} from '../lesion-create-dialog/lesion-create-dialog.component';

@Component({
  selector: 'app-lesiones-page',
  templateUrl: './lesiones-page.component.html',
  styleUrls: ['./lesiones-page.component.scss']
})
export class LesionesPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    tipoPuntoList: [],
    responsableEscanerList: [],
    fiscaliaList: [],
    fiscalList: [],
    parroquiaList: [],
    barrioList: [],
    tipoRiniaList: [],
    grupoFocalesList: [],
    mecanismoAgresorList: [],
    diaList: [],
    mesList: [],
    lugarList: [],
    datosGeoReferenciacionList: [],

    relacionAgresorList: [],
    indicioEstupefacientesList: [],
    gradoAlcoholAgresorList: [],
    objetoAgresionList: [],
    tipoAgresionList: [],

    rangoLesionList: [],
    gradoAlcoholVictimaList: []

  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;

  selectedItem: any = undefined;


  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'leCodigoUnico',
    'leCodigoSecuencial',
    'leClaveExpediente',
    'leCodigoTipoPunto',
    'leCodigoRespScanner',
    'leCodigoFiscalia',
    'leCodigoFiscal',
    'leNumeroDenuncia',
    'leFechaDenuncia',
    'leDireccionDenuncia',
    'leCodigoParroquia',
    'leCodigoBarrio',
    'leCodigoTipoRinia',
    'leCodigoGrupoFocal',
    'leCodigoMecanismoAgresor',
    'leFechaHecho',
    'leCodigoDia',
    'leCodigoMes',
    'leCodigoAnio',
    'leHora',
    'leMinutos',
    'leCodigoLugar',
    'leDelitoFlagrante',
    'leNumeroHombres',
    'leNumeroMujeres',
    'leObservaciones',
    'leFechaActualizacion',
    'leGeoReferenciacion',
    'leCodigoGeo',
    'leEstado',
    'Actions',
  ];

  dataSource: LesionesDataSource;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10, 20, 50];


  // BEGIN --- LesionAgresor relation
  lesionAgresorCreateForm: FormGroup;
  @ViewChild('lesionAgresorDialog') lesionAgresorDialogTemplateRef;
  lesionAgresorDialogRef: any;

  agresorFiltered: Observable<any[]>;
  selectedLesionAgresorList: any;

  // END --- LesionAgresor relation


  // BEGIN --- LesionVictima relation
  lesionVictimaCreateForm: FormGroup;
  @ViewChild('lesionVictimaDialog') lesionVictimaDialogTemplateRef;
  lesionVictimaDialogRef: any;

  victimaFiltered: Observable<any[]>;
  selectedLesionVictimaList: any;

  // END --- LesionVictima relation


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
    this.dataSource = new LesionesDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      leCodigoSecuencial: [null, Validators.compose([Validators.required])],
      leClaveExpediente: [null, Validators.compose([Validators.required])],
      leCodigoTipoPunto: [null, Validators.compose([Validators.required])],
      leCodigoRespScanner: [null, Validators.compose([Validators.required])],
      leCodigoFiscalia: [null, Validators.compose([Validators.required])],
      leCodigoFiscal: [null, Validators.compose([Validators.required])],
      leNumeroDenuncia: [null, Validators.compose([Validators.required])],
      leFechaDenuncia: [null, Validators.compose([Validators.required])],
      leDireccionDenuncia: [null, Validators.compose([Validators.required])],
      leCodigoParroquia: [null, Validators.compose([Validators.required])],
      leCodigoBarrio: [null, Validators.compose([Validators.required])],
      leCodigoTipoRinia: [null, Validators.compose([Validators.required])],
      leCodigoGrupoFocal: [null, Validators.compose([Validators.required])],
      leCodigoMecanismoAgresor: [null, Validators.compose([Validators.required])],
      leFechaHecho: [null, Validators.compose([Validators.required])],
      leCodigoDia: [null, Validators.compose([Validators.required])],
      leCodigoMes: [null, Validators.compose([Validators.required])],
      leCodigoAnio: [null, Validators.compose([Validators.required])],
      leHora: [null, Validators.compose([Validators.required])],
      leMinutos: [null, Validators.compose([Validators.required])],
      leCodigoLugar: [null, Validators.compose([Validators.required])],
      leDelitoFlagrante: [null, Validators.compose([Validators.required])],
      leNumeroHombres: [null, Validators.compose([Validators.required])],
      leNumeroMujeres: [null, Validators.compose([Validators.required])],
      leObservaciones: [null, Validators.compose([Validators.required])],
      leFechaActualizacion: [null, Validators.compose([Validators.required])],
      leGeoReferenciacion: [null, Validators.compose([Validators.required])],
      leCodigoGeo: [null, Validators.compose([Validators.required])],
      leEstado: [null, Validators.compose([Validators.required])],
    };

    this.createForm = this.fb.group(controlsConfig);

    this.editForm = this.fb.group(controlsConfig);

    this.lesionAgresorCreateForm = this.fb.group({
      agresor: [null, Validators.compose([Validators.required])],
      relacionAgresor: [null, Validators.compose([Validators.required])],
      indicioEstupefacientes: [null, Validators.compose([Validators.required])],
      gradoAlcoholAgresor: [null, Validators.compose([Validators.required])],
      objetoAgresion: [null, Validators.compose([Validators.required])],
      tipoAgresion: [null, Validators.compose([Validators.required])],
    });


    this.lesionVictimaCreateForm = this.fb.group({
      victima: [null, Validators.compose([Validators.required])],
      rangoLesion: [null, Validators.compose([Validators.required])],
      indicioEstupefacientes: [null, Validators.compose([Validators.required])],
      gradoAlcoholVictima: [null, Validators.compose([Validators.required])],
    });

    this.createForm.controls['leGeoReferenciacion'].valueChanges.subscribe((value) => {
      const codigoGeoControl = this.createForm.controls['leCodigoGeo'];
      if (value === 1) {
        codigoGeoControl.setValidators([Validators.compose([Validators.required])]);
      } else {
        codigoGeoControl.setValidators([]);
      }
      codigoGeoControl.updateValueAndValidity();
    });

    this.editForm.controls['leGeoReferenciacion'].valueChanges.subscribe((value) => {
      const codigoGeoControl = this.editForm.controls['leCodigoGeo'];
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
    this.selectedItem.lesionAgresorList = [];
    this.selectedItem.lesionVictimaList = [];

    this.loadRelatedData(() => {

      this.createForm.reset();
      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });

  }

  create() {


    const params = this.createForm.value;

    params.leFechaDenuncia = moment(params.leFechaDenuncia).format('YYYY-MM-DD');
    params.leFechaHecho = moment(params.leFechaHecho).format('YYYY-MM-DD');
    params.leFechaActualizacion = moment(params.leFechaActualizacion).format('YYYY-MM-DD');

    params.lesionAgresorList = this.selectedLesionAgresorList || [];
    params.lesionVictimaList = this.selectedLesionVictimaList || [];


    this.spinner.show();
    this.apiService.lesiones.create(params).subscribe(() => {
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
        leCodigoSecuencial: this.selectedItem.leCodigoSecuencial,
        leClaveExpediente: this.selectedItem.leClaveExpediente,
        leCodigoTipoPunto: this.selectedItem.leCodigoTipoPunto,
        leCodigoRespScanner: this.selectedItem.leCodigoRespScanner,
        leCodigoFiscalia: this.selectedItem.leCodigoFiscalia,
        leCodigoFiscal: this.selectedItem.leCodigoFiscal,
        leNumeroDenuncia: this.selectedItem.leNumeroDenuncia,
        leFechaDenuncia: new Date(this.selectedItem.leFechaDenuncia),
        leDireccionDenuncia: this.selectedItem.leDireccionDenuncia,
        leCodigoParroquia: this.selectedItem.leCodigoParroquia,
        leCodigoBarrio: this.selectedItem.leCodigoBarrio,
        leCodigoTipoRinia: this.selectedItem.leCodigoTipoRinia,
        leCodigoGrupoFocal: this.selectedItem.leCodigoGrupoFocal,
        leCodigoMecanismoAgresor: this.selectedItem.leCodigoMecanismoAgresor,
        leFechaHecho: new Date(this.selectedItem.leFechaHecho),
        leCodigoDia: this.selectedItem.leCodigoDia,
        leCodigoMes: this.selectedItem.leCodigoMes,
        leCodigoAnio: this.selectedItem.leCodigoAnio,
        leHora: this.selectedItem.leHora,
        leMinutos: this.selectedItem.leMinutos,
        leCodigoLugar: this.selectedItem.leCodigoLugar,
        leDelitoFlagrante: this.selectedItem.leDelitoFlagrante,
        leNumeroHombres: this.selectedItem.leNumeroHombres,
        leNumeroMujeres: this.selectedItem.leNumeroMujeres,
        leObservaciones: this.selectedItem.leObservaciones,
        leFechaActualizacion: new Date(this.selectedItem.leFechaActualizacion),
        leGeoReferenciacion: this.selectedItem.leGeoReferenciacion,
        leCodigoGeo: this.selectedItem.leCodigoGeo,
        leEstado: this.selectedItem.leEstado,
      });
      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.leCodigoUnico = this.selectedItem.leCodigoUnico;

    params.leFechaDenuncia = moment(params.leFechaDenuncia).format('YYYY-MM-DD');
    params.leFechaHecho = moment(params.leFechaHecho).format('YYYY-MM-DD');
    params.leFechaActualizacion = moment(params.leFechaActualizacion).format('YYYY-MM-DD');

    params.lesionAgresorList = this.selectedLesionAgresorList || [];
    params.lesionVictimaList = this.selectedLesionVictimaList || [];


    this.spinner.show();
    this.apiService.lesiones.update(params).subscribe(() => {
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

    this.apiService.lesiones.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.lesiones().subscribe(
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


  // BEGIN --- LesionAgresor relation

  openLesionAgresorDialog() {

    this.selectedLesionAgresorList = this.selectedItem.lesionAgresorList;

    this.lesionAgresorCreateForm.reset();
    this.lesionAgresorCreateForm.markAsUntouched();

    this.agresorFiltered = this.lesionAgresorCreateForm.controls['agresor'].valueChanges
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


    this.lesionAgresorDialogRef = this.dialog.open(this.lesionAgresorDialogTemplateRef, {
      width: '1200px',
      disableClose: true
    });
  }

  createLesionAgresor() {

    const lesionAgresor = this.lesionAgresorCreateForm.value;

    if (!lesionAgresor.agresor.codigo) {
      return;
    }

    lesionAgresor.id = {
      codigo: this.selectedItem.leCodigoUnico,
      codigoAgresor: lesionAgresor.agresor.codigo
    };
    let found = false;

    for (const item of this.selectedLesionAgresorList) {
      if (item.id.codigo === lesionAgresor.id.codigo &&
        item.id.codigoAgresor === lesionAgresor.id.codigoAgresor) {
        found = true;
        break;
      }
    }

    if (found) {
      return;
    }

    lesionAgresor.codigoAgresor = lesionAgresor.agresor.codigo;
    lesionAgresor.codigoRelacionAgresor = lesionAgresor.relacionAgresor.codigo;
    lesionAgresor.codigoIndicioEstupefaciente = lesionAgresor.indicioEstupefacientes.codigo;
    lesionAgresor.codigoGradoAlcoholAgresor = lesionAgresor.gradoAlcoholAgresor.codigo;
    lesionAgresor.codigoObjetoAgresion = lesionAgresor.objetoAgresion.codigo;
    lesionAgresor.codigoTipoAgresion = lesionAgresor.tipoAgresion.codigo;

    this.selectedLesionAgresorList.push(lesionAgresor);

  }

  agresorAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.apellidos} ${item.nombres}`;
    }
  }

  onAgresorSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.lesionAgresorCreateForm.controls['agresor'].setValue(event.option.value);
  }

  onLesionAgresorDialogDialogOk() {
    this.selectedItem.lesionAgresorList = this.selectedLesionAgresorList;
    this.lesionAgresorDialogRef.close();
  }
  // **********************2019-03-20 created****************************
  onLesionAgresorDialogDialogNew() {
    this.selectedItem.lesionAgresorList = this.selectedLesionAgresorList;
    this.lesionAgresorDialogRef.close();
    const dialogRef = this.dialog.open(LesionCreateDialogComponent, {
      width: '600px',
      height: '800px',
      data: {
        name: 'name',
        animal: 'animal'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if (result) {
        this.onLesionAgresorDialogDialogOk();
      }
    });

  }
  // **********************2019-03-20 created****************************//
  onLesionAgresorDialogDialogCancel() {
    this.lesionAgresorDialogRef.close();

  }

  // END --- LesionAgresor relation


  // BEGIN --- LesionVictima relation

  openLesionVictimaDialog() {

    this.selectedLesionVictimaList = this.selectedItem.lesionVictimaList;

    this.lesionVictimaCreateForm.reset();
    this.lesionVictimaCreateForm.markAsUntouched();

    this.victimaFiltered = this.lesionVictimaCreateForm.controls['victima'].valueChanges
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


    this.lesionVictimaDialogRef = this.dialog.open(this.lesionVictimaDialogTemplateRef, {
      width: '1200px',
      disableClose: true
    });
  }

  createLesionVictima() {

    const lesionVictima = this.lesionVictimaCreateForm.value;

    if (!lesionVictima.victima.victimaCodigo) {
      return;
    }

    lesionVictima.id = {
      codigo: this.selectedItem.leCodigoUnico,
      codigoVictima: lesionVictima.victima.victimaCodigo
    };
    let found = false;

    for (const item of this.selectedLesionVictimaList) {
      if (item.id.codigo === lesionVictima.id.codigo &&
        item.id.codigoVictima === lesionVictima.id.codigoVictima) {
        found = true;
        break;
      }
    }

    if (found) {
      return;
    }

    lesionVictima.codigoVictima = lesionVictima.victima.victimaCodigo;
    lesionVictima.codigoRangoLesion = lesionVictima.rangoLesion.codigo;
    lesionVictima.codigoIndicioEstupefacientes = lesionVictima.indicioEstupefacientes.codigo;
    lesionVictima.codigoGradoAlcoholVictima = lesionVictima.gradoAlcoholVictima.gradoAlcoholVictimaCodigo;

    this.selectedLesionVictimaList.push(lesionVictima);

  }

  victimaAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.victimaApellidos} ${item.victimaNombres}`;
    }
  }

  onVictimaSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.lesionVictimaCreateForm.controls['victima'].setValue(event.option.value);
  }

  onLesionVictimaDialogDialogOk() {
    this.selectedItem.lesionVictimaList = this.selectedLesionVictimaList;
    this.lesionVictimaDialogRef.close();
  }

  onLesionVictimaDialogDialogCancel() {
    this.lesionVictimaDialogRef.close();

  }

  // END --- LesionVictima relation


}


class LesionesDataSource implements DataSource<any> {

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

    this.apiService.lesiones
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

