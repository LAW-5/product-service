import { IsNumber, IsString } from 'class-validator';
import {
  CreateProductRequest,
  DeleteProductRequest,
  GetProductRequest,
  ListProductRequest,
  UpdateProductRequest,
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

export class ListProductDto implements ListProductRequest {
  @IsNumber()
  public readonly merchantId: number;
}

export class GetProductDto implements GetProductRequest {
  @IsNumber()
  public readonly id: number;
}

export class UpdateProductDto implements UpdateProductRequest {
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
