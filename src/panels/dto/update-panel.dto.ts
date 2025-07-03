import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class UpdateLocationDto {
  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  lat?: string;

  @IsOptional()
  @IsString()
  long?: string;
}

export class UpdatePanelDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  online?: boolean;

  @IsOptional()
  groupId?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocationDto)
  location?: UpdateLocationDto;
}
