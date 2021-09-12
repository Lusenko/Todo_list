import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../service/todo.service";
import {Observable} from "rxjs";
import {Todo} from "../interface/todo";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  formGroup: FormGroup;
  todos$?: Observable<Todo[]>

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {
    this.formGroup = this.formBuilder.group({
      check: [false],
      value: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }

  addItemToList(){
    this.todoService.createElement(this.formGroup.value);
    this.formGroup.reset();
  }

  removeItemToList(todoId: number){
    this.todoService.removeElement(todoId);
  }

  checkItemInList(id: number){
    this.todoService.checkElement(id);
  }

  showAllItem(){
    this.todoService.showAllElement()
  }

  showDoneItem(){
    this.todoService.showDoneElement()
  }

  showNotDoneItem(){
    this.todoService.showNotDoneElement()
  }
}
