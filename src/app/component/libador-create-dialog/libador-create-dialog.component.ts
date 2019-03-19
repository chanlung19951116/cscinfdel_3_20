import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {PAGE_STATE} from '../../define/enums';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../service/api.service';
import {CommonService} from '../../service/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {fromEvent} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-libador-create-dialog',
  templateUrl: './libador-create-dialog.component.html',
  styleUrls: ['./libador-create-dialog.component.scss']
})
export class LibadorCreateDialogComponent implements OnInit {



  public createForm: FormGroup;

  selectedItem: any = {};


  constructor(
    private fb: FormBuilder,
    public apiService: ApiService,
    private common: CommonService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LibadorCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    console.log(data);

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


  }

  startCreating() {

    this.createForm.reset();
    this.createForm.markAsUntouched();

  }

  create() {

    const params = this.createForm.value;

    params.lbNombreCompleto = `${params.lbApellidos} ${params.lbNombres}`;

    this.spinner.show();

    this.apiService.libador.create(params).subscribe((value) => {
        this.spinner.hide();
        this.toastr.success('Creado existosamente');

        this.dialogRef.close(value);

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



}
