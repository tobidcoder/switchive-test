import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';



@ApiTags("Product")
/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/product
 */
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create Product will be
   * POST http://localhost:3000/product
   */
  @Post()
  create(@Res({ passthrough: true }) res: Response, @Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(res, createProductDto);
  }

  /**
   * we have used get decorator to get all the product's list
   * so the API URL will be
   * GET http://localhost:3000/product
   */
  @Get()
  findAll(@Res({ passthrough: true }) res: Response, @Query('page') page: number, @Query('per_page') per_page: number,) {
    return this.productService.findAllProduct(res,page,per_page);
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:3000/product/:id
   */
  @Get(':id')
  findOne(@Res({ passthrough: true }) res: Response, @Param('id') id: string) {
    return this.productService.viewProduct(res, +id);
  }

  /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:3000/product/:id
   */
  @Patch(':id')
  update(@Res({ passthrough: true }) res: Response, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(res, +id, updateProductDto);
  }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:3000/product/:id
   */
  @Delete(':id')
  remove(@Res({ passthrough: true }) res: Response, @Param('id') id: string) {
    return this.productService.removeProduct(res, +id);
  }
}

