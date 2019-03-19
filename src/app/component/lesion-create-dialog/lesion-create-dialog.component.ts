// **********************2019-03-20 created****************************

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {PAGE_STATE} from '../../define/enums';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../service/api.service';
import {CommonService} from '../../service/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, fromEvent, Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';
import {catchError, finalize} from 'rxjs/operators';

@Component({
  selector: 'app-lesion-create-dialog',
  templateUrl: './lesion-create-dialog.component.html',
  styleUrls: ['./lesion-create-dialog.component.scss']
})
export class LesionCreateDialogComponent implements OnInit {

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


  public createForm: FormGroup;

  selectedItem: any = {};
  dataSource: AgresorDataSource;

  constructor(
    private fb: FormBuilder,
    public apiService: ApiService,
    private common: CommonService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LesionCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    console.log(data);

  }

  ngOnInit() {
    this.dataSource = new AgresorDataSource(this.apiService, this.spinner);
    this.loadRelatedData(() => {});
    this.createForm = this.fb.group({
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
    });
  }

  startCreating() {
      this.createForm.reset();
      this.createForm.markAsUntouched();
  }

  create() {

    const params = this.createForm.value;

    params.nombreCompleto = `${params.apellidos} ${params.nombres}`;

    this.spinner.show();
    this.apiService.agresor.create(params).subscribe(() => {
        this.spinner.hide();
        this.toastr.success('Creado existosamente');
        this.dialogRef.close();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });
  }

  onCancel() {
    this.dialogRef.close();
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



