import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../service.service";
import {Observable} from "rxjs";
import {Todo} from "../todo";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  formGroup: FormGroup;
  todos$?: Observable<Todo[]>

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

  deleteSelect(){
    this.todoService.deleteSelectedList();
  }

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }

}
