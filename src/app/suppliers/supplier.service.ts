import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { Supplier } from './supplier';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.suppliersUrl)
      .pipe(
        // tap(data => console.log('Products: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getSupplierbyId(Id: number): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.suppliersUrl}/${Id}`)
      .pipe(
        // tap(data => console.log('Products: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
