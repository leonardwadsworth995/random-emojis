import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmojiValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return
    }
    if (isNaN(value)) {
      throw new BadRequestException(`Validation failed: ${value} is not a number`);
    }
    if (value < 0 || value > 11) {
      throw new BadRequestException(`Validation failed: ${value} is out of range`);
    }
    console.log(`[My EmojiValidationPipe] Validation passed: ${value}`);
    return Number(value);
  }
}
