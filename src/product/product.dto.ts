import { IsNumber, IsString } from 'class-validator';
import {
  CreateProductRequest,
  DeleteProductRequest,
  EditProductRequest,
  ListMerchantProductRequest,
  ProductDetailRequest,
  SearchProductRequest,
} from './product.pb';

export class CreateProductDto implements CreateProductRequest {
  @IsNumber()
  public readonly merchantId: number;

  @IsString()
  public readonly name: string;

  @IsNumber()
  public readonly stock: number;

  @IsNumber()
  public readonly price: number;

  @IsString()
  public readonly imageUrl: string;

  @IsString()
  public readonly description: string;
}

export class ListMerchantProductDto implements ListMerchantProductRequest {
  @IsNumber()
  public readonly id: number;
}

export class ProductDetailtDto implements ProductDetailRequest {
  @IsNumber()
  public readonly id: number;
}

export class EditProductDto implements EditProductRequest {
  @IsNumber()
  public readonly id: number;

  @IsString()
  public readonly name: string;

  @IsNumber()
  public readonly stock: number;

  @IsNumber()
  public readonly price: number;

  @IsString()
  public readonly imageUrl: string;

  @IsString()
  public readonly description: string;
}

export class DeleteProductDto implements DeleteProductRequest {
  @IsNumber()
  public readonly id: number;
}

export class SearchProductDto implements SearchProductRequest {
  @IsString()
  public readonly name: string;
}
