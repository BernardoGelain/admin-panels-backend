// create-panel.dto.ts
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  long: string;
}

export class CreatePanelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  groupId?: number;

  @IsOptional()
  @IsBoolean()
  online?: boolean;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
