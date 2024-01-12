import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component,OnInit, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultValuesService } from 'src/app/auth/services/default-values.service';
import { DatePipe } from '@angular/common';
import { GlobalStatusService } from '@billing-services/global-status.service';
import { CompanyInfoService } from '../../services/company-info.service';
import { MyDate } from '@billing-utils/date';
import { DialogErrorAlertComponent } from '@shared/components/dialog-error-alert/dialog-error-alert.component';
import { MatsnackbarSuccessComponent } from '@shared/components/matsnackbar-success/matsnackbar-success.component';
import { IMAGENOUPLOAD, MatSnackBarSuccessConfig, NoJpgFormatImage } from '@billing-utils/constants';

@Component({
  selector: 'app-principal-configuration',
  templateUrl: './principal-configuration.component.html',
  styleUrls: ['./principal-configuration.component.scss']
})
export class PrincipalConfigurationComponent implements OnInit, OnChanges {

  @Input() inputSave: boolean = false
  formCrudCompany!: FormGroup
  urlLink: string = ''
  codartId: string = ''
  validArticle = false
  imageNoUpload = IMAGENOUPLOAD
  imageCompanyImageURL = IMAGENOUPLOAD
  imageCompanyIconURL = IMAGENOUPLOAD
  imageCompanyLogoURL = IMAGENOUPLOAD
  imageCompanyBackgroundURL = IMAGENOUPLOAD
  imageCompanyGlossURL = IMAGENOUPLOAD

  private buildForm(){
    this.formCrudCompany = this.formBuilder.group({
      numint: ['',[Validators.required]],
      typidedoc: ['',[Validators.required]],
      nroidedoc: ['',[Validators.required]],
      comnam: ['',[Validators.required]],
      addres: ['',[Validators.required]],
      poscod: ['',[Validators.required]],
      image: ['',[]],
      icon: ['',[]],
      logo: ['',[]],
      background: ['',[]],
      gloss: ['',[]],
      observ: ['',[]],
      commen: ['',[]],
      status: ['',[]],
      createby: [{value:'',disabled: true},[]],
      updateby: [{value:'',disabled: true},[]],
      createat: [{value:'',disabled: true},[]],
      updateat: [{value:'',disabled: true},[]],
    })
  }

  constructor(
    private companyInfoService: CompanyInfoService,
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    private matSnackBar: MatSnackBar,
    private datePipe: DatePipe,
    private defaultValuesService: DefaultValuesService,
    private globalStatusService: GlobalStatusService
  ){
    this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['inputSave'] && changes['inputSave'].currentValue){
      this.saveCompany()
    }
  }

  ngOnInit(): void {
    this.globalStatusService.setLoading(true)
    this.companyInfoService.getById(1)
    .subscribe({
      next: data => {
        if (data.status<=0) {
          this.dialog.open(DialogErrorAlertComponent, {
            width: '400px',
            data: { status: data.status, message: data.message }
          })
        } else {
          if (!data.object) {
          } else {
            this.formCrudCompany.patchValue({
              numint: data.object.numint,
              typidedoc: data.object.typidedoc,
              nroidedoc: data.object.nroidedoc,
              comnam: data.object.comnam,
              addres: data.object.addres,
              poscod: data.object.poscod,
              image: data.object.image,
              icon: data.object.icon,
              logo: data.object.logo,
              background: data.object.background,
              gloss: data.object.gloss,
              observ: data.object.observ,
              commen: data.object.commen,
              status: data.object.status,
              createby: data.object.createby,
              updateby: data.object.updateby,
              createat: data.object.createat,
              updateat: data.object.updateat
            })
            this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
            if (data.object.image){
              const imageUrl = `data:image/jpeg;base64,${data.object.image}`
              this.imageCompanyImageURL = imageUrl;
            }
            if (data.object.icon){
              const imageUrl = `data:image/jpeg;base64,${data.object.icon}`
              this.imageCompanyIconURL = imageUrl;
            }
            if (data.object.logo){
              const imageUrl = `data:image/jpeg;base64,${data.object.logo}`
              this.imageCompanyLogoURL = imageUrl;
            }
            if (data.object.background){
              const imageUrl = `data:image/jpeg;base64,${data.object.background}`
              this.imageCompanyBackgroundURL = imageUrl;
            }
            if (data.object.gloss){
              const imageUrl = `data:image/jpeg;base64,${data.object.gloss}`
              this.imageCompanyGlossURL = imageUrl;
            }
          }
        }
      this.globalStatusService.setLoading(false)
      },
      error:e =>{
        console.log(e.message)
        this.globalStatusService.setLoading(false)
      }
    })
  }

  isInputInvalid(fieldName: string): boolean{
    const field = this.formCrudCompany.get(fieldName)
    return field ? field.invalid && field.touched : true
  }

  formatDate(date: number[] | Date | null): String {
    return MyDate.convertToCustomStringLong(date)
  }

  selectedImage(event: any, component: string){
    if(event?.target){
      const data:File = event.target.files[0]
      if (data) {
        const format =  data.name.split('.').pop()?.toLowerCase()
        if (format === 'jpg') {
          const reader = new FileReader()
          reader.onload = (e: any) => {
            try {
              const fileContent: ArrayBuffer = e.target.result;
              switch (component) {
                case 'image':
                  this.imageCompanyImageURL = URL.createObjectURL(data);
                  break;
                case 'icon':
                  this.imageCompanyIconURL = URL.createObjectURL(data);
                  break;
                case 'logo':
                  this.imageCompanyLogoURL = URL.createObjectURL(data);
                  break;
                case 'background':
                  this.imageCompanyBackgroundURL = URL.createObjectURL(data);
                  break;
                case 'gloss':
                  this.imageCompanyGlossURL = URL.createObjectURL(data);
                  break;
                default:
                  break;
              }
              if (this.formCrudCompany instanceof FormGroup) {
                this.formCrudCompany.get(component)?.setValue(Array.from(new Uint8Array(fileContent)))
              }
            } catch (error) {
              console.error('Error during file loading:', error)
            }
          };
          reader.readAsArrayBuffer(data)
        } else {
          event.target.value = null
          switch (component) {
            case 'image':
              this.imageCompanyImageURL = IMAGENOUPLOAD
              break;
            case 'icon':
              this.imageCompanyIconURL = IMAGENOUPLOAD
              break;
            case 'logo':
              this.imageCompanyLogoURL = IMAGENOUPLOAD
              break;
            case 'background':
              this.imageCompanyBackgroundURL = IMAGENOUPLOAD
              break;
            case 'gloss':
              this.imageCompanyGlossURL = IMAGENOUPLOAD
              break;
            default:
              break;
          }
          this.dialog.open(DialogErrorAlertComponent,NoJpgFormatImage)
        }
      }
    }
  }

  resetImage(component: string) {
    if (this.formCrudCompany instanceof FormGroup) {
      this.formCrudCompany.get(component)?.setValue(null)
    }
    switch (component) {
      case 'image':
        this.imageCompanyImageURL = IMAGENOUPLOAD
        break;
      case 'icon':
        this.imageCompanyIconURL = IMAGENOUPLOAD
        break;
      case 'logo':
        this.imageCompanyLogoURL = IMAGENOUPLOAD
        break;
      case 'background':
        this.imageCompanyBackgroundURL = IMAGENOUPLOAD
        break;
      case 'gloss':
        this.imageCompanyGlossURL = IMAGENOUPLOAD
        break;
      default:
        break;
    }
  }

  saveCompany(){
    if(this.formCrudCompany.valid){
      this.globalStatusService.setLoading(true)
      this.companyInfoService.putUpdate(this.numint?.value,this.formCrudCompany.value)
      .subscribe({
        next:data =>{
          if(data.status<=0){
            this.dialog.open(DialogErrorAlertComponent,{
              width: '400px',
              data: { data }
            })
          }
          if(data.status>=0){
            this.matSnackBar.openFromComponent(MatsnackbarSuccessComponent,MatSnackBarSuccessConfig)
          }
          this.globalStatusService.setLoading(false)
        },
        error:e =>{
          console.log(e.message)
          this.globalStatusService.setLoading(false)
        }
      })
    } else {
      this.formCrudCompany.markAllAsTouched()
    }
  }

  get numint(){
    return this.formCrudCompany.get('numint')
  }
  get typidedoc(){
    return this.formCrudCompany.get('typidedoc')
  }
  get nroidedoc(){
    return this.formCrudCompany.get('nroidedoc')
  }
  get comnam(){
    return this.formCrudCompany.get('comnam')
  }
  get addres(){
    return this.formCrudCompany.get('addres')
  }
  get poscod(){
    return this.formCrudCompany.get('poscod')
  }
  get image(){
    return this.formCrudCompany.get('image')
  }
  get icon(){
    return this.formCrudCompany.get('icon')
  }
  get logo(){
    return this.formCrudCompany.get('logo')
  }
  get background(){
    return this.formCrudCompany.get('background')
  }
  get gloss(){
    return this.formCrudCompany.get('gloss')
  }
  get observ(){
    return this.formCrudCompany.get('observ')
  }
  get commen(){
    return this.formCrudCompany.get('commen')
  }
  get status(){
    return this.formCrudCompany.get('status')
  }
  get createby(){
    return this.formCrudCompany.get('createby')
  }
  get updateby(){
    return this.formCrudCompany.get('updateby')
  }
  get createat(){
    return this.formCrudCompany.get('createat')
  }
  get updateat(){
    return this.formCrudCompany.get('updateat')
  }

}
