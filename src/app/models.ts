import { BehaviorSubject } from 'rxjs';

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