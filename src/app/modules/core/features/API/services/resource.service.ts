import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * A generic service that provides CRUD operations for a RESTful resource.
 * @template T The type of the resource.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T> {

  constructor(protected httpClient: HttpClient) {
  }

  /**
   * Gets the URL of the RESTful resource.
   * @returns The URL of the RESTful resource.
   */
  abstract getResourceUrl(): string;

  /**
   * Converts the client-side model object to the server-side model object.
   * By default, this method returns the entity object as is.
   * @param entity The client-side model object.
   * @returns The server-side model object.
   */
  toServerModel(entity: T): any {
    return entity;
  }

  /**
   * Converts the server-side model object to the client-side model object.
   * By default, this method returns the JSON object as is.
   * @param json The server-side model object.
   * @returns The client-side model object.
   */
  fromServerModel(json: any): T {
    return json;
  }

  /**
   * Gets a list of resources with pagination support.
   * @param index The number of resources to return in a single page.
   * @param page The page number to retrieve.
   * @returns An observable that emits an array of resources.
   */
  getList(index: number, page: number): Observable<T[]> {
    const url = this.getResourceUrl();
    let params = new HttpParams()
      .set('limit', index.toString())
      .set('offset', page.toString());

    return this.httpClient.get<T[]>(`/${url}?${params.toString()}`)
      .pipe(
        map((list) => list.map((item) => this.fromServerModel(item))),
        catchError(this.handleError)
      );
  }

  /**
   * Gets all resources.
   * @returns An observable that emits an array of resources.
   */
  getAll(): Observable<T[]> {
    const url = this.getResourceUrl();
    return this.httpClient.get<T[]>(url)
      .pipe(
        map((list) => list.map((item) => this.fromServerModel(item))),
        catchError(this.handleError)
      );
  }

  /**
   * Gets a single resource by ID.
   * @param id The ID of the resource to retrieve.
   * @returns An observable that emits a single resource.
   */
  get(id: string | number): Observable<T> {
    const url = this.getResourceUrl();
    return this.httpClient.get<T>(`/${url}/${id}`)
      .pipe(
        map((json) => this.fromServerModel(json)),
        catchError(this.handleError)
      );
  }

  /**
   * Adds a new resource.
   * @param resource The resource to add.
   * @returns An observable that emits the response from the server.
   */
  add(resource: T): Observable<any> {
    const url = this.getResourceUrl();
    return this.httpClient.post(`/${url}`, this.toServerModel(resource))
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Deletes a resource by ID.
   * @param id The ID of the resource to delete.
   * @returns An observable that emits the response from the server.
   */
  delete(id: string | number): Observable<any> {
    const url = this.getResourceUrl();
    return this.httpClient.delete(`/${url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

    /**
   * Updates a resource.
   * @param resource The resource to update.
   * @returns An observable that emits the response from the server.
   */
  update(resource: T, id: string | number): Observable<any> {
    const url = this.getResourceUrl();
    return this.httpClient.put(`/${url}/${id}`, resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  protected handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}