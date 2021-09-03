import { Injectable } from '@angular/core';
import {Todo} from "./todo";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private _todo = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this._todo.asObservable();

  private todos: Todo[] = [];
  private next_id = 0;

  constructor() { }


  createList(item: Todo){
    item.id = ++this.next_id;
    this.todos.push(item);
    this._todo.next(Object.assign([], this.todos));
  }
}
