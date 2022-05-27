import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import {
  CreateProductDto,
  DeleteProductDto,
  ProductDetailtDto,
  ListMerchantProductDto,
  EditProductDto,
  SearchProductDto,
} from './product.dto';
import { Product } from './product.entity';
import {
  CreateProductResponse,
  DeleteProductResponse,
  EditProductResponse,
  ListProductResponse,
  ProductDetailResponse,
  SearchProductResponse,
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

  public async listMerchantProduct({
    id,
  }: ListMerchantProductDto): Promise<ListProductResponse> {
    const products: Product[] = await this.repository.find({
      where: { merchantId: id },
    });

    const response: ListProductResponse = {
      data: [],
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

  public async listProduct(): Promise<ListProductResponse> {
    const products: Product[] = await this.repository.find();

    const response: ListProductResponse = {
      data: [],
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

  public async productDetail({
    id,
  }: ProductDetailtDto): Promise<ProductDetailResponse> {
    const product: Product = await this.repository.findOne({
      where: { id: id },
    });

    const response: ProductDetailResponse = {
      id: product.id,
      name: product.name,
      stock: product.stock,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description,
      error: null,
      merhcantId: product.merchantId,
    };

    this.logger.log('info', `find product for given id: ${id}`);

    return response;
  }

  public async editProduct({
    id,
    name,
    stock,
    price,
    imageUrl,
    description,
  }: EditProductDto): Promise<EditProductResponse> {
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

  public async searchProduct({
    name,
  }: SearchProductDto): Promise<SearchProductResponse> {
    const products: Product[] = await this.repository
      .createQueryBuilder('product')
      .where('product.name like :name', { name: `%${name}}%` })
      .getMany();

    const response: SearchProductResponse = {
      data: [],
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

    this.logger.log('info', `search product found ${response.data.length} row`);

    return response;
  }
}
