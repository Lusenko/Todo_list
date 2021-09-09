import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../service.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Todo} from "../todo";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  formGroup: FormGroup;
  todos$?: Observable<Todo[]>
  //private _todo = new BehaviorSubject<Todo[]>([])

  constructor(private formBuilder: FormBuilder, private todoService: ServiceService) {
    this.formGroup = this.formBuilder.group({
      check: [false],
      value: ['', Validators.required]
    })
  }


  add(){
    this.todoService.createList(this.formGroup.value);
    this.formGroup.get('value')?.setValue('');
  }

  remove(todoId: number){
    this.todoService.removeList(todoId);
  }

  check(id: number){
    this.todoService.checkList(id);
  }

  showAllItem(){
    this.todoService.showAll()
  }

  showDoneItem(){
    this.todoService.showDone()
  }

  showNotDoneItem(){
    this.todoService.showNotDone()
  }

  ngOnInit(): void {

  }
}
