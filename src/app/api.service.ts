
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, of, iif, Observable, BehaviorSubject } from 'rxjs';
import { mergeMap, tap, distinct, delay, take } from 'rxjs/operators';
import { BehaviorSubjectObject, DataCache, Data } from './models';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient){}
  
  bsubs: BehaviorSubjectObject = {};
  dataCache: DataCache = {};

  // method to featch data either from cache or via web service call
  // and push it into its respective Behaviour Subject
  getItems(ids: number[], forceRefresh: boolean = false) {
    from(ids).pipe(
      distinct(),
      mergeMap(id =>
        iif(
          () => forceRefresh || !(this.dataCache && this.dataCache[id]),
          this.httpClient.
            get(`https://jsonplaceholder.typicode.com/todos/${id}`).
            pipe(delay(Math.floor(Math.random() * 3000) + 1)) as Observable<Data>,
          of(this.dataCache[id])
        )
      ),
      tap(res => this.sendData(res))).
      pipe(take(ids.length)).
      subscribe();
  }

  // get Behaviour Subjects for each connection
  getSubjects(ids: number[]): BehaviorSubjectObject {
    for (const id in ids) {
      if (!this.bsubs[id])
        this.bsubs[id] = new BehaviorSubject({} as Data);
    }
    return this.bsubs;
  }

  // cache the result from the API and send data to the Behaviour Subjects 
  private sendData(res: Data) {
    if (!this.bsubs[res.id])
      this.bsubs[res.id] = new BehaviorSubject({} as Data);
    
    this.dataCache[res.id] = res;
    this.bsubs[res.id].next({...res});
  }
}
