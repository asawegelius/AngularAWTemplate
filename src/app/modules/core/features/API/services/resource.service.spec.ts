import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, lastValueFrom, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

class MockResourceService extends ResourceService<any> {
  getResourceUrl(): string {
    return 'mock-resource';
  }
}

describe('ResourceService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let resourceService: MockResourceService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: HttpClient, useValue: spy },
        MockResourceService
      ]
    });
    resourceService = TestBed.inject(MockResourceService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
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


  it('should get list of resources', (done) => {
    const index = 10;
    const page = 1;
    const url = 'mock-resource';
    const list = [{ id: 1 }, { id: 2 }];
    httpClientSpy.get.and.returnValue(of(list));
    spyOn(resourceService, 'fromServerModel').and.callThrough();
    resourceService.getList(index, page).subscribe(resources => {
      expect(resources).toEqual(list);
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe(`/${url}?limit=${index}&offset=${page}`);
      done();
    });
  });

  it('should handle error while getting list of resources', async () => {
    const index = 10;
    const page = 1;
    const url = 'mock-resource';
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
    try {
      await lastValueFrom(resourceService.getList(index, page).pipe(
        catchError((error) => {
          expect(error).toEqual(new Error(errorResponse.message));
          return throwError(() => error);
        })
      ));
      fail('getList should have failed with 400 error');
    } catch (error) {
      expect(error).toEqual(new Error(errorResponse.message));
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe(`/${url}?limit=${index}&offset=${page}`);
    }
  });
  
  

  it('should get all resources', () => {
    const url = 'mock-resource';
    const list = [{ id: 1 }, { id: 2 }];
    httpClientSpy.get.and.returnValue(of(list));
    spyOn(resourceService, 'fromServerModel').and.callThrough();
    resourceService.getAll().subscribe(resources => {
      expect(resources).toEqual(list);
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe(url);
    });
  });

  it('should handle error while getting all resources', async () => {
    const url = 'mock-resource';
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
    try {
      await lastValueFrom(resourceService.getAll().pipe(
        catchError((error) => {
          expect(error).toEqual(new Error(errorResponse.message));
          return throwError(() => error);
        })
      ));
      fail('getList should have failed with 400 error');
    } catch (error) {
      expect(error).toEqual(new Error(errorResponse.message));
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe(url);
    }
  });

  describe('get', () => {
    const resourceId = 1;
    const url = 'mock-resource';
  
    it('should get a single resource by ID', () => {
      const resource = { id: resourceId };
      httpClientSpy.get.and.returnValue(of(resource));
      spyOn(resourceService, 'fromServerModel').and.callThrough();
  
      resourceService.get(resourceId).subscribe((result) => {
        expect(result).toEqual(resource);
        expect(httpClientSpy.get.calls.count()).toBe(1);
        expect(httpClientSpy.get.calls.first().args[0]).toBe(`/${url}/${resourceId}`);
        expect(resourceService.fromServerModel).toHaveBeenCalledWith(resource);
      });
    });
  
    it('should handle error while getting a single resource by ID', async () => {
      const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
      httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
      try {
        await lastValueFrom(resourceService.get(resourceId).pipe(
          catchError((error) => {
            expect(error).toEqual(new Error(errorResponse.message));
            return throwError(() => error);
          })
        ));
        fail('get should have failed with 400 error');
      } catch (error) {
        expect(error).toEqual(new Error(errorResponse.message));
        expect(httpClientSpy.get.calls.count()).toBe(1);
        expect(httpClientSpy.get.calls.first().args[0]).toBe(`/${url}/${resourceId}`);
      }
    });
  });
  
  it('should add a new resource', () => {
    const url = 'mock-resource';
    const resource = { name: 'Test Resource' };
    httpClientSpy.post.and.returnValue(of(resource));
    spyOn(resourceService, 'toServerModel').and.callThrough();
    resourceService.add(resource).subscribe((result) => {
      expect(result).toEqual(resource);
      expect(httpClientSpy.post.calls.count()).toBe(1);
      expect(httpClientSpy.post.calls.first().args[0]).toBe(`/${url}`);
      expect(resourceService.toServerModel).toHaveBeenCalledWith(resource);
    });
  });
  
  it('should handle error while adding a new resource', async () => {
    const url = 'mock-resource';
    const resource = { name: 'Test Resource' };
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    httpClientSpy.post.and.returnValue(throwError(() => errorResponse));
    spyOn(resourceService, 'toServerModel').and.callThrough();
    try {
      await lastValueFrom(resourceService.add(resource).pipe(
        catchError((error) => {
          expect(error).toEqual(new Error(errorResponse.message));
          return throwError(() => error);
        })
      ));
      fail('add should have failed with 400 error');
    } catch (error) {
      expect(error).toEqual(new Error(errorResponse.message));
      expect(httpClientSpy.post.calls.count()).toBe(1);
      expect(httpClientSpy.post.calls.first().args[0]).toBe(`/${url}`);
      expect(resourceService.toServerModel).toHaveBeenCalledWith(resource);
    }
  });
  
  it('should delete a resource by ID', () => {
    const resourceId = '1';
    const url = 'mock-resource';
    httpClientSpy.delete.and.returnValue(of(null));
    resourceService.delete(resourceId).subscribe((result) => {
      expect(result).toBe(null);
      expect(httpClientSpy.delete.calls.count()).toBe(1);
      expect(httpClientSpy.delete.calls.first().args[0]).toBe(`/${url}/${resourceId}`);
    });
  });
  
  it('should handle error while deleting a resource by ID', async () => {
    const resourceId = '1';
    const url = 'mock-resource';
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    httpClientSpy.delete.and.returnValue(throwError(() => errorResponse));
    try {
      await lastValueFrom(resourceService.delete(resourceId).pipe(
        catchError((error) => {
          expect(error).toEqual(new Error(errorResponse.message));
          return throwError(() => error);
        })
      ));
      fail('delete should have failed with 400 error');
    } catch (error) {
      expect(error).toEqual(new Error(errorResponse.message));
      expect(httpClientSpy.delete.calls.count()).toBe(1);
      expect(httpClientSpy.delete.calls.first().args[0]).toBe(`/${url}/${resourceId}`);
    }
  });
  
  it('should update a resource', () => {
    const resourceId = '1';
    const url = 'mock-resource';
    const updatedResource = { id: resourceId, name: 'Updated Resource' };
    httpClientSpy.put.and.returnValue(of(updatedResource));
    resourceService.update(updatedResource, resourceId).subscribe((result) => {
      expect(result).toEqual(updatedResource);
      expect(httpClientSpy.put.calls.count()).toBe(1);
      expect(httpClientSpy.put.calls.first().args[0]).toBe(`/${url}/${resourceId}`);
      expect(httpClientSpy.put.calls.first().args[1]).toEqual(updatedResource);
    });
  });
  
  it('should handle error while updating a resource', async () => {
    const resourceId = '1';
    const url = 'mock-resource';
    const updatedResource = { id: resourceId, name: 'Updated Resource' };
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    httpClientSpy.put.and.returnValue(throwError(() => errorResponse));
    try {
      await lastValueFrom(resourceService.update(updatedResource, resourceId).pipe(
        catchError((error) => {
          expect(error).toEqual(new Error(errorResponse.message));
          return throwError(() => error);
        })
      ));
      fail('update should have failed with 400 error');
    } catch (error) {
      expect(error).toEqual(new Error(errorResponse.message));
      expect(httpClientSpy.put.calls.count()).toBe(1);
      expect(httpClientSpy.put.calls.first().args[0]).toBe(`/${url}/${resourceId}`);
      expect(httpClientSpy.put.calls.first().args[1]).toEqual(updatedResource);
    }
  });
  
});



export class TestType {

}
