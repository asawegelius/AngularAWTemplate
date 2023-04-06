
# AngularAWTemplate

AngularAWTemplate is an Angular application template that provides a starting point for building enterprise-level applications. It is designed to be scalable, maintainable, and flexible, with a focus on best practices and modular architecture.

# Table of Contents
- [AngularAWTemplate](#angularawtemplate)
- [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Technologies](#technologies)
  - [Testing](#testing)
  - [Deployment](#deployment)
  - [Core features](#core-features)
    - [QueryStringParameters](#querystringparameters)
      - [Properties](#properties)
      - [Example usage of QueryStringParameters](#example-usage-of-querystringparameters)
    - [Resource Service](#resource-service)
      - [Usage of ResourceService](#usage-of-resourceservice)
      - [Examples](#examples)
    - [Using UrlBuilder, QueryStringParameters, and ResourceService](#using-urlbuilder-querystringparameters-and-resourceservice)
      - [Example usage](#example-usage)
  - [License](#license)


## Installation
To install AngularAWTemplate, follow these steps:

1. Clone this repository to your local machine.
2. Run npm install to install dependencies.
3. Run ng serve to start the application.

## Usage
AngularAWTemplate provides a clean and organized codebase that you can use to build your own Angular applications. It includes a set of reusable components, services, and modules that can be easily customized to fit your needs.

To use AngularAWTemplate, you can start by exploring the codebase and making modifications to fit your specific requirements. You can also build your own components and services on top of the existing codebase, using the provided modules and libraries.

## Technologies
AngularAWTemplate is built with the following technologies:

- Angular
- RxJS
- NgRx
- Bootstrap
- Sass

## Testing
AngularAWTemplate includes a suite of unit tests that can be run with the following command:

- `npm run test` to run unit tests.

## Deployment
To deploy AngularAWTemplate to a production environment, follow these steps:

1. Build the application with ng build.
2. Copy the contents of the dist folder to your web server.
3. Configure your web server to serve the index.html file as the entry point.

## Core features

There are some core features in the core package.
### QueryStringParameters
The *QueryStringParameters* class is used to represent the query string parameters that can be sent in a HTTP GET request to the API endpoint. This class is used in API Services to build the URL for the HTTP request.

#### Properties

- *searchText*: string: The search text to use in the query.
- *pageNumber*: number: The page number to retrieve.
- *pageSize*: number: The number of results to retrieve per page.

#### Example usage of QueryStringParameters
```typescript
import { QueryStringParameters } from './data-service';

    // Create a new instance of the QueryStringParameters class
    const params = new QueryStringParameters();

    // Set the properties of the QueryStringParameters instance
    queryParams.pushOrReplace('searchText', 'example');
    queryParams.pushOrReplace('pageNumber', 1);
    queryParams.pushOrReplace('pageSize', 10);

    // Use the QueryStringParameters instance to build the URL for the HTTP request
    const url = `${'https://example.com/api/search'}?${params.toString()}`;

```
In the example above, we create a new instance of the *QueryStringParameters* class, set its properties to define the search parameters we want to use, and then use it to build the URL for the HTTP request.

### Resource Service
The *ResourceService* is a service that provides a generic way to interact with RESTful API endpoints. It uses the Angular HttpClient to make HTTP requests and handles errors and retries automatically.
#### Usage of ResourceService
To use the *ResourceService*, you first need to import it into your component or service:
```typescript
import { ResourceService } from './services/resource.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent implements OnInit {

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    // Call a resource method
  }

}

```
Once you have imported the *ResourceService*, you can call any of its resource methods:
```typescript
this.resourceService.get<T>(url, options?)
this.resourceService.post<T>(url, body, options?)
this.resourceService.put<T>(url, body, options?)
this.resourceService.patch<T>(url, body, options?)
this.resourceService.delete<T>(url, options?)

```
All of these methods return an *Observable* of type *T* (or any if no type is specified). They take the following arguments:

- *url*: The URL of the resource to interact with.
- *body* (optional): The request body to send with the request (only applicable for POST, PUT, and PATCH requests).
- *options* (optional): An object containing additional options for the request (e.g. headers, query parameters, etc.).

#### Examples
Here are some examples of how to use the *ResourceService* to interact with a RESTful API:
```typescript
import { ResourceService } from './services/resource.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent implements OnInit {

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    // Call a GET request
    this.resourceService.get<MyModel>('https://my-api.com/models/1').subscribe(model => {
      console.log('Model:', model);
    }, error => {
      console.error('Error:', error);
    });

    // Call a POST request
    const newModel: MyModel = {
      name: 'New Model',
      description: 'A new model'
    };
    this.resourceService.post<MyModel>('https://my-api.com/models', newModel).subscribe(model => {
      console.log('New model created:', model);
    }, error => {
      console.error('Error:', error);
    });

    // Call a PUT request
    const updatedModel: MyModel = {
      id: 1,
      name: 'Updated Model',
      description: 'An updated model'
    };
    this.resourceService.put<MyModel>('https://my-api.com/models/1', updatedModel).subscribe(model => {
      console.log('Model updated:', model);
    }, error => {
      console.error('Error:', error);
    });

    // Call a DELETE request
    this.resourceService.delete<MyModel>('https://my-api.com/models/1').subscribe(() => {
      console.log('Model deleted');
    }, error => {
      console.error('Error:', error);
    });
  }

}
```

### Using UrlBuilder, QueryStringParameters, and ResourceService<T>
To make it easier to call the API endpoints, you can use the *UrlBuilder*, *QueryStringParameters*, and *ResourceService<T>* classes provided in this template. The *UrlBuilder* class is used to build the URL for the API endpoint, while the *QueryStringParameters* class is used to specify the query string parameters for a GET request. The *ResourceService<T>* class is used to call the API endpoints and handle the HTTP response.

#### Example usage
In this example, we will create a service to retrieve a list of products from the API endpoint.

1. First, import the necessary classes and modules:
   ```typescript
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { ResourceService, UrlBuilder } from './shared';
    import { QueryStringParameters } from './data-service';
    import { Observable } from 'rxjs';
    import { Product } from './product';
   ```
2. Create a new service and extend the *ResourceService<Product>* class:
   ```typescript
    @Injectable({
    providedIn: 'root'
    })
    export class ProductService extends ResourceService<Product> {
        url:string = this.setBaseUrl();

        constructor(http: HttpClient) {
            super(http);
        }

        protected getResourceUrl(): string {
            return this.url;
        }

        setBaseUrl(): string {
            // set base url
            return this.url = this.urls?.createUrl('https://example.com/api/products');
        }
    }
   ```
   In this service, we extend the *ResourceService<Product>* class and override the *getResourceUrl()* method to return the URL for the API endpoint. We also inject the *HttpClient* module through the constructor of the *ResourceService<Product>*.
3. Create a method to retrieve a list of products:
   ```typescript
   getProducts(category: string): Observable<Product[]> {
        // Build the URL for the API endpoint
        let queryParams: QueryStringParameters = new QueryStringParameters();
        queryParams.pushOrReplace('category', category);
        this.url =  = new UrlBuilder(this.getResourceUrl())
        .withQueryParams(queryParams)
        .build();

        // Call the API endpoint and return the HTTP response
        return this.getAll();
    }
    ```
    In this method, we use the *UrlBuilder* and *QueryStringParameters* classes to build the URL for the API endpoint, and then call the getAll() method provided by the *ResourceService<Product>* class to retrieve the list of products from the API.



## License
AngularAWTemplate is licensed under the MIT License
