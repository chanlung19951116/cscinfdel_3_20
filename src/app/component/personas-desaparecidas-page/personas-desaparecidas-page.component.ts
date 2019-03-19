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
  selector: 'app-personas-desaparecidas-page',
  templateUrl: './personas-desaparecidas-page.component.html',
  styleUrls: ['./personas-desaparecidas-page.component.scss']
})
export class PersonasDesaparecidasPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    parroquiaDesaparicionList: [],
    fiscaliaList: [],
    fiscalList: [],
    diaList: [],
    mesList: [],
    datosGeoReferenciacionList: [],
    tipoPuntoList: [],
    pdCondicionRegresaDesaparecidoList: [],
  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;

  selectedItem: any = undefined;



  // === Agresor Select BEGIN ===
  selectedAgresor: any = undefined;

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
    'pdCodigoUnico',
    'pdCodigoParroquia',
    'pdNumeroSecuencial',
    'pdNumeroActoAdministrativo',
    'pdRespnsableScanner',
    'pdCodigoFiscalia',
    'pdCodigoFiscal',
    'pdNumeroDenuncia',
    'pdFechaDenuncia',
    'pdFechaDesaparicion',
    'pdParroquiaDesaparicion',
    'pdCodigoDia',
    'pdCodigoMes',
    'pdCodigoAnio',
    'pdHora',
    'pdMinutos',
    'pdNumerosDesaparecidos',
    'pdPersonaDenuncia',
    'pdCodigoLugarLocalizado',
    'pdFechaLocalizado',
    'pdCodigoMotivoDesaparicion',
    'pdCondicionEncontrado',
    'pdFechaIngreso',
    'pdObervacion',
    'pdGeoreferencia',
    'pdCodigoGeo',
    'pdPorcentajeDiscapacidad',
    'pdLocalizado',
    'pdEstado',
    'pdCodigoAgresor',
    'pdCodigoTipoPunto',
    'pdCondicionRegresa',

    'Actions',
  ];

  dataSource: PersonasDesaparecidasDataSource;
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
    this.dataSource = new PersonasDesaparecidasDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      pdCodigoParroquia: [null, Validators.compose([Validators.required])],
      pdNumeroSecuencial: [null, Validators.compose([Validators.required])],
      pdNumeroActoAdministrativo: [null, Validators.compose([Validators.required])],
      pdRespnsableScanner: [null, Validators.compose([Validators.required])],
      pdCodigoFiscalia: [null, Validators.compose([Validators.required])],
      pdCodigoFiscal: [null, Validators.compose([Validators.required])],
      pdNumeroDenuncia: [null, Validators.compose([Validators.required])],
      pdFechaDenuncia: [null, Validators.compose([Validators.required])],
      pdFechaDesaparicion: [null, Validators.compose([Validators.required])],
      pdParroquiaDesaparicion: [null, Validators.compose([Validators.required])],
      pdCodigoDia: [null, Validators.compose([Validators.required])],
      pdCodigoMes: [null, Validators.compose([Validators.required])],
      pdCodigoAnio: [null, Validators.compose([Validators.required])],
      pdHora: [null, Validators.compose([Validators.required])],
      pdMinutos: [null, Validators.compose([Validators.required])],
      pdNumerosDesaparecidos: [null, Validators.compose([Validators.required])],
      pdPersonaDenuncia: [null, Validators.compose([Validators.required])],
      pdCodigoLugarLocalizado: [null, Validators.compose([Validators.required])],
      pdFechaLocalizado: [null, Validators.compose([Validators.required])],
      pdCodigoMotivoDesaparicion: [null, Validators.compose([Validators.required])],
      pdCondicionEncontrado: [null, Validators.compose([Validators.required])],
      pdFechaIngreso: [null, Validators.compose([Validators.required])],
      pdObervacion: [null, Validators.compose([Validators.required])],
      pdGeoreferencia: [null, Validators.compose([Validators.required])],
      pdCodigoGeo: [null, Validators.compose([Validators.required])],
      pdPorcentajeDiscapacidad: [null, Validators.compose([Validators.required])],
      pdLocalizado: [null, Validators.compose([Validators.required])],
      pdEstado: [null, Validators.compose([Validators.required])],
      pdCodigoAgresor: [null, Validators.compose([Validators.required])],
      pdCodigoTipoPunto: [null, Validators.compose([Validators.required])],
      pdCondicionRegresa: [null, Validators.compose([Validators.required])],
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

    params.pdFechaDenuncia = moment(params.pdFechaDenuncia).format('YYYY-MM-DD');
    params.pdFechaDesaparicion = moment(params.pdFechaDesaparicion).format('YYYY-MM-DD');
    params.pdFechaLocalizado = moment(params.pdFechaLocalizado).format('YYYY-MM-DD');
    params.pdFechaIngreso = moment(params.pdFechaIngreso).format('YYYY-MM-DD');


    params.pdCodigoAgresor = this.selectedItem.agresor.codigo;

    params.victimaList = this.selectedVictimaList.map((item) => {
      return {
        victimaCodigo: item.victimaCodigo
      };
    });

    this.spinner.show();
    this.apiService.personasDesaparecidas.create(params).subscribe(() => {
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

      this.selectedVictimaList = this.selectedItem.victimaList;

      this.editForm.patchValue({
        pdCodigoParroquia: this.selectedItem.pdCodigoParroquia,
        pdNumeroSecuencial: this.selectedItem.pdNumeroSecuencial,
        pdNumeroActoAdministrativo: this.selectedItem.pdNumeroActoAdministrativo,
        pdRespnsableScanner: this.selectedItem.pdRespnsableScanner,
        pdCodigoFiscalia: this.selectedItem.pdCodigoFiscalia,
        pdCodigoFiscal: this.selectedItem.pdCodigoFiscal,
        pdNumeroDenuncia: this.selectedItem.pdNumeroDenuncia,
        pdFechaDenuncia: new Date(this.selectedItem.pdFechaDenuncia),
        pdFechaDesaparicion: new Date(this.selectedItem.pdFechaDesaparicion),
        pdParroquiaDesaparicion: this.selectedItem.pdParroquiaDesaparicion,
        pdCodigoDia: this.selectedItem.pdCodigoDia,
        pdCodigoMes: this.selectedItem.pdCodigoMes,
        pdCodigoAnio: this.selectedItem.pdCodigoAnio,
        pdHora: this.selectedItem.pdHora,
        pdMinutos: this.selectedItem.pdMinutos,
        pdNumerosDesaparecidos: this.selectedItem.pdNumerosDesaparecidos,
        pdPersonaDenuncia: this.selectedItem.pdPersonaDenuncia,
        pdCodigoLugarLocalizado: this.selectedItem.pdCodigoLugarLocalizado,
        pdFechaLocalizado: new Date(this.selectedItem.pdFechaLocalizado),
        pdCodigoMotivoDesaparicion: this.selectedItem.pdCodigoMotivoDesaparicion,
        pdCondicionEncontrado: this.selectedItem.pdCondicionEncontrado,
        pdFechaIngreso: new Date(this.selectedItem.pdFechaIngreso),
        pdObervacion: this.selectedItem.pdObervacion,
        pdGeoreferencia: this.selectedItem.pdGeoreferencia,
        pdCodigoGeo: this.selectedItem.pdCodigoGeo,
        pdPorcentajeDiscapacidad: this.selectedItem.pdPorcentajeDiscapacidad,
        pdLocalizado: this.selectedItem.pdLocalizado,
        pdEstado: this.selectedItem.pdEstado,
        pdCodigoAgresor:
          `${this.selectedItem.agresor.codigo} (${this.selectedItem.agresor.apellidos} ${this.selectedItem.agresor.nombres})`,
        pdCodigoTipoPunto: this.selectedItem.pdCodigoTipoPunto,
        pdCondicionRegresa: this.selectedItem.pdCondicionRegresa,


      });

      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.pdCodigoUnico = this.selectedItem.pdCodigoUnico;

    params.pdFechaDenuncia = moment(params.pdFechaDenuncia).format('YYYY-MM-DD');
    params.pdFechaDesaparicion = moment(params.pdFechaDesaparicion).format('YYYY-MM-DD');
    params.pdFechaLocalizado = moment(params.pdFechaLocalizado).format('YYYY-MM-DD');
    params.pdFechaIngreso = moment(params.pdFechaIngreso).format('YYYY-MM-DD');


    params.pdCodigoAgresor = this.selectedItem.agresor.codigo;


    params.victimaList = this.selectedVictimaList.map((item) => {
      return {
        victimaCodigo: item.victimaCodigo
      };
    });

    this.spinner.show();
    this.apiService.personasDesaparecidas.update(params).subscribe(() => {
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

    this.apiService.personasDesaparecidas.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.personasDesaparecidas().subscribe(
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
      pdCodigoAgresor:
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


class PersonasDesaparecidasDataSource implements DataSource<any> {

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

    this.apiService.personasDesaparecidas
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

