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

@Component({
  selector: 'app-lesion-agresor-page',
  templateUrl: './lesion-agresor-page.component.html',
  styleUrls: ['./lesion-agresor-page.component.scss']
})
export class LesionAgresorPageComponent implements OnInit, AfterViewInit {

  pageData: any = {
    lesionesList: [],
    relacionAgresorList: [],
    indicioEstupefacientesList: [],
    gradoAlcoholAgresorList: [],
    objetoAgresionList: [],
    tipoAgresionList: [],
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
    'codigoAgresor',
    'codigoRelacionAgresor',
    'codigoIndicioEstupefaciente',
    'codigoGradoAlcoholAgresor',
    'codigoObjetoAgresion',
    'codigoTipoAgresion',

    'Actions',
  ];

  dataSource: LesionAgresorDataSource;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizes = [10, 20, 50];


  // === Agresor Select BEGIN ===
  selectedAgresor: any = undefined;

  agresorSelectFilterKeyCtrl = new FormControl();
  agresorFiltered: Observable<any[]>;

  @ViewChild('agresorSelectDialog') agresorSelectDialogTemplateRef;
  agresorSelectDialogRef: any;

  // === Agresor Select END ===


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
    this.dataSource = new LesionAgresorDataSource(this.apiService, this.spinner);

    this.initForms();
  }

  ngAfterViewInit() {

    this.loadData();

    this.initPaginator();
    this.initFilter();
  }

  initForms() {

    const controlsConfig = {
      codigo: [null, Validators.compose([Validators.required])],
      codigoAgresor: [null, Validators.compose([Validators.required])],
      codigoRelacionAgresor: [null, Validators.compose([Validators.required])],
      codigoIndicioEstupefaciente: [null, Validators.compose([Validators.required])],
      codigoGradoAlcoholAgresor: [null, Validators.compose([Validators.required])],
      codigoObjetoAgresion: [null, Validators.compose([Validators.required])],
      codigoTipoAgresion: [null, Validators.compose([Validators.required])],
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
    this.selectedItem.id = {};

    this.loadRelatedData(() => {

      this.createForm.reset();
      this.createForm.markAsUntouched();

      this.state = PAGE_STATE.CREATING;
    });

  }

  create() {


    const params = this.createForm.value;


    params.id = {
      codigo: params.codigo,
      codigoAgresor: this.selectedAgresor.codigo
    };


    this.pageData.lesionesList.forEach((value) => {
      if (params.codigo === value.leCodigoUnico) {
        params.lesiones = value;
      }
    });

    params.agresor = this.selectedAgresor;


    this.spinner.show();
    this.apiService.lesionAgresor.create(params).subscribe(() => {
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


        codigo: this.selectedItem.id.codigo,
        codigoAgresor:
          `${this.selectedItem.agresor.codigo} (${this.selectedItem.agresor.apellidos} ${this.selectedItem.agresor.nombres})`,
        codigoRelacionAgresor: this.selectedItem.codigoRelacionAgresor,
        codigoIndicioEstupefaciente: this.selectedItem.codigoIndicioEstupefaciente,
        codigoGradoAlcoholAgresor: this.selectedItem.codigoGradoAlcoholAgresor,
        codigoObjetoAgresion: this.selectedItem.codigoObjetoAgresion,
        codigoTipoAgresion: this.selectedItem.codigoTipoAgresion,

      });

      this.editForm.markAsUntouched();

      this.state = PAGE_STATE.EDITING;
    });


  }

  save() {

    const params = this.editForm.value;


    params.id = {
      codigo: params.codigo,
      codigoAgresor: this.selectedAgresor.codigo
    };
    this.pageData.lesionesList.forEach((value) => {
      if (params.codigo === value.leCodigoUnico) {
        params.lesiones = value;
      }
    });

    params.agresor = this.selectedAgresor;


    this.spinner.show();
    this.apiService.lesionAgresor.update(params).subscribe(() => {
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

    this.apiService.lesionAgresor.delete(this.selectedItem).subscribe(
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

    this.apiService.pageData.lesionAgresor().subscribe(
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
    this.selectedItem.id.codigoAgresor = this.selectedItem.agresor.codigo;

    const value2Patch = {
      codigoAgresor:
        `${this.selectedItem.agresor.codigo} (${this.selectedItem.agresor.apellidos} ${this.selectedItem.agresor.nombres})`,
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
}


class LesionAgresorDataSource implements DataSource<any> {

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

    this.apiService.lesionAgresor
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
