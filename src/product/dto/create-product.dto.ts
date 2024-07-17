import {IsNotEmpty,IsString, MinLength, IsNumber, IsFQDN, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @IsString()
    @ApiProperty()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @MaxLength(50, { each: true, message: 'Tag is too long. Maximal length is $value characters' })
    @IsNotEmpty()
    name: string;

    @IsString()
    @ApiProperty()
    @MinLength(10, { message: 'Description must have atleast 10 characters.' })
    @MaxLength(150, { each: true, message: 'Tag is too long. Maximal length is $value characters' })
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @IsFQDN()
    @ApiProperty()
    @IsNotEmpty()
    image_url: string;

}