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
  selector: 'app-amenazas-page',
  templateUrl: './amenazas-page.component.html',
  styleUrls: ['./amenazas-page.component.scss']
})
export class AmenazasPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    tipoPuntoList: [],
    responsableEscanerList: [],
    fiscaliaList: [],
    fiscalList: [],
    barrioList: [],
    parroquiaList: [],
    diaList: [],
    mesList: [],
    lugarList: [],
    causaAmenazaList: [],
    amTipoAmenazaList: [],
    relacionAgresorList: [],
    amAlcoholAgresorList: [],
    amGradoAlcoholAgresorList: [],
    datosGeoReferenciacionList: [],

  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;

  selectedItem: any = undefined;


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



  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'CodigoUnico',
    'Secuencial',
    'ClaveExpediente',
    'CodigoTipoPunto',
    'CodigoResponsableEscaner',
    'CodigoFiscalia',
    'CodigoFiscal',
    'NumeroDenuncia',
    'FechaDenuncia',
    'Direccion',
    'CodigoBarrio',
    'CodigoParroquia',
    'FechaHecho',
    'CodigoDia',
    'CodigoMes',
    'AnioHecho',
    'HoraHecho',
    'MinutoHecho',
    'CodigoLugar',
    'CodigoCausaAmenaza',
    'CodigoObjeto',
    'CodigoTipoAmenaza',
    'DelitoFlagrante',
    'NumeroHombresAgresores',
    'NumeroMujeresAgresores',
    'CodigoRelacionAgresor',
    'CodigoAlcoholAgresor',
    'CodGradoAlcoholAgresor',
    'Observaciones',
    'FechaActualizacion',
    'GeoReferenciacion',
    'Estado',
    'GradoDiscapacidad',
    'CodigoGeo',

    'Actions',
  ];

  dataSource: AmenazasDataSource;
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
    this.dataSource = new AmenazasDataSource(this.apiService, this.spinner);

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
      claveExpediente: [null, Validators.compose([Validators.required])],
      codigoTipoPunto: [null, Validators.compose([Validators.required])],
      codigoResponsableEscaner: [null, Validators.compose([Validators.required])],
      codigoFiscalia: [null, Validators.compose([Validators.required])],
      codigoFiscal: [null, Validators.compose([Validators.required])],
      numeroDenuncia: [null, Validators.compose([Validators.required])],
      fechaDenuncia: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([Validators.required])],
      codigoBarrio: [null, Validators.compose([Validators.required])],
      codigoParroquia: [null, Validators.compose([Validators.required])],
      fechaHecho: [null, Validators.compose([Validators.required])],
      codigoDia: [null, Validators.compose([Validators.required])],
      codigoMes: [null, Validators.compose([Validators.required])],
      anioHecho: [null, Validators.compose([Validators.required])],
      horaHecho: [null, Validators.compose([Validators.required])],
      minutoHecho: [null, Validators.compose([Validators.required])],
      codigoLugar: [null, Validators.compose([Validators.required])],
      codigoCausaAmenaza: [null, Validators.compose([Validators.required])],
      codigoObjeto: [null, Validators.compose([Validators.required])],
      codigoTipoAmenaza: [null, Validators.compose([Validators.required])],
      delitoFlagrante: [null, Validators.compose([Validators.required])],
      numeroHombresAgresores: [null, Validators.compose([Validators.required])],
      numeroMujeresAgresores: [null, Validators.compose([Validators.required])],
      codigoRelacionAgresor: [null, Validators.compose([Validators.required])],
      codigoAlcoholAgresor: [null, Validators.compose([Validators.required])],
      codGradoAlcoholAgresor: [null, Validators.compose([Validators.required])],
      observaciones: [null, Validators.compose([Validators.required])],
      fechaActualizacion: [null, Validators.compose([Validators.required])],
      geoReferenciacion: [null, Validators.compose([Validators.required])],
      estado: [null, Validators.compose([Validators.required])],
      gradoDiscapacidad: [null, Validators.compose([Validators.required])],
      codigoGeo: [null, Validators.compose([Validators.required])],
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

    this.selectedItem.agresorList = [];
    this.selectedAgresorList = this.selectedItem.agresorList;

    this.selectedItem.victimaList = [];
    this.selectedVictimaList = this.selectedItem.victimaList;

    this.selectedItem.objetoAgresionList = [];
    this.selectedObjetoAgresionList = this.selectedItem.objetoAgresionList;

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
    params.fechaActualizacion = moment(params.fechaActualizacion).format('YYYY-MM-DD');

    params.objetoAgresionList = this.selectedObjetoAgresionList.map((item) => {
      return {
        codigo: item.codigo
      };
    });

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

    this.spinner.show();
    this.apiService.amenazas.create(params).subscribe(() => {
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

        secuencial: this.selectedItem.secuencial,
        claveExpediente: this.selectedItem.claveExpediente,
        codigoTipoPunto: this.selectedItem.codigoTipoPunto,
        codigoResponsableEscaner: this.selectedItem.codigoResponsableEscaner,
        codigoFiscalia: this.selectedItem.codigoFiscalia,
        codigoFiscal: this.selectedItem.codigoFiscal,
        numeroDenuncia: this.selectedItem.numeroDenuncia,
        fechaDenuncia: new Date(this.selectedItem.fechaDenuncia),
        direccion: this.selectedItem.direccion,
        codigoBarrio: this.selectedItem.codigoBarrio,
        codigoParroquia: this.selectedItem.codigoParroquia,
        fechaHecho: new Date(this.selectedItem.fechaHecho),
        codigoDia: this.selectedItem.codigoDia,
        codigoMes: this.selectedItem.codigoMes,
        anioHecho: this.selectedItem.anioHecho,
        horaHecho: this.selectedItem.horaHecho,
        minutoHecho: this.selectedItem.minutoHecho,
        codigoLugar: this.selectedItem.codigoLugar,
        codigoCausaAmenaza: this.selectedItem.codigoCausaAmenaza,
        codigoObjeto: this.selectedItem.codigoObjeto,
        codigoTipoAmenaza: this.selectedItem.codigoTipoAmenaza,
        delitoFlagrante: this.selectedItem.delitoFlagrante,
        numeroHombresAgresores: this.selectedItem.numeroHombresAgresores,
        numeroMujeresAgresores: this.selectedItem.numeroMujeresAgresores,
        codigoRelacionAgresor: this.selectedItem.codigoRelacionAgresor,
        codigoAlcoholAgresor: this.selectedItem.codigoAlcoholAgresor,
        codGradoAlcoholAgresor: this.selectedItem.codGradoAlcoholAgresor,
        observaciones: this.selectedItem.observaciones,
        fechaActualizacion: new Date(this.selectedItem.fechaActualizacion),
        geoReferenciacion: this.selectedItem.geoReferenciacion,
        estado: this.selectedItem.estado,
        gradoDiscapacidad: this.selectedItem.gradoDiscapacidad,
        codigoGeo: this.selectedItem.codigoGeo,

      });

      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.codigoUnico = this.selectedItem.codigoUnico;

    params.fechaDenuncia = moment(params.fechaDenuncia).format('YYYY-MM-DD');
    params.fechaHecho = moment(params.fechaHecho).format('YYYY-MM-DD');
    params.fechaActualizacion = moment(params.fechaActualizacion).format('YYYY-MM-DD');


    params.objetoAgresionList = this.selectedObjetoAgresionList.map((item) => {
      return {
        codigo: item.codigo
      };
    });
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

    this.spinner.show();
    this.apiService.amenazas.update(params).subscribe(() => {
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

    this.apiService.amenazas.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.amenazas().subscribe(
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


class AmenazasDataSource implements DataSource<any> {

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

    this.apiService.amenazas
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

