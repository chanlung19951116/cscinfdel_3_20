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
  selector: 'app-delitos-sexuales-page',
  templateUrl: './delitos-sexuales-page.component.html',
  styleUrls: ['./delitos-sexuales-page.component.scss']
})
export class DelitosSexualesPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    parroquiaList: [],
    alcoholAgresorList: [],
    datosGeoReferenciacionList: [],
    dsContinuidadCasoList: [],
    fiscalList: [],
    fiscaliaList: [],
    gradoAlcoholAgresorList: [],
    lugarList: [],
    mecanismoAgresorList: [],
    objetoAgresionList: [],
    tipoAgresionList: [],
    tipoDelitoList: [],
    tipoPuntoList: [],
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


  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'dsCodigoUnico',
    'dsCodigoParroquia',
    'dsCodigoSecuencial',
    'dsClaveExpediente',
    'dsCodigoTipoPuntos',
    'dsCodigoFiscalia',
    'dsCodigoFiscal',
    'dsNumeroDenuncia',
    'dsFechaDenuncia',
    'dsCodigoDia',
    'dsCodigoMes',
    'dsCodigoAnio',
    'dsHora',
    'dsMinutos',
    'dsCodigoLugar',
    'dsCodigoMecanismoAgresor',
    'dsCodObjetoAgresion',
    'dsCodigoTipoDelito',
    'dsCodigoTipoAgresion',
    'dsDelitoFlagrante',
    'dsVicDiscapacidadesDiferentes',
    'dsCodigoAlcoholAgresor',
    'dsCodigoGradoAlcoholAgresor',
    'dsObservaciones',
    'dsFechaActualizacion',
    'dsGeoReferencia',
    'dsCodContinuidadCaso',
    'dsCodigoGeo',
    'dsEstado',
    'Actions',
  ];

  dataSource: DelitosSexualesDataSource;
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
    this.dataSource = new DelitosSexualesDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      dsCodigoParroquia: [null, Validators.compose([Validators.required])],
      dsCodigoSecuencial: [null, Validators.compose([Validators.required])],
      dsClaveExpediente: [null, Validators.compose([Validators.required])],
      dsCodigoTipoPuntos: [null, Validators.compose([Validators.required])],
      dsCodigoFiscalia: [null, Validators.compose([Validators.required])],
      dsCodigoFiscal: [null, Validators.compose([Validators.required])],
      dsNumeroDenuncia: [null, Validators.compose([Validators.required])],
      dsFechaDenuncia: [null, Validators.compose([Validators.required])],
      dsCodigoDia: [null, Validators.compose([Validators.required])],
      dsCodigoMes: [null, Validators.compose([Validators.required])],
      dsCodigoAnio: [null, Validators.compose([Validators.required])],
      dsHora: [null, Validators.compose([Validators.required])],
      dsMinutos: [null, Validators.compose([Validators.required])],
      dsCodigoLugar: [null, Validators.compose([Validators.required])],
      dsCodigoMecanismoAgresor: [null, Validators.compose([Validators.required])],
      dsCodObjetoAgresion: [null, Validators.compose([Validators.required])],
      dsCodigoTipoDelito: [null, Validators.compose([Validators.required])],
      dsCodigoTipoAgresion: [null, Validators.compose([Validators.required])],
      dsDelitoFlagrante: [null, Validators.compose([Validators.required])],
      dsVicDiscapacidadesDiferentes: [null, Validators.compose([Validators.required])],
      dsCodigoAlcoholAgresor: [null, Validators.compose([Validators.required])],
      dsCodigoGradoAlcoholAgresor: [null, Validators.compose([Validators.required])],
      dsObservaciones: [null, Validators.compose([Validators.required])],
      dsFechaActualizacion: [null, Validators.compose([Validators.required])],
      dsGeoReferencia: [null, Validators.compose([Validators.required])],
      dsCodContinuidadCaso: [null, Validators.compose([Validators.required])],
      dsCodigoGeo: [null, Validators.compose([Validators.required])],
      dsEstado: [null, Validators.compose([Validators.required])],
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


    this.loadRelatedData(() => {

      this.createForm.reset();
      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });

  }

  create() {


    const params = this.createForm.value;

    params.dsFechaDenuncia = moment(params.dsFechaDenuncia).format('YYYY-MM-DD');
    params.dsFechaActualizacion = moment(params.dsFechaActualizacion).format('YYYY-MM-DD');

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
    this.apiService.delitosSexuales.create(params).subscribe(() => {
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

      this.selectedAgresorList = this.selectedItem.agresorList;
      this.selectedVictimaList = this.selectedItem.victimaList;

      this.editForm.patchValue({


        dsCodigoParroquia: this.selectedItem.dsCodigoParroquia,
        dsCodigoSecuencial: this.selectedItem.dsCodigoSecuencial,
        dsClaveExpediente: this.selectedItem.dsClaveExpediente,
        dsCodigoTipoPuntos: this.selectedItem.dsCodigoTipoPuntos,
        dsCodigoFiscalia: this.selectedItem.dsCodigoFiscalia,
        dsCodigoFiscal: this.selectedItem.dsCodigoFiscal,
        dsNumeroDenuncia: this.selectedItem.dsNumeroDenuncia,
        dsFechaDenuncia: new Date(this.selectedItem.dsFechaDenuncia),
        dsCodigoDia: this.selectedItem.dsCodigoDia,
        dsCodigoMes: this.selectedItem.dsCodigoMes,
        dsCodigoAnio: this.selectedItem.dsCodigoAnio,
        dsHora: this.selectedItem.dsHora,
        dsMinutos: this.selectedItem.dsMinutos,
        dsCodigoLugar: this.selectedItem.dsCodigoLugar,
        dsCodigoMecanismoAgresor: this.selectedItem.dsCodigoMecanismoAgresor,
        dsCodObjetoAgresion: this.selectedItem.dsCodObjetoAgresion,
        dsCodigoTipoDelito: this.selectedItem.dsCodigoTipoDelito,
        dsCodigoTipoAgresion: this.selectedItem.dsCodigoTipoAgresion,
        dsDelitoFlagrante: this.selectedItem.dsDelitoFlagrante,
        dsVicDiscapacidadesDiferentes: this.selectedItem.dsVicDiscapacidadesDiferentes,
        dsCodigoAlcoholAgresor: this.selectedItem.dsCodigoAlcoholAgresor,
        dsCodigoGradoAlcoholAgresor: this.selectedItem.dsCodigoGradoAlcoholAgresor,
        dsObservaciones: this.selectedItem.dsObservaciones,
        dsFechaActualizacion: new Date(this.selectedItem.dsFechaActualizacion),
        dsGeoReferencia: this.selectedItem.dsGeoReferencia,
        dsCodContinuidadCaso: this.selectedItem.dsCodContinuidadCaso,
        dsCodigoGeo: this.selectedItem.dsCodigoGeo,
        dsEstado: this.selectedItem.dsEstado,
      });

      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.dsCodigoUnico = this.selectedItem.dsCodigoUnico;
    params.dsFechaDenuncia = moment(params.dsFechaDenuncia).format('YYYY-MM-DD');
    params.dsFechaActualizacion = moment(params.dsFechaActualizacion).format('YYYY-MM-DD');


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
    this.apiService.delitosSexuales.update(params).subscribe(() => {
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

    this.apiService.delitosSexuales.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.delitosSexuales().subscribe(
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
}


class DelitosSexualesDataSource implements DataSource<any> {

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

    this.apiService.delitosSexuales
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

