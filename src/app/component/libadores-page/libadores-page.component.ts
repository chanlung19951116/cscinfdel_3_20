import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PAGE_STATE} from '../../define/enums';
import {ApiService} from '../../service/api.service';
import {CommonService} from '../../service/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {MatAutocompleteSelectedEvent, MatDialog, MatPaginator} from '@angular/material';
import {BehaviorSubject, fromEvent, Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';
import {LibadorCreateDialogComponent} from '../libador-create-dialog/libador-create-dialog.component';


@Component({
  selector: 'app-libadores-page',
  templateUrl: './libadores-page.component.html',
  styleUrls: ['./libadores-page.component.scss']
})
export class LibadoresPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    tipoProcedimientoList: [],
    tipoResolucionList: [],
    parroquiaList: []
  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;

  selectedItem: any = undefined;
  selectedLibador: any = undefined;

  public tipoProcedimientoFilteredArray4Create: any[] = [];
  public lbCodigoTipoProcedimientoCreateFilterCtrl = new FormControl();

  public tipoProcedimientoFilteredArray4Edit: any[] = [];
  public lbCodigoTipoProcedimientoEditFilterCtrl = new FormControl();

  public tipoResolucionFilteredArray4Create: any[] = [];
  public lbCodigoTipoResolucionCreateFilterCtrl = new FormControl();

  public tipoResolucionFilteredArray4Edit: any[] = [];
  public lbCodigoTipoResolucionEditFilterCtrl = new FormControl();

  libadorSelectFilterKeyCtrl = new FormControl();
  libadorFiltered: Observable<any[]>;

  @ViewChild('libadorSelectDialog') libadorSelectDialogTemplateRef;
  libadorSelectDialogRef: any;

  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;


  displayedColumns: string[] = [
    'lbCodigoUnico',
    'lbCodigoLibador',
    'lbExpediente',
    'lbDireccionInfraccion',
    'lbFechaInfraccion',
    'lbHoraInfraccion',
    'lbMinutoInfraccion',
    'lbNumeroCitacion',
    'lbParteInformativo',
    'lbTipoBebida',
    'lbCodigoTipoProcedimiento',
    'lbFechaIngreso',
    'lbCodigoParroquia',
    'lbCodigoTipoResolucion',
    'lbGeoReferenciacion',
    'lbCodigoGeo',
    'lbImpugna',
    'lbEstado',
    'Actions',
  ];
  dataSource: LibadoresDataSource;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10, 20, 50];

  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public common: CommonService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService,
    public dialog: MatDialog,
    public dialog1: MatDialog
  ) {
  }

  ngOnInit() {
    this.dataSource = new LibadoresDataSource(this.apiService, this.spinner);

    this.initForms();

    this.initLbCodigoTipoProcedimientoCreateFilter();
    this.initLbCodigoTipoProcedimientoEditFilter();

    this.initlbCodigoTipoResolucionCreateFilter();
    this.initlbCodigoTipoResolucionEditFilter();

  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  libadorAutoCompleteDisplayWith(item) {
    if (item) {
      return `${item.lbApellidos} ${item.lbNombres}`;
    }
  }

  private initlbCodigoTipoResolucionEditFilter() {

    this.lbCodigoTipoResolucionEditFilterCtrl.valueChanges
      .subscribe(() => {

        // get the search keyword
        const needle = this.lbCodigoTipoResolucionEditFilterCtrl.value;

        if (needle === '') {
          this.tipoResolucionFilteredArray4Edit = this.pageData.tipoResolucionList;
          return;
        }

        this.tipoResolucionFilteredArray4Edit = this.pageData.tipoResolucionList.filter(
          item => (
            item.descripcion.toLowerCase().indexOf(needle) > -1));

      });
  }

  private initlbCodigoTipoResolucionCreateFilter() {

    this.lbCodigoTipoResolucionCreateFilterCtrl.valueChanges
      .subscribe(() => {

        // get the search keyword
        const needle = this.lbCodigoTipoResolucionCreateFilterCtrl.value;

        if (needle === '') {
          this.tipoResolucionFilteredArray4Create = this.pageData.tipoResolucionList;
          return;
        }

        this.tipoResolucionFilteredArray4Create = this.pageData.tipoResolucionList.filter(
          item => (
            item.descripcion.toLowerCase().indexOf(needle) > -1));

      });

  }

  private initLbCodigoTipoProcedimientoEditFilter() {

    this.lbCodigoTipoProcedimientoEditFilterCtrl.valueChanges
      .subscribe(() => {

        // get the search keyword
        const needle = this.lbCodigoTipoProcedimientoEditFilterCtrl.value;

        if (needle === '') {
          this.tipoProcedimientoFilteredArray4Edit = this.pageData.tipoProcedimientoList;
          return;
        }

        this.tipoProcedimientoFilteredArray4Edit = this.pageData.tipoProcedimientoList.filter(
          item => (
            item.descripcion.toLowerCase().indexOf(needle) > -1));

      });

  }

  private initLbCodigoTipoProcedimientoCreateFilter() {

    this.lbCodigoTipoProcedimientoCreateFilterCtrl.valueChanges
      .subscribe(() => {

        // get the search keyword
        const needle = this.lbCodigoTipoProcedimientoCreateFilterCtrl.value;

        if (needle === '') {
          this.tipoProcedimientoFilteredArray4Create = this.pageData.tipoProcedimientoList;
          return;
        }

        this.tipoProcedimientoFilteredArray4Create = this.pageData.tipoProcedimientoList.filter(
          item => (
            item.descripcion.toLowerCase().indexOf(needle) > -1));

      });
  }

  openLibadorSelectDialog() {

    this.selectedLibador = this.selectedItem.libador;

    this.libadorFiltered = this.libadorSelectFilterKeyCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value.lbCodigoLibador || value === '') {
            return of([]);
          }
          return this.apiService.libador.autoComplete({
            key: value.toLowerCase()
          });
        })
      );

    this.libadorSelectFilterKeyCtrl.setValue('');

    this.libadorSelectDialogRef = this.dialog.open(this.libadorSelectDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });
  }

  onLibadorSelectDialogOk() {
    if (!this.selectedLibador) {
      this.toastr.warning('Seleccionar libador.');
      return;
    }
    this.selectedItem.libador = this.selectedLibador;
    this.selectedItem.lbCodigoLibador = this.selectedItem.libador.lbCodigoLibador;

    const value2Patch = {
      lbCodigoLibador:
        `${this.selectedItem.lbCodigoLibador} (${this.selectedItem.libador.lbApellidos} ${this.selectedItem.libador.lbNombres})`
    };

    this.createForm.patchValue(value2Patch);
    this.editForm.patchValue(value2Patch);

    this.libadorSelectDialogRef.close();
  }

  onLibadorSelectDialogCancel() {
    this.libadorSelectDialogRef.close();

  }

  onLibadorSelectDialogCreate() {

    const dialogRef = this.dialog.open(LibadorCreateDialogComponent, {
      width: '600px',
      data: {
        name: 'name',
        animal: 'animal'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if (result) {
        this.selectedLibador = result;
        this.onLibadorSelectDialogOk();
      }
    });

  }

  onLibadorSelectOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedLibador = event.option.value;
  }

  initForms() {

    const controlsConfig = {
      lbCodigoLibador: [null, Validators.compose([Validators.required])],
      lbExpediente: [null, Validators.compose([Validators.required])],
      lbDireccionInfraccion: [null, Validators.compose([Validators.required])],
      lbFechaInfraccion: [null, Validators.compose([Validators.required])],
      lbHoraInfraccion: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(23)])],
      lbMinutoInfraccion: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(59)])],
      lbNumeroCitacion: [null, Validators.compose([Validators.required])],
      lbParteInformativo: [null, Validators.compose([Validators.required])],
      lbTipoBebida: [null, Validators.compose([Validators.required])],
      lbCodigoTipoProcedimiento: [null, Validators.compose([Validators.required])],
      lbFechaIngreso: [null, Validators.compose([Validators.required])],
      lbCodigoParroquia: [null, Validators.compose([Validators.required])],
      lbCodigoTipoResolucion: [null, Validators.compose([Validators.required])],
      lbGeoReferenciacion: [null, Validators.compose([Validators.required])],
      lbCodigoGeo: [null, Validators.compose([Validators.required])],
      lbImpugna: [null, Validators.compose([Validators.required])],
      lbEstado: [null, Validators.compose([Validators.required])],
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

      this.createForm.patchValue({
        lbFechaIngreso: new Date(),
        lbCodigoGeo: 0,
      });


      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });


  }

  create() {


    const params = this.createForm.value;
    params.lbFechaInfraccion = moment(params.lbFechaInfraccion).format('YYYY-MM-DD');
    params.lbFechaIngreso = moment(params.lbFechaIngreso).format('YYYY-MM-DD');
    var firstdata = params.lbFechaInfraccion;
    var seconddata = params.lbFechaIngreso;
    var fl = this.compare(firstdata,seconddata);
    if (fl == 0) {
      params.lbCodigoLibador = this.selectedItem.libador.lbCodigoLibador;

      this.spinner.show();
      this.apiService.libadores.create(params).subscribe(() => {
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
    else{
        this.toastr.error('La fecha de infraction no puede ser mayor a la fecha de ingreso');
    }

  }

  startEditing(row) {

    this.loadRelatedData(() => {
      this.selectedItem = row;

      this.editForm.patchValue({
        lbCodigoLibador:
          `${this.selectedItem.lbCodigoLibador} (${this.selectedItem.libador.lbApellidos} ${this.selectedItem.libador.lbNombres})`,
        lbExpediente: this.selectedItem.lbExpediente,
        lbDireccionInfraccion: this.selectedItem.lbDireccionInfraccion,
        lbFechaInfraccion: new Date(this.selectedItem.lbFechaInfraccion),
        lbHoraInfraccion: this.selectedItem.lbHoraInfraccion,
        lbMinutoInfraccion: this.selectedItem.lbMinutoInfraccion,
        lbNumeroCitacion: this.selectedItem.lbNumeroCitacion,
        lbParteInformativo: this.selectedItem.lbParteInformativo,
        lbTipoBebida: this.selectedItem.lbTipoBebida,
        lbCodigoTipoProcedimiento: this.selectedItem.lbCodigoTipoProcedimiento,
        lbFechaIngreso: new Date(this.selectedItem.lbFechaIngreso),
        lbCodigoParroquia: this.selectedItem.lbCodigoParroquia,
        lbCodigoTipoResolucion: this.selectedItem.lbCodigoTipoResolucion,
        lbGeoReferenciacion: this.selectedItem.lbGeoReferenciacion,
        lbCodigoGeo: this.selectedItem.lbCodigoGeo,
        lbImpugna: this.selectedItem.lbImpugna,
        lbEstado: this.selectedItem.lbEstado,
      });
      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.lbCodigoUnico = this.selectedItem.lbCodigoUnico;
    params.lbFechaInfraccion = moment(params.lbFechaInfraccion).format('YYYY-MM-DD');
    params.lbFechaIngreso = moment(params.lbFechaIngreso).format('YYYY-MM-DD');
    params.lbCodigoLibador = this.selectedItem.libador.lbCodigoLibador;

    this.spinner.show();
    this.apiService.libadores.update(params).subscribe(() => {
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

    this.apiService.libadores.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.libadores().subscribe(
      (response: any) => {
        this.spinner.hide();

        this.pageData = response;


        this.tipoProcedimientoFilteredArray4Create = this.pageData.tipoProcedimientoList;
        this.tipoProcedimientoFilteredArray4Edit = this.pageData.tipoProcedimientoList;

        this.tipoResolucionFilteredArray4Create = this.pageData.tipoResolucionList;
        this.tipoResolucionFilteredArray4Edit = this.pageData.tipoResolucionList;

        finishedCallback();

      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });
  }
  public  compare(firstdate,seconddate)
  {
    var firstdata = firstdate.split("-",3);
    var firstyear = +firstdata[0];
    var firstmonth = +firstdata[1];
    var firstday = +firstdata[2];
    var firstcount = firstyear + firstmonth + firstday;
    var seconddata = seconddate.split("-",3);
    var secondyear = +seconddata[0];
    var secondmonth = +seconddata[1];
    var secondday = +seconddata[2];
    var secondcount = secondyear + secondmonth + secondday;

    if (firstcount > secondcount)  {
      return 1;
    } else {
      return 0;
    }
  }


}


class LibadoresDataSource implements DataSource<any> {

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

    this.apiService.libadores
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

