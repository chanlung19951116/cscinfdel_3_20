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
  selector: 'app-victima-page',
  templateUrl: './victima-page.component.html',
  styleUrls: ['./victima-page.component.scss']
})
export class VictimaPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    sexoList: [],
    nacionalidadList: [],
    etniaList: [],
    estadoCivilList: [],
    tipoDiscapacidadList: [],
    ocupacionList: [],
    tipoEmpresaList: [],
  };


  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;


  createForm: FormGroup;
  editForm: FormGroup;

  selectedItem: any = undefined;

  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  displayedColumns: string[] = [
    'victimaCodigo',
    'victimaIdentificacion',
    'victimaNombres',
    'victimaApellidos',
    'victimaDireccion',
    'victimaTelefono',
    'victimaCodigoSexo',
    'victimaCodigoNacionalidad',
    'victimaCodigoEtnia',
    'victimaCodigoEstadoCivil',
    'victimaCodigoTipoDiscapacidad',
    'victimaCodigoOcupacion',
    'victimaEdad',
    'victimaAdolecente',
    'victimaCodigoTipoEmpresa',
    'Actions',
  ];

  dataSource: VictimaDataSource;
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
    this.dataSource = new VictimaDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    this.createForm = this.fb.group({
      victimaIdentificacion: [null, Validators.compose([Validators.required])],
      victimaNombres: [null, Validators.compose([Validators.required])],
      victimaApellidos: [null, Validators.compose([Validators.required])],
      victimaDireccion: [null, Validators.compose([Validators.required])],
      victimaTelefono: [null, Validators.compose([Validators.required])],
      victimaCodigoSexo: [null, Validators.compose([Validators.required])],
      victimaCodigoNacionalidad: [null, Validators.compose([Validators.required])],
      victimaCodigoEtnia: [null, Validators.compose([Validators.required])],
      victimaCodigoEstadoCivil: [null, Validators.compose([Validators.required])],
      victimaCodigoTipoDiscapacidad: [null, Validators.compose([Validators.required])],
      victimaCodigoOcupacion: [null, Validators.compose([Validators.required])],
      victimaEdad: [null, Validators.compose([Validators.required])],
      victimaAdolecente: [null, Validators.compose([Validators.required])],
      victimaCodigoTipoEmpresa: [null, Validators.compose([Validators.required])],
    });

    this.editForm = this.fb.group({
      victimaIdentificacion: [null, Validators.compose([Validators.required])],
      victimaNombres: [null, Validators.compose([Validators.required])],
      victimaApellidos: [null, Validators.compose([Validators.required])],
      victimaDireccion: [null, Validators.compose([Validators.required])],
      victimaTelefono: [null, Validators.compose([Validators.required])],
      victimaCodigoSexo: [null, Validators.compose([Validators.required])],
      victimaCodigoNacionalidad: [null, Validators.compose([Validators.required])],
      victimaCodigoEtnia: [null, Validators.compose([Validators.required])],
      victimaCodigoEstadoCivil: [null, Validators.compose([Validators.required])],
      victimaCodigoTipoDiscapacidad: [null, Validators.compose([Validators.required])],
      victimaCodigoOcupacion: [null, Validators.compose([Validators.required])],
      victimaEdad: [null, Validators.compose([Validators.required])],
      victimaAdolecente: [null, Validators.compose([Validators.required])],
      victimaCodigoTipoEmpresa: [null, Validators.compose([Validators.required])],
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

    this.loadRelatedData(() => {

      this.createForm.reset();
      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });

  }

  create() {


    const params = this.createForm.value;

    params.victimaNombreCompleto = `${params.victimaNombres} ${params.victimaApellidos}`;

    this.spinner.show();
    this.apiService.victima.create(params).subscribe(() => {
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
        victimaIdentificacion: this.selectedItem.victimaIdentificacion,
        victimaNombres: this.selectedItem.victimaNombres,
        victimaApellidos: this.selectedItem.victimaApellidos,
        victimaDireccion: this.selectedItem.victimaDireccion,
        victimaTelefono: this.selectedItem.victimaTelefono,
        victimaCodigoSexo: this.selectedItem.victimaCodigoSexo,
        victimaCodigoNacionalidad: this.selectedItem.victimaCodigoNacionalidad,
        victimaCodigoEtnia: this.selectedItem.victimaCodigoEtnia,
        victimaCodigoEstadoCivil: this.selectedItem.victimaCodigoEstadoCivil,
        victimaCodigoTipoDiscapacidad: this.selectedItem.victimaCodigoTipoDiscapacidad,
        victimaCodigoOcupacion: this.selectedItem.victimaCodigoOcupacion,
        victimaEdad: this.selectedItem.victimaEdad,
        victimaAdolecente: this.selectedItem.victimaAdolecente,
        victimaCodigoTipoEmpresa: this.selectedItem.victimaCodigoTipoEmpresa,
      });
      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;

    params.victimaCodigo = this.selectedItem.victimaCodigo;
    params.victimaNombreCompleto = `${params.victimaNombres} ${params.victimaApellidos}`;

    this.spinner.show();
    this.apiService.victima.update(params).subscribe(() => {
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

    this.apiService.victima.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.victima().subscribe(
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


class VictimaDataSource implements DataSource<any> {

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

    this.apiService.victima
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

