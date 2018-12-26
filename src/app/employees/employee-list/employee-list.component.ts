import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from './../../shared/employee.model';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
list:Employee[];
  constructor( private service:EmployeeService, private firstore:AngularFirestore,
    private toast:ToastrService) {
      
    } 

  ngOnInit() {
    this.service.getEmployees().subscribe(
      data => {
        this.list= data.map(
          item=> { return {
            id:item.payload.doc.id,
            ...item.payload.doc.data()} as Employee
          }
        )}
        )

      }

      onEdit(emp:Employee){
        this.service.formData= Object.assign({}, emp); }
        ondelete(id:string){
          if (confirm(" Are you sure to delete this record"))
            {
              this.firstore.doc("employees/"+id).delete();
              this.toast.warning("Deleteded succefully ", " EMP.   Register")
            }

        }
    
  }


