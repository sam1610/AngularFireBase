import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service:EmployeeService,
    private  firestrore:AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
resetForm( form?:NgForm){
  if(form!=null )
    form.resetForm();
  this.service.formData={
    id:null,
    fullName:'',
    position:'',
    empCode:'',
    mobile:''}
}

onSubmit(form:NgForm){
   let data= form.value;
  //  console.log(data);
  this.firestrore.collection('toto').add(data);
  this.resetForm(form);
  this.toastr.success(" Submisson with success", "EMP. Register");
   

}
}
