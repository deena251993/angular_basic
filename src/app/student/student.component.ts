import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentData } from './student.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
 showadd        !:boolean;
 showupdate     !:boolean;
 formValue      !:FormGroup;
 allStudentData  :any=[];
 studentmodelObj :studentData = new studentData;
 tempStudentListArray :any;

sectionText : any = '';
classText   : any = '';
yearText    : any = '';

//  @ViewChild('nameVar')    nameVar:    any = '';
//  @ViewChild('sectionVar') sectionVar: any = '';
//  @ViewChild('classVar')   classVar:   any = '';
//  @ViewChild('yearVar')    yearVar:    any = '';
//  @ViewChild('marksVar')   marksVar:   any = '';
 constructor(private formBuilder:FormBuilder,private api :ApiService) {
 }

 ngOnInit():void{
  this.formValue = this.formBuilder.group({
    stdName    : ['', Validators.required],
    stdSection : ['', Validators.required],
    stdClass   : ['', Validators.required],
    stdDivision   : ['', Validators.required],
    stdYear    : ['', Validators.required],
    stdMarks   : ['', Validators.required],
    stdMaths   : ['', Validators.required],
    stdEnglish   : ['', Validators.required],
    stdScience   : ['', Validators.required]
  })
  this.getStudent();
  this.tempStudentListArray=[...this.allStudentData];

 }

add(){
this.showadd     = true;
this.showupdate  = false;
this.studentmodelObj.id =0;
this.formValue.controls['stdName'].setValue('');
this.formValue.controls['stdSection'].setValue('');
this.formValue.controls['stdClass'].setValue('');
this.formValue.controls['stdDivision'].setValue('');
this.formValue.controls['stdYear'].setValue('');
this.formValue.controls['stdMarks'].setValue('');
this.formValue.controls['stdMaths'].setValue('');
this.formValue.controls['stdEnglish'].setValue('');
this.formValue.controls['stdScience'].setValue('');
}

// To Edit student//
edit(data:any){
this.showadd     = false;
this.showupdate  = true;
this.studentmodelObj.id =data.id;
this.formValue.controls['stdName'].setValue(data.stdName);
this.formValue.controls['stdSection'].setValue(data.stdSection);
this.formValue.controls['stdClass'].setValue(data.stdClass);
this.formValue.controls['stdDivision'].setValue(data.stdDivision);
this.formValue.controls['stdYear'].setValue(data.stdYear);
this.formValue.controls['stdMarks'].setValue(data.stdMarks);
this.formValue.controls['stdMaths'].setValue(data.stdMaths);
this.formValue.controls['stdEnglish'].setValue(data.stdEnglish);
this.formValue.controls['stdScience'].setValue(data.stdScience);
}

// To Add student//
addStudent(){
  this.studentmodelObj.stdName    = this. formValue.value.stdName;
  this.studentmodelObj.stdSection = this. formValue.value.stdSection;
  this.studentmodelObj.stdClass   = this. formValue.value.stdClass;
  this.studentmodelObj.stdDivision   = this. formValue.value.stdDivision;
  this.studentmodelObj.stdYear    = this. formValue.value.stdYear;
  this.studentmodelObj.stdMarks   = this. formValue.value.stdMarks;
  this.studentmodelObj.stdMaths   = this. formValue.value.stdMaths;
  this.studentmodelObj.stdEnglish   = this. formValue.value.stdEnglish;
  this.studentmodelObj.stdScience   = this. formValue.value.stdScience;
  this.api.postStudent(this.studentmodelObj).subscribe(res=>{
         //console.log(res);
         alert("Student details added successfully!");      
         this.getStudent();
         this.formValue.reset();
  },
  err=>{
        console.log(err);
         alert("Something went wrong!!!");
  })
  }

  // To update student//
updateStudent(){
  this.studentmodelObj.stdName    = this. formValue.value.stdName;
  this.studentmodelObj.stdSection = this. formValue.value.stdSection;
  this.studentmodelObj.stdClass   = this. formValue.value.stdClass;
  this.studentmodelObj.stdDivision   = this. formValue.value.stdDivision;
  this.studentmodelObj.stdYear    = this. formValue.value.stdYear;
  this.studentmodelObj.stdMarks   = this. formValue.value.stdMarks;
  this.studentmodelObj.stdMaths   = this. formValue.value.stdMaths;
  this.studentmodelObj.stdEnglish   = this. formValue.value.stdEnglish;
  this.studentmodelObj.stdScience   = this. formValue.value.stdScience;
  this.api.updateStudent(this.studentmodelObj,this.studentmodelObj.id).subscribe(res=>{
         //console.log(res);
         alert("Student details updated successfully!");                
         this.getStudent();
         this.formValue.reset();
  },
  err=>{
         alert("Something went wrong!!!");
  })
  }
 // To get student//
  getStudent(){
    this.api.getStudent().subscribe(res=>{
          this.allStudentData =res;
          this.tempStudentListArray= res;
    })
  }

   // To delete student//
   deleteStudent(id:any){
    this.api.deleteStudent( id).subscribe(res=>{
         alert("Student deleted successfully!!")
         this.getStudent();;
    })
  }

  // searchFilter() {
  //   this.tempStudentListArray=[] ;
  //   let filterObject: any = {
  //     // stdName: this.nameVar.nativeElement.value,
  //     stdSection: this.sectionVar.nativeElement.value,
  //     stdClass: this.classVar.nativeElement.value,
  //     stdYear: this.yearVar.nativeElement.value,
  //     // stdMarks: this.marksVar.nativeElement.value,   
  //   };
  //   for (let i = 0; i < this.allStudentData.length; i++) {
  //     let isStringExist:any;
  //     for (let key in filterObject) {
  //       isStringExist =this.allStudentData[i][key].toString().toUpperCase()
  //           .indexOf(filterObject[key].toString().toUpperCase()) > -1;
  //       if (isStringExist == false) {
  //         break;
  //       }
  //     }
  //     if (isStringExist) {
  //       this.tempStudentListArray.push(this.allStudentData[i]);
  //     }
  //   }
  // }
}


