import { TestBed } from '@angular/core/testing';
import { Observable, lastValueFrom, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Mocked } from 'vitest';

@Injectable()
class MockResourceService extends ResourceService<any> {
  getResourceUrl(): string {
    return 'mock-resource';
  }
}

describe('ResourceService', () => {
  let httpClientSpy: Mocked<Pick<HttpClient, 'get' | 'post' | 'put' | 'delete'>>;
  let resourceService: MockResourceService;

  beforeEach(() => {
    const spy = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    } as unknown as Mocked<Pick<HttpClient, 'get' | 'post' | 'put' | 'delete'>>;

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: HttpClient, useValue: spy },
        MockResourceService
      ]
    });
    resourceService = TestBed.inject(MockResourceService);
    httpClientSpy = TestBed.inject(HttpClient) as unknown as Mocked<Pick<HttpClient, 'get' | 'post' | 'put' | 'delete'>>;
  });


  it('should be created', () => {
    expect(resourceService).toBeTruthy();
  });

  it('should get resource URL', () => {
    let url = resourceService.getResourceUrl();
    expect(url).toBe('mock-resource');
  });

  it('should convert to server model', () => {
    const entity = {};
    expect(resourceService.toServerModel(entity)).toBe(entity);
  });

  it('should convert from server model', () => {
    const json = {};
    expect(resourceService.fromServerModel(json)).toBe(json);
  });


  it('should get list of resources', () => {
    const index = 10;
    const page = 1;
    const url = 'mock-resource';
    const list = [{ id: 1 }, { id: 2 }];
    httpClientSpy.get.mockReturnValue(of(list));
    vi.spyOn(resourceService, 'fromServerModel');

    resourceService.getList(index, page).subscribe(resources => {
      expect(resources).toEqual(list);
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(`${url}?limit=${index}&offset=${page}`);
    });
  });

  it('should handle error while getting list of resources', async () => {
    const index = 10;
    const page = 1;
    const url = 'mock-resource';
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    httpClientSpy.get.mockReturnValue(throwError(() => errorResponse));
    try {
      await lastValueFrom(resourceService.getList(index, page).pipe(
        catchError((error) => {
          expect(error).toEqual(new Error(errorResponse.message));
          return throwError(() => error);
        })
      ));
      throw new Error('getList should have failed with 400 error');
    } catch (error) {
      expect(error).toEqual(new Error(errorResponse.message));
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(`${url}?limit=${index}&offset=${page}`);
    }
  });
  
  

  it('should get all resources', () => {
    const url = 'mock-resource';
    const list = [{ id: 1 }, { id: 2 }];
    httpClientSpy.get.mockReturnValue(of(list));
    vi.spyOn(resourceService, 'fromServerModel');

    resourceService.getAll().subscribe(resources => {
      expect(resources).toEqual(list);
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });
  });

  it('should handle error while getting all resources', async () => {
    const url = 'mock-resource';
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    httpClientSpy.get.mockReturnValue(throwError(() => errorResponse));
    try {
      await lastValueFrom(resourceService.getAll().pipe(
        catchError((error) => {
          expect(error).toEqual(new Error(errorResponse.message));
          return throwError(() => error);
        })
      ));
      throw new Error('getList should have failed with 400 error');
    } catch (error) {
      expect(error).toEqual(new Error(errorResponse.message));
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    }
  });

  describe('get', () => {
    const resourceId = 1;
    const url = 'mock-resource';
  
    it('should get a single resource by ID', () => {
      const resource = { id: resourceId };
      httpClientSpy.get.mockReturnValue(of(resource));
      vi.spyOn(resourceService, 'fromServerModel');
  
      resourceService.get(resourceId).subscribe((result) => {
        expect(result).toEqual(resource);
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(`${url}/${resourceId}`);
        expect(resourceService.fromServerModel).toHaveBeenCalledWith(resource);
      });
    });
  
    it('should handle error while getting a single resource by ID', async () => {
      const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
      httpClientSpy.get.mockReturnValue(throwError(() => errorResponse));
      try {
        await lastValueFrom(resourceService.get(resourceId).pipe(
          catchError((error) => {
            expect(error).toEqual(new Error(errorResponse.message));
            return throwError(() => error);
          })
        ));
        throw new Error('get should have failed with 400 error');
      } catch (error) {
        expect(error).toEqual(new Error(errorResponse.message));
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(`${url}/${resourceId}`);
      }
    });
  });
  
  it('should add a new resource', () => {
    const url = 'mock-resource';
    const resource = { name: 'Test Resource' };
    httpClientSpy.post.mockReturnValue(of(resource));
    vi.spyOn(resourceService, 'toServerModel');

    resourceService.add(resource).subscribe((result) => {
      expect(result).toEqual(resource);
      expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.post).toHaveBeenCalledWith(url, resource);
      expect(resourceService.toServerModel).toHaveBeenCalledWith(resource);
    });
  });
  
  it('should handle error while adding a new resource', async () => {
    const url = 'mock-resource';
    const resource = { name: 'Test Resource' };
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    httpClientSpy.post.mockReturnValue(throwError(() => errorResponse));
    vi.spyOn(resourceService, 'toServerModel');

    try {
      await lastValueFrom(resourceService.add(resource).pipe(
        catchError((error) => {
          expect(error).toEqual(new Error(errorResponse.message));
          return throwError(() => error);
        })
      ));
      throw new Error('add should have failed with 400 error');
    } catch (error) {
      expect(error).toEqual(new Error(errorResponse.message));
      expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.post).toHaveBeenCalledWith(url, resource);
      expect(resourceService.toServerModel).toHaveBeenCalledWith(resource);
    }
  });
  
  it('should delete a resource by ID', () => {
    const resourceId = '1';
    const url = 'mock-resource';
    httpClientSpy.delete.mockReturnValue(of(null));
    resourceService.delete(resourceId).subscribe((result) => {
      expect(result).toBe(null);
      expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.delete).toHaveBeenCalledWith(`${url}/${resourceId}`);
    });
  });
  
  it('should handle error while deleting a resource by ID', async () => {
    const resourceId = '1';
    const url = 'mock-resource';
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    httpClientSpy.delete.mockReturnValue(throwError(() => errorResponse));
    try {
      await lastValueFrom(resourceService.delete(resourceId).pipe(
        catchError((error) => {
          expect(error).toEqual(new Error(errorResponse.message));
          return throwError(() => error);
        })
      ));
      throw new Error('delete should have failed with 400 error');
    } catch (error) {
      expect(error).toEqual(new Error(errorResponse.message));
      expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.delete).toHaveBeenCalledWith(`${url}/${resourceId}`);
    }
  });
  
  it('should update a resource', () => {
    const resourceId = '1';
    const url = 'mock-resource';
    const updatedResource = { id: resourceId, name: 'Updated Resource' };
    httpClientSpy.put.mockReturnValue(of(updatedResource));
    resourceService.update(updatedResource, resourceId).subscribe((result) => {
      expect(result).toEqual(updatedResource);
      expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.put).toHaveBeenCalledWith(`${url}/${resourceId}`, updatedResource);
    });
  });
  
  it('should handle error while updating a resource', async () => {
    const resourceId = '1';
    const url = 'mock-resource';
    const updatedResource = { id: resourceId, name: 'Updated Resource' };
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    httpClientSpy.put.mockReturnValue(throwError(() => errorResponse));
    try {
      await lastValueFrom(resourceService.update(updatedResource, resourceId).pipe(
        catchError((error) => {
          expect(error).toEqual(new Error(errorResponse.message));
          return throwError(() => error);
        })
      ));
      throw new Error('update should have failed with 400 error');
    } catch (error) {
      expect(error).toEqual(new Error(errorResponse.message));
      expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.put).toHaveBeenCalledWith(`${url}/${resourceId}`, updatedResource);
    }
  });
  
});



export class TestType {

}
