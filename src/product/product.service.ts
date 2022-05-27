import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
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

  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger;

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

    this.logger.log('info', `create product ${name}`);

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

    this.logger.log(
      'info',
      `listing all product found ${response.data.length} row`,
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

    this.logger.log('info', `find product for given id: ${id}`);

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

    this.logger.log('info', `update product for given id: ${id}`);

    return { status: HttpStatus.OK, error: null };
  }

  public async deleteProduct({
    id,
  }: DeleteProductDto): Promise<DeleteProductResponse> {
    await this.repository.delete({ id: id });

    this.logger.log('info', `delete product for given id: ${id}`);
    return { status: HttpStatus.OK, error: null };
  }
}
