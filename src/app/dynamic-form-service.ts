import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  c = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  
  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/v1/';

  constructor(private http: HttpClient) { }

 
  createDynamicForm(DynamicForm: Object): Observable<Object> {
    // alert("create dynamic form");
    return this.http.post("http://localhost:8080/springboot-crud-rest/api/v1/formdesign/"+"saveOrUpdateForm", DynamicForm,{headers: this.c});
  }


  createDynamicFormData(DynamicForm: Object): Observable<Object> {
   // alert("create dynamic form");
   return this.http.post("http://localhost:8080/springboot-crud-rest/api/v1/formdata/"+"saveOrUpdateForm", DynamicForm,{headers: this.c});
 }


  updateDynamicForm(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteDynamicForm(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getDynamicForm(formName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}`+`formdesign`+`/`+encodeURIComponent(`${formName}`),{headers:this.c});
  }

  getDynamicFormDataList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+"formdata/getAll",{headers:this.c});
  }
}
