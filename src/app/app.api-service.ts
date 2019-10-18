
import { Injectable } from '@angular/core';
import { mergeMap, tap, distinct } from 'rxjs/operators';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient){}
  
  bsubs: BehaviorSubjectObject = {};
  dataCache: DataCache = {};


  getItems(ids: number[]){
    from(ids).pipe(
      distinct(),
      mergeMap(id => 
        <Observable<any>> this.httpClient.get(`https://jsonplaceholder.typicode.com/todos//${id}`)),
      tap(res => this.sendValue(res))).subscribe();
  }

  getSubjects(ids: number[]): BehaviorSubjectObject {
    for (const id in ids) {
      if (!this.bsubs[id])
        this.bsubs[id] = new BehaviorSubject({} as Data);
    }
    console.log(this.bsubs);
    return this.bsubs;
  }

  sendValue(res: Data) {
    if (!this.bsubs[res.id])
      this.bsubs[res.id] = new BehaviorSubject({} as Data);
    
    this.dataCache[res.id] = res;
    this.bsubs[res.id].next(res);
  }
}

export declare interface BehaviorSubjectObject {
  [key: string]: BehaviorSubject<Data>;
}

declare interface DataCache {
  [key: string]: Data;
}

export interface Data {
  id: number;
  title: string;
}