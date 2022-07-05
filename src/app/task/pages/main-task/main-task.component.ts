import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../service/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css']
})
export class MainTaskComponent implements OnInit {

  tasks: Array<any> = []
  user:any
  miFormulario: FormGroup =this.formBuilder.group({
    newTask:[''],
  })

  constructor(private crudService: CrudService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.user = this.crudService.user;
    this.crudService.read().subscribe((res) =>{
      this.tasks = res.tareas
    })
  }

  create(){
    this.crudService.create(this.miFormulario.value.newTask)
    .subscribe((response) =>{
    this.miFormulario.reset()

      this.crudService.read().subscribe((res) =>{
        this.tasks = res.tareas
      })
  });
  }

  update(task: any){

    const {_id, nombre} = task
    this.router.navigateByUrl(`/task/${_id}/${nombre}`)
  }

  delete(id:string){
    this.crudService.delete(id).subscribe((response) =>{
      this.crudService.read().subscribe((res) =>{
        this.tasks = res.tareas
      })
  });
}

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/auth")
  }

}