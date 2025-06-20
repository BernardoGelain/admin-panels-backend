import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreatePanelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  groupId?: number;

  @IsNumber()
  tenantId: number;

  @IsNumber()
  locationId: number;
}
