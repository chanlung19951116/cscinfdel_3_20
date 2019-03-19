import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PAGE_STATE} from '../../define/enums';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatPaginator} from '@angular/material';
import {ApiService} from '../../service/api.service';
import {CommonService} from '../../service/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {catchError, debounceTime, distinctUntilChanged, finalize, tap} from 'rxjs/operators';
import {BehaviorSubject, fromEvent, Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';

@Component({
  selector: 'app-agresor-page',
  templateUrl: './agresor-page.component.html',
  styleUrls: ['./agresor-page.component.scss']
})
export class AgresorPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    sexoList: [],
    nacionalidadList: [],
    etniaList: [],
    estadoCivilList: [],
    tipoDiscapacidadList: [],
    ocupacionList: [],
    regionList: [],
    relacionAgresorList: [],
  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;

  selectedItem: any = undefined;

  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'codigo',
    'identificacion',
    'nombres',
    'apellidos',
    'direccion',
    'telefono',
    'codigoSexo',
    'codigoNacionalidad',
    'codigoEtnia',
    'codigoEstadoCivil',
    'codigoTipoDiscapacidad',
    'codigoOcupacion',
    'edad',
    'adolecente',
    'codigoRegion',
    'codigoRelacionAgresor',
    'Actions',
  ];

  dataSource: AgresorDataSource;
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
    this.dataSource = new AgresorDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      identificacion: [null, Validators.compose([Validators.required])],
      nombres: [null, Validators.compose([Validators.required])],
      apellidos: [null, Validators.compose([Validators.required])],
      direccion: [null, Validators.compose([Validators.required])],
      telefono: [null, Validators.compose([Validators.required])],
      codigoSexo: [null, Validators.compose([Validators.required])],
      codigoNacionalidad: [null, Validators.compose([Validators.required])],
      codigoEtnia: [null, Validators.compose([Validators.required])],
      codigoEstadoCivil: [null, Validators.compose([Validators.required])],
      codigoTipoDiscapacidad: [null, Validators.compose([Validators.required])],
      codigoOcupacion: [null, Validators.compose([Validators.required])],
      edad: [null, Validators.compose([Validators.required])],
      adolecente: [null, Validators.compose([Validators.required])],
      codigoRegion: [null, Validators.compose([Validators.required])],
      codigoRelacionAgresor: [null, Validators.compose([Validators.required])],
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
    params.nombreCompleto = `${params.apellidos} ${params.nombres}`;

    this.spinner.show();
    this.apiService.agresor.create(params).subscribe(() => {
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
        identificacion: this.selectedItem.identificacion,
        nombres: this.selectedItem.nombres,
        apellidos: this.selectedItem.apellidos,
        direccion: this.selectedItem.direccion,
        telefono: this.selectedItem.telefono,
        codigoSexo: this.selectedItem.codigoSexo,
        codigoNacionalidad: this.selectedItem.codigoNacionalidad,
        codigoEtnia: this.selectedItem.codigoEtnia,
        codigoEstadoCivil: this.selectedItem.codigoEstadoCivil,
        codigoTipoDiscapacidad: this.selectedItem.codigoTipoDiscapacidad,
        codigoOcupacion: this.selectedItem.codigoOcupacion,
        edad: this.selectedItem.edad,
        adolecente: this.selectedItem.adolecente,
        codigoRegion: this.selectedItem.codigoRegion,
        codigoRelacionAgresor: this.selectedItem.codigoRelacionAgresor,
      });
      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.codigo = this.selectedItem.codigo;
    params.nombreCompleto = `${params.apellidos} ${params.nombres}`;

    this.spinner.show();
    this.apiService.agresor.update(params).subscribe(() => {
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

    this.apiService.agresor.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.agresor().subscribe(
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

}


class AgresorDataSource implements DataSource<any> {

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

    this.apiService.agresor
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

