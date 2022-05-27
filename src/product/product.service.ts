import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProductDto,
  DeleteProductDto,
  GetProductDto,
  ListProductDto,
  UpdateProductDto,
} from './product.dto';
import { Product } from './product.entity';
import {
  CreateProductResponse,
  DeleteProductResponse,
  GetProductResponse,
  ListProductResponse,
  UpdateProductResponse,
} from './product.pb';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly repository: Repository<Product>;

  public async createProduct({
    merchantId,
    name,
    stock,
    price,
    imageUrl,
    description,
  }: CreateProductDto): Promise<CreateProductResponse> {
    const product = new Product();
    product.merchantId = merchantId;
    product.name = name;
    product.stock = stock;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;

    await this.repository.save(product);

    return { status: HttpStatus.OK, error: null };
  }

  public async listProduct({
    merchantId,
  }: ListProductDto): Promise<ListProductResponse> {
    const products: Product[] = await this.repository.find({
      where: { merchantId: merchantId },
    });

    const response: ListProductResponse = {
      data: [],
      status: HttpStatus.OK,
      error: null,
    };

    products.forEach((x: Product) =>
      response.data.push({
        id: x.id,
        name: x.name,
        stock: x.stock,
        price: x.price,
        imageUrl: x.imageUrl,
        description: x.description,
      }),
    );

    return response;
  }

  public async getProduct({ id }: GetProductDto): Promise<GetProductResponse> {
    const product: Product = await this.repository.findOne({
      where: { id: id },
    });

    const response: GetProductResponse = {
      data: {
        id: product.id,
        name: product.name,
        stock: product.stock,
        price: product.price,
        imageUrl: product.imageUrl,
        description: product.description,
      },
      status: HttpStatus.OK,
      error: null,
    };

    return response;
  }

  public async updateProduct({
    id,
    name,
    stock,
    price,
    imageUrl,
    description,
  }: UpdateProductDto): Promise<UpdateProductResponse> {
    const product: Product = await this.repository.findOne({
      where: { id: id },
    });

    product.name = name;
    product.stock = stock;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;

    await this.repository.save(product);

    return { status: HttpStatus.OK, error: null };
  }

  public async deleteProduct({
    id,
  }: DeleteProductDto): Promise<DeleteProductResponse> {
    await this.repository.delete({ id: id });

    return { status: HttpStatus.OK, error: null };
  }
}
