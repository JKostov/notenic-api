import { ArrayMaxSize, IsArray, IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class SaveCollaborationStateDto {
  @IsString()
  id: string;

  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  markdown: string;

  @IsString()
  @IsOptional()
  image: string;

  // @IsBoolean()
  // public: boolean;

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(5)
  tags: string[];
}
