import { ArrayMaxSize, IsArray, IsBoolean, IsString, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  markdown: string;

  @IsString()
  image: string;

  @IsBoolean()
  public: boolean;

  @IsArray()
  @ArrayMaxSize(5)
  tags: string[];
}
