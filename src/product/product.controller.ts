import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProductDto,
  DeleteProductDto,
  EditProductDto,
  ListMerchantProductDto,
  ProductDetailtDto,
  SearchProductDto,
} from './product.dto';
import {
  CreateProductResponse,
  DeleteProductResponse,
  EditProductResponse,
  ListProductResponse,
  ProductDetailResponse,
  PRODUCT_SERVICE_NAME,
  SearchProductResponse,
} from './product.pb';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  @Inject(ProductService)
  private readonly service: ProductService;

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  private createProduct(
    payload: CreateProductDto,
  ): Promise<CreateProductResponse> {
    return this.service.createProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'ListProduct')
  private listProduct(): Promise<ListProductResponse> {
    return this.service.listProduct();
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'ListMerchantProduct')
  private listMerchantProduct(
    payload: ListMerchantProductDto,
  ): Promise<ListProductResponse> {
    return this.service.listMerchantProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'ProductDetail')
  private productDetail(
    payload: ProductDetailtDto,
  ): Promise<ProductDetailResponse> {
    return this.service.productDetail(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'DeleteProduct')
  private deleteProduct(
    payload: DeleteProductDto,
  ): Promise<DeleteProductResponse> {
    return this.service.deleteProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'EditProduct')
  private editProduct(payload: EditProductDto): Promise<EditProductResponse> {
    return this.service.editProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'SearchProduct')
  private searchProduct(
    payload: SearchProductDto,
  ): Promise<SearchProductResponse> {
    return this.service.searchProduct(payload);
  }
}
