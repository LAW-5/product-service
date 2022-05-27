import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import 'dotenv/config';
import { Product } from './product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Product],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ProductModule,
  ],
})
export class AppModule {}
