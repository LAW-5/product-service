/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'product';

export interface Empty {}

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  imageUrl: string;
  description: string;
}

export interface ListProductResponse {
  data: Product[];
}

export interface ProductDetailRequest {
  id: number;
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  stock: number;
  price: number;
  imageUrl: string;
  description: string;
  error: string[];
  merhcantId: number;
}

export interface ListMerchantProductRequest {
  id: number;
}

export interface CreateProductRequest {
  name: string;
  stock: number;
  price: number;
  imageUrl: string;
  description: string;
  merchantId: number;
}

export interface CreateProductResponse {
  status: number;
  error: string[];
}

export interface EditProductRequest {
  id: number;
  name: string;
  stock: number;
  price: number;
  imageUrl: string;
  description: string;
}

export interface EditProductResponse {
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

export interface SearchProductRequest {
  name: string;
}

export interface SearchProductResponse {
  data: Product[];
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  listProduct(request: Empty): Observable<ListProductResponse>;

  productDetail(
    request: ProductDetailRequest,
  ): Observable<ProductDetailResponse>;

  listMerchantProduct(
    request: ListMerchantProductRequest,
  ): Observable<ListProductResponse>;

  createProduct(
    request: CreateProductRequest,
  ): Observable<CreateProductResponse>;

  editProduct(request: EditProductRequest): Observable<EditProductResponse>;

  deleteProduct(
    request: DeleteProductRequest,
  ): Observable<DeleteProductResponse>;

  searchProduct(
    request: SearchProductRequest,
  ): Observable<SearchProductResponse>;
}

export interface ProductServiceController {
  listProduct(
    request: Empty,
  ):
    | Promise<ListProductResponse>
    | Observable<ListProductResponse>
    | ListProductResponse;

  productDetail(
    request: ProductDetailRequest,
  ):
    | Promise<ProductDetailResponse>
    | Observable<ProductDetailResponse>
    | ProductDetailResponse;

  listMerchantProduct(
    request: ListMerchantProductRequest,
  ):
    | Promise<ListProductResponse>
    | Observable<ListProductResponse>
    | ListProductResponse;

  createProduct(
    request: CreateProductRequest,
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;

  editProduct(
    request: EditProductRequest,
  ):
    | Promise<EditProductResponse>
    | Observable<EditProductResponse>
    | EditProductResponse;

  deleteProduct(
    request: DeleteProductRequest,
  ):
    | Promise<DeleteProductResponse>
    | Observable<DeleteProductResponse>
    | DeleteProductResponse;

  searchProduct(
    request: SearchProductRequest,
  ):
    | Promise<SearchProductResponse>
    | Observable<SearchProductResponse>
    | SearchProductResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'listProduct',
      'productDetail',
      'listMerchantProduct',
      'createProduct',
      'editProduct',
      'deleteProduct',
      'searchProduct',
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
