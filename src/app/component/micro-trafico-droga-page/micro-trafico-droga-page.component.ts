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
  selector: 'app-micro-trafico-droga-page',
  templateUrl: './micro-trafico-droga-page.component.html',
  styleUrls: ['./micro-trafico-droga-page.component.scss']
})
export class MicroTraficoDrogaPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    parroquiaList: [],
    fiscaliaList: [],
    fiscalList: [],
    diaList: [],
    mesList: [],
    tipoDelitoList: [],
    tipoProcedimientoList: [],
    datosGeoReferenciacionList: [],
    quienCometeDelitoList: [],
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


  // === EvidenciaEncontrada Select BEGIN ===
  selectedEvidenciaEncontradaList: any = undefined;

  evidenciaEncontradaSelectFilterKeyCtrl = new FormControl();
  evidenciaEncontradaFiltered: Observable<any[]>;

  @ViewChild('evidenciaEncontradaSelectDialog') evidenciaEncontradaSelectDialogTemplateRef;
  evidenciaEncontradaSelectDialogRef: any;
  // === EvidenciaEncontrada Select END ===


  // === SustanciaMicroTrafico Select BEGIN ===
  selectedSustanciaMicroTraficoList: any = undefined;

  sustanciaMicroTraficoSelectFilterKeyCtrl = new FormControl();
  sustanciaMicroTraficoFiltered: Observable<any[]>;

  @ViewChild('sustanciaMicroTraficoSelectDialog') sustanciaMicroTraficoSelectDialogTemplateRef;
  sustanciaMicroTraficoSelectDialogRef: any;
  // === SustanciaMicroTrafico Select END ===



  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'mtCodigoUnico',
    'mtSecuencial',
    'mtCodigoParroquia',
    'mtClaveFicha',
    'mtCodigoFiscalia',
    'mtCodigoFiscal',
    'mtNumeroDenuncia',
    'mtFechaDenuncia',
    'mtDireccionMicrotrafico',
    'mtFechaHecho',
    'mtCodigoDia',
    'mtCodigoMes',
    'mtCodigoAnio',
    'mtHoraHecho',
    'mtMinutosHechos',
    'mtCodigoTipoDelito',
    'mtCodigoLugarDelito',
    'mtCodigoTipoProcedimiento',
    'mtDelitoFlagrante',
    'mtEvidenciaEncontrada',
    'mtNumeroHombresDetenidos',
    'mtNumeroMujeresDetenidas',
    'mtFechaDigitado',
    'mtObservaciones',
    'mtGeoReferenciacion',
    'mtEstado',
    'mtCodigoGeo',
    'mtCodigoQuienComDelito',
    'mtCodigoTipoPunto',
    'Actions',
  ];

  dataSource: MicroTraficoDrogaDataSource;
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
    this.dataSource = new MicroTraficoDrogaDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {

      mtSecuencial: [null, Validators.compose([Validators.required])],
      mtCodigoParroquia: [null, Validators.compose([Validators.required])],
      mtClaveFicha: [null, Validators.compose([Validators.required])],
      mtCodigoFiscalia: [null, Validators.compose([Validators.required])],
      mtCodigoFiscal: [null, Validators.compose([Validators.required])],
      mtNumeroDenuncia: [null, Validators.compose([Validators.required])],
      mtFechaDenuncia: [null, Validators.compose([Validators.required])],
      mtDireccionMicrotrafico: [null, Validators.compose([Validators.required])],
      mtFechaHecho: [null, Validators.compose([Validators.required])],
      mtCodigoDia: [null, Validators.compose([Validators.required])],
      mtCodigoMes: [null, Validators.compose([Validators.required])],
      mtCodigoAnio: [null, Validators.compose([Validators.required])],
      mtHoraHecho: [null, Validators.compose([Validators.required])],
      mtMinutosHechos: [null, Validators.compose([Validators.required])],
      mtCodigoTipoDelito: [null, Validators.compose([Validators.required])],
      mtCodigoLugarDelito: [null, Validators.compose([Validators.required])],
      mtCodigoTipoProcedimiento: [null, Validators.compose([Validators.required])],
      mtDelitoFlagrante: [null, Validators.compose([Validators.required])],
      mtEvidenciaEncontrada: [null, Validators.compose([Validators.required])],
      mtNumeroHombresDetenidos: [null, Validators.compose([Validators.required])],
      mtNumeroMujeresDetenidas: [null, Validators.compose([Validators.required])],
      mtFechaDigitado: [null, Validators.compose([Validators.required])],
      mtObservaciones: [null, Validators.compose([Validators.required])],
      mtGeoReferenciacion: [null, Validators.compose([Validators.required])],
      mtEstado: [null, Validators.compose([Validators.required])],
      mtCodigoGeo: [null, Validators.compose([Validators.required])],
      mtCodigoQuienComDelito: [null, Validators.compose([Validators.required])],
      mtCodigoTipoPunto: [null, Validators.compose([Validators.required])],

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

    this.selectedItem.evidenciaEncontradaList = [];
    this.selectedEvidenciaEncontradaList = this.selectedItem.evidenciaEncontradaList;

    this.selectedItem.sustanciaMicroTraficoList = [];
    this.selectedSustanciaMicroTraficoList = this.selectedItem.sustanciaMicroTraficoList;

    this.loadRelatedData(() => {

      this.createForm.reset();
      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });

  }

  create() {


    const params = this.createForm.value;

    params.mtFechaDenuncia = moment(params.mtFechaDenuncia).format('YYYY-MM-DD');
    params.mtFechaHecho = moment(params.mtFechaHecho).format('YYYY-MM-DD');
    params.mtFechaDigitado = moment(params.mtFechaDigitado).format('YYYY-MM-DD');

    params.sustanciaMicroTraficoList = this.selectedSustanciaMicroTraficoList.map((item) => {
      return {
        smtCodigo: item.smtCodigo
      };
    });

    params.agresorList = this.selectedAgresorList.map((item) => {
      return {
        codigo: item.codigo
      };
    });

    params.evidenciaEncontradaList = this.selectedEvidenciaEncontradaList.map((item) => {
      return {
        eeCodigo: item.eeCodigo
      };
    });

    this.spinner.show();
    this.apiService.microTraficoDroga.create(params).subscribe(() => {
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

      this.selectedSustanciaMicroTraficoList = this.selectedItem.sustanciaMicroTraficoList;
      this.selectedAgresorList = this.selectedItem.agresorList;
      this.selectedEvidenciaEncontradaList = this.selectedItem.evidenciaEncontradaList;

      this.editForm.patchValue({

        mtSecuencial: this.selectedItem.mtSecuencial,
        mtCodigoParroquia: this.selectedItem.mtCodigoParroquia,
        mtClaveFicha: this.selectedItem.mtClaveFicha,
        mtCodigoFiscalia: this.selectedItem.mtCodigoFiscalia,
        mtCodigoFiscal: this.selectedItem.mtCodigoFiscal,
        mtNumeroDenuncia: this.selectedItem.mtNumeroDenuncia,
        mtFechaDenuncia: new Date(this.selectedItem.mtFechaDenuncia),
        mtDireccionMicrotrafico: this.selectedItem.mtDireccionMicrotrafico,
        mtFechaHecho: new Date(this.selectedItem.mtFechaHecho),
        mtCodigoDia: this.selectedItem.mtCodigoDia,
        mtCodigoMes: this.selectedItem.mtCodigoMes,
        mtCodigoAnio: this.selectedItem.mtCodigoAnio,
        mtHoraHecho: this.selectedItem.mtHoraHecho,
        mtMinutosHechos: this.selectedItem.mtMinutosHechos,
        mtCodigoTipoDelito: this.selectedItem.mtCodigoTipoDelito,
        mtCodigoLugarDelito: this.selectedItem.mtCodigoLugarDelito,
        mtCodigoTipoProcedimiento: this.selectedItem.mtCodigoTipoProcedimiento,
        mtDelitoFlagrante: this.selectedItem.mtDelitoFlagrante,
        mtEvidenciaEncontrada: this.selectedItem.mtEvidenciaEncontrada,
        mtNumeroHombresDetenidos: this.selectedItem.mtNumeroHombresDetenidos,
        mtNumeroMujeresDetenidas: this.selectedItem.mtNumeroMujeresDetenidas,
        mtFechaDigitado: new Date(this.selectedItem.mtFechaDigitado),
        mtObservaciones: this.selectedItem.mtObservaciones,
        mtGeoReferenciacion: this.selectedItem.mtGeoReferenciacion,
        mtEstado: this.selectedItem.mtEstado,
        mtCodigoGeo: this.selectedItem.mtCodigoGeo,
        mtCodigoQuienComDelito: this.selectedItem.mtCodigoQuienComDelito,
        mtCodigoTipoPunto: this.selectedItem.mtCodigoTipoPunto,

      });

      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.mtCodigoUnico = this.selectedItem.mtCodigoUnico;

    params.mtFechaDenuncia = moment(params.mtFechaDenuncia).format('YYYY-MM-DD');
    params.mtFechaHecho = moment(params.mtFechaHecho).format('YYYY-MM-DD');
    params.mtFechaDigitado = moment(params.mtFechaDigitado).format('YYYY-MM-DD');


    params.sustanciaMicroTraficoList = this.selectedSustanciaMicroTraficoList.map((item) => {
      return {
        smtCodigo: item.smtCodigo
      };
    });
    params.agresorList = this.selectedAgresorList.map((item) => {
      return {
        codigo: item.codigo
      };
    });

    params.evidenciaEncontradaList = this.selectedEvidenciaEncontradaList.map((item) => {
      return {
        eeCodigo: item.eeCodigo
      };
    });

    this.spinner.show();
    this.apiService.microTraficoDroga.update(params).subscribe(() => {
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

    this.apiService.microTraficoDroga.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.microTraficoDroga().subscribe(
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


  // ================================  EvidenciaEncontrada Select BEGIN ================================

  openEvidenciaEncontradaSelectDialog() {

    this.selectedEvidenciaEncontradaList = this.selectedItem.evidenciaEncontradaList;

    this.evidenciaEncontradaFiltered = this.evidenciaEncontradaSelectFilterKeyCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.eeCodigo || value === '') {
            return of([]);
          }
          return this.apiService.evidenciaEncontrada.autoComplete({
            key: value.toLowerCase()
          });
        })
      );

    this.evidenciaEncontradaSelectFilterKeyCtrl.setValue('');

    this.evidenciaEncontradaSelectDialogRef = this.dialog.open(this.evidenciaEncontradaSelectDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });
  }


  onEvidenciaEncontradaSelectDialogOk() {

    this.selectedItem.evidenciaEncontradaList = this.selectedEvidenciaEncontradaList;

    this.evidenciaEncontradaSelectDialogRef.close();
  }

  onEvidenciaEncontradaSelectDialogCancel() {
    this.evidenciaEncontradaSelectDialogRef.close();

  }

  onEvidenciaEncontradaSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    let found = false;
    const selectedValue = event.option.value;

    for (const item of this.selectedEvidenciaEncontradaList) {
      if (item.codigo === selectedValue.codigo) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.selectedEvidenciaEncontradaList.push(selectedValue);
    }
  }

  evidenciaEncontradaAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.eeDescripcion}`;
    }
  }

  // ================================  EvidenciaEncontrada Select END ================================




  // ================================  SustanciaMicroTrafico Select BEGIN ================================

  openSustanciaMicroTraficoSelectDialog() {

    this.selectedSustanciaMicroTraficoList = this.selectedItem.sustanciaMicroTraficoList;

    this.sustanciaMicroTraficoFiltered = this.sustanciaMicroTraficoSelectFilterKeyCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.smtCodigo || value === '') {
            return of([]);
          }
          return this.apiService.sustanciaMicroTrafico.autoComplete({
            key: value.toLowerCase()
          });
        })
      );

    this.sustanciaMicroTraficoSelectFilterKeyCtrl.setValue('');

    this.sustanciaMicroTraficoSelectDialogRef = this.dialog.open(this.sustanciaMicroTraficoSelectDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });
  }


  onSustanciaMicroTraficoSelectDialogOk() {

    this.selectedItem.sustanciaMicroTraficoList = this.selectedSustanciaMicroTraficoList;

    this.sustanciaMicroTraficoSelectDialogRef.close();
  }

  onSustanciaMicroTraficoSelectDialogCancel() {
    this.sustanciaMicroTraficoSelectDialogRef.close();

  }

  onSustanciaMicroTraficoSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    let found = false;
    const selectedValue = event.option.value;

    for (const item of this.selectedSustanciaMicroTraficoList) {
      if (item.codigo === selectedValue.codigo) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.selectedSustanciaMicroTraficoList.push(selectedValue);
    }
  }

  sustanciaMicroTraficoAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.smtDescripcion}`;
    }
  }

  // ================================  SustanciaMicroTrafico Select END ================================


}


class MicroTraficoDrogaDataSource implements DataSource<any> {

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

    this.apiService.microTraficoDroga
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

