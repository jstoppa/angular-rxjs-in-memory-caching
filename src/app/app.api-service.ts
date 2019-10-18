
import { Injectable } from '@angular/core';
import { mergeMap, tap, distinct,  } from 'rxjs/operators';
import { from, of, iif, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient){}
  
  bsubs: BehaviorSubjectObject = {};
  dataCache: DataCache = {};

  getItems(ids: number[], forceRefresh: boolean = false){
    from(ids).pipe(
      distinct(),
      mergeMap(id => 
        iif(
          () => this.condition(id) || forceRefresh,
          this.makeCall(id),
          this.getFromCache(id)
        )
      ),   
      tap(res => this.sendData(res))).subscribe();
  }

  condition(id): boolean {
    if (!(this.dataCache && this.dataCache[id])) {
      console.log(this.dataCache[id])
      return true;
    }
    else
    {
      console.log(this.dataCache[id])
      return false;
    }
  }

  getSubjects(ids: number[]): BehaviorSubjectObject {
    for (const id in ids) {
      if (!this.bsubs[id])
        this.bsubs[id] = new BehaviorSubject({} as Data);
    }
    return this.bsubs;
  }

  sendData(res: Data) {
    if (!this.bsubs[res.id])
      this.bsubs[res.id] = new BehaviorSubject({} as Data);
    
    this.dataCache[res.id] = res;
    this.bsubs[res.id].next(res);
  }

  makeCall(id: number): Observable<Data> {
    console.log('call for id = ' + id);
    return <Observable<Data>>this.httpClient.get(`https://jsonplaceholder.typicode.com/todos//${id}`);
  }

  getFromCache(id: number): Observable<Data> {
    console.log('getting from cache for id = ' + id);
    return of(this.dataCache[id]);
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