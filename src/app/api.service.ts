
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
  getItems(ids: number[], forceRefreshFromServer: boolean = false) {
    from(ids).pipe(
      // get a distinct list of ids
      distinct(),
      mergeMap(id =>
        iif(
          // force refresh or get data from cache
          () => forceRefreshFromServer || !(this.dataCache && this.dataCache[id]),
          // get data from server (add a random delay to simulate latency) 
          this.httpClient.
            get(`https://jsonplaceholder.typicode.com/todos/${id}`).
            pipe(delay(Math.floor(Math.random() * 3000) + 1)) as Observable<Data>,
          // get data from cache
          of(this.dataCache[id])
        )
      ),
      // send data to behaviour subjects
      tap(res => this.sendData(res))).
      // take as many ids as being passed
      pipe(take(ids.length)).
      subscribe();
  }

  // get Behaviour Subjects for each connection
  getSubjects(ids: number[]): BehaviorSubjectObject {
    ids.forEach(id => {
      if (!this.bsubs[id])
        this.bsubs[id] = new BehaviorSubject({} as Data);
    });
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
