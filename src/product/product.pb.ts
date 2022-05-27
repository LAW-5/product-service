/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'product';

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  imageUrl: string;
  description: string;
}

export interface CreateProductRequest {
  name: string;
  stock: number;
  price: number;
  imageUrl: string;
  description: string;
}

export interface CreateProductResponse {
  status: number;
  error: string[];
}

export interface GetProductRequest {
  id: number;
}

export interface GetProductResponse {
  data: Product;
  status: number;
  error: string[];
}

export interface ListProductRequest {
  merchantId: number;
}

export interface ListProductResponse {
  data: Product[];
  status: number;
  error: string[];
}

export interface UpdateProductRequest {
  id: number;
  name: string;
  stock: number;
  price: number;
  imageUrl: string;
  description: string;
}

export interface UpdateProductResponse {
  status: number;
  error: string[];
}

export interface DeleteProductRequest {
  id: number;
}

export interface DeleteProductResponse {
  status: number;
  error: string[];
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  createProduct(request: CreateProductRequest): Observable<CreateProductResponse>;

  listProduct(request: ListProductRequest): Observable<ListProductResponse>;

  getProduct(request: GetProductRequest): Observable<GetProductResponse>;

  updateProduct(request: UpdateProductRequest): Observable<UpdateProductResponse>;

  deleteProduct(request: DeleteProductRequest): Observable<DeleteProductResponse>;
}

export interface ProductServiceController {
  createProduct(
    request: CreateProductRequest,
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;

  listProduct(
    request: ListProductRequest,
  ):
    | Promise<ListProductResponse>
    | Observable<ListProductResponse>
    | ListProductResponse;

  getProduct(
    request: GetProductRequest,
  ):
    | Promise<GetProductResponse>
    | Observable<GetProductResponse>
    | GetProductResponse;

  updateProduct(
    request: UpdateProductRequest,
  ):
    | Promise<UpdateProductResponse>
    | Observable<UpdateProductResponse>
    | UpdateProductResponse;

  deleteProduct(
    request: DeleteProductRequest,
  ):
    | Promise<DeleteProductResponse>
    | Observable<DeleteProductResponse>
    | DeleteProductResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createProduct',
      'listProduct',
      'getProduct',
      'updateProduct',
      'deleteProduct',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
