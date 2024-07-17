import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/BaseService';

// export class ApiFeeSettingsService extends BaseService {
//   constructor(
//     @InjectRepository(ApiFeeSetting)
//     private readonly apiFeeSettingsService:Repository<ApiFeeSetting>
//   ){
//     super(apiFeeSettingsService)
//   }

@Injectable()
export class ProductService extends BaseService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository)
  }

  /**
   * this is function is used to create Product in Product Entity.
   * @param createProductDto this will type of createProductDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of product
   */
  //    name, description, price, image_url

  async createProduct(res, createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.image_url = createProductDto.image_url;

    return await this.creates(res, product, "Product created successful");
  }

  /**
   * this function is used to get all the product's list
   * @returns promise of array of products
   */
  async findAllProduct(res,page,per_page) {
    return await this.paginates(res, page, per_page, "Product get successful")
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of product.
   * @returns promise of product
   */
  async viewProduct(res, id: number): Promise<Product> {
    return await this.findOnes(res, { where: { id } }, "Product get successful")
  }

  /**
   * this function is used to updated specific product whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of product.
   * @param updateProductDto this is partial type of createProductDto.
   * @returns promise of udpate product
   */
  async updateProduct(res, id: number, updateProductDto: UpdateProductDto): Promise<Product> {

    const product: Product = new Product();
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.image_url = updateProductDto.image_url;
    product.id = id;

    return await this.updates(res, id, product, "Product update successful")
  }

  /**
   * this function is used to remove or delete product from database.
   * @param id is the type of number, which represent id of product
   * @returns nuber of rows deleted or affected
   */
  async removeProduct(res, id: number) {
    return await this.removes(res, id, "Product Deleted")
  }
}



