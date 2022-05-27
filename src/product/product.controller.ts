import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProductDto,
  DeleteProductDto,
  GetProductDto,
  ListProductDto,
  UpdateProductDto,
} from './product.dto';
import {
  CreateProductResponse,
  DeleteProductResponse,
  GetProductResponse,
  ListProductResponse,
  PRODUCT_SERVICE_NAME,
  UpdateProductResponse,
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
  private listProduct(payload: ListProductDto): Promise<ListProductResponse> {
    return this.service.listProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'GetProduct')
  private getProduct(payload: GetProductDto): Promise<GetProductResponse> {
    return this.service.getProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'DeleteProduct')
  private deleteProduct(
    payload: DeleteProductDto,
  ): Promise<DeleteProductResponse> {
    return this.service.deleteProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'UpdateProduct')
  private updateProduct(
    payload: UpdateProductDto,
  ): Promise<UpdateProductResponse> {
    return this.service.updateProduct(payload);
  }
}
