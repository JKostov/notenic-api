import { IsArray, IsBoolean, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  markdown: string;

  @IsString()
  image: string;

  @IsBoolean()
  public: boolean;

  @IsArray()
  tags: string[];
}
