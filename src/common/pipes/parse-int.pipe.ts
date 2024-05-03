import { BadRequestException, PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

// Pipe to transform string inputs into integers.
@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  // Transform method to convert the string input to an integer.
  async transform(value: string, _metadata: ArgumentMetadata) {
    // Convert the string value to an integer.
    const val = parseInt(value, 10)

    // Check if the conversion resulted in NaN (Not-a-Number).
    if (isNaN(val)) {
      // If conversion fails, throw a BadRequestException.
      throw new BadRequestException('Validation failed')
    }

    // Return the converted integer value.
    return val
  }
}
