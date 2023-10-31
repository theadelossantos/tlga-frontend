import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, Form} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-hssection',
  templateUrl: './add-hssection.component.html',
  styleUrls: ['./add-hssection.component.css']
})
export class AddHssectionComponent {
  ValidationFormUser: FormGroup; 
  sections: string[] = [];
  gradelvl: any[] = [];
  selectedGradeLevel:any = null;
  selectedDepartment: string = '';

  
  departmentId: string;
  departmentName: string;
  grlevel : string = "";
  section : string = "";

  successMessage: string = '';
  errorMessage:string = '';
  showAlert: boolean = false;
 
  validationMessages = {
    grlevel: [{type: "required", message: "Choose Grade Level"}],
    section: [{type: "required", message: "Enter Section Name"}],
  }

  

  constructor(private formbuilder:FormBuilder, private authService: AuthService) {

    this.ValidationFormUser = this.formbuilder.group({
      grlevel: new FormControl ('null', Validators.compose([
        Validators.required
      ])),
      section: new FormControl('',Validators.compose([
        Validators.required
      ])),
    });
  }

  capitalizeFirstLetter(event: any, controlName: string): void {
    const input = event.target;
    const value = input.value;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    this.ValidationFormUser.get(controlName)?.setValue(capitalizedValue, { emitEvent: false });
  }


  addSection(){
    if(this.ValidationFormUser.valid){
      const sectionData = {
        dept_id: 2,
        gradelvl_id: this.ValidationFormUser.get('grlevel').value.gradelvl_id,
        section_name: this.ValidationFormUser.get('section').value
      };

      this.authService.addHsSection(sectionData).subscribe(
        (response) => {
          this.showAlert = true;

          setTimeout(() => {
            this.hideAlert();
          }, 3000);
        },
        (error) => {
          this.showAlert = true;

          
        }
      );
    }
  }

  hideAlert() {
    this.showAlert = false;
  }


  ngOnInit() {
    this.authService.getHsGradeLevels().subscribe((data) => {
      this.gradelvl = data;
      
    });
  }


}