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

  formGrup: FormGroup;
  todos$?: Observable<Todo[]>

  constructor(private formBuilder: FormBuilder, private todoService: ServiceService) {
    this.formGrup = this.formBuilder.group({
      value: ['', Validators.required]
    })
  }

  add(){
    this.todoService.createList(this.formGrup.value);
    this.formGrup.get('value')?.setValue('');
  }
  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }

}
