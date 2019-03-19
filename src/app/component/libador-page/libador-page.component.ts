import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PAGE_STATE} from '../../define/enums';
import {ApiService} from '../../service/api.service';
import {CommonService} from '../../service/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {fromEvent, ReplaySubject, Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-libador-page',
  templateUrl: './libador-page.component.html',
  styleUrls: ['./libador-page.component.scss']
})
export class LibadorPageComponent implements OnInit {


  tableData: any[] = [];
  dataArray: any[] = [];

  state: PAGE_STATE = PAGE_STATE.SHOWING;
  PAGE_STATE: typeof PAGE_STATE = PAGE_STATE;

  public createForm: FormGroup;
  public editForm: FormGroup;

  @ViewChild('filter') filter: ElementRef;

  selectedItem: any = {};

  @ViewChild('deleteConfirmDialog') deleteConfirmDialogTemplateRef;
  deleteConfirmDialogRef: any;

  constructor(
    private fb: FormBuilder,
    public apiService: ApiService,
    private common: CommonService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
  }


  ngOnInit() {

    this.createForm = this.fb.group({
      lbNombres: [null, Validators.compose([Validators.required])],
      lbApellidos: [null, Validators.compose([Validators.required])],
      lbTelefonos: [null, Validators.compose([Validators.required])],
      lbDireccion: [null, Validators.compose([Validators.required])],
      lbEdad: [null, Validators.compose([Validators.required])],
      lbContacto: [null, Validators.compose([Validators.required])],
      lbEstado: [null, Validators.compose([Validators.required])],
      lbSexo: [null, Validators.compose([Validators.required])],
    });

    this.editForm = this.fb.group({
      lbNombres: [null, Validators.compose([Validators.required])],
      lbApellidos: [null, Validators.compose([Validators.required])],
      lbTelefonos: [null, Validators.compose([Validators.required])],
      lbDireccion: [null, Validators.compose([Validators.required])],
      lbEdad: [null, Validators.compose([Validators.required])],
      lbContacto: [null, Validators.compose([Validators.required])],
      lbEstado: [null, Validators.compose([Validators.required])],
      lbSexo: [null, Validators.compose([Validators.required])],
    });

    this.loadData();
    this.initFilter();

  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        const needle = this.filter.nativeElement.value.toLowerCase();

        this.tableData = this.dataArray.filter((row) => {
          for (const key in row) {
            if (String(row[key]).toLowerCase().indexOf(needle) !== -1) {
              return true;
            }
          }
          return false;
        });

      });
  }

  startCreating() {

    this.createForm.reset();
    this.createForm.markAsUntouched();

    this.state = PAGE_STATE.CREATING;
  }

  create() {

    const params = this.createForm.value;

    params.lbNombreCompleto = `${params.lbApellidos} ${params.lbNombres}`;

    this.spinner.show();

    this.apiService.libador.create(params).subscribe(() => {
        this.spinner.hide();
        this.toastr.success('Creado existosamente');
        this.loadData();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });
  }

  startEditing(i, row) {

    this.editForm.patchValue({
      lbNombres: row.lbNombres,
      lbApellidos: row.lbApellidos,
      lbTelefonos: row.lbTelefonos,
      lbDireccion: row.lbDireccion,
      lbEdad: row.lbEdad,
      lbContacto: row.lbContacto,
      lbEstado: row.lbEstado,
      lbSexo: row.lbSexo,
    });
    this.editForm.markAsUntouched();

    this.selectedItem = row;


    this.state = PAGE_STATE.EDITING;
  }

  save() {

    const params = this.editForm.value;
    params.lbCodigoLibador = this.selectedItem.lbCodigoLibador;
    params.lbNombreCompleto = `${params.lbApellidos} ${params.lbNombres}`;

    this.spinner.show();
    this.apiService.libador.update(params).subscribe(() => {
        this.spinner.hide();
        this.toastr.success('Guardado exitoso');
        this.loadData();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });
  }

  deleteItem(i, row) {

    this.selectedItem = row;

    this.deleteConfirmDialogRef = this.dialog.open(this.deleteConfirmDialogTemplateRef, {
      width: '400px',
      disableClose: true
    });


  }

  public loadData() {

    this.spinner.show();

    this.apiService.libador.readAll().subscribe(
      (dataArray: any[]) => {
        this.spinner.hide();
        this.dataArray = dataArray;
        this.tableData = this.dataArray;
        this.state = PAGE_STATE.SHOWING;

      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });


  }

  onDeleteConfirmDialogYes() {
    this.deleteConfirmDialogRef.close();


    this.spinner.show();

    this.apiService.libador.delete(this.selectedItem).subscribe(
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


}
