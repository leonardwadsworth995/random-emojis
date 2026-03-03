import { EmojiValidationPipe } from './emoji-validation.pipe';

describe('EmojiValidationPipe', () => {
  const emojiPipe = new EmojiValidationPipe();
  it('should be defined', () => {
    expect(emojiPipe).toBeDefined();
  });

  it('should validate a valid index', () => {
    const result = emojiPipe.transform(3);
    expect(result).toBe(3);
  });

  it('should throw an error for an invalid index', () => {
    expect(() => emojiPipe.transform(-1)).toThrow('Validation failed: -1 is out of range');
    expect(() => emojiPipe.transform(12)).toThrow('Validation failed: 12 is out of range');
  });

  it('should throw an error for a non-number index', () => {
    expect(() => emojiPipe.transform('hello')).toThrow('Validation failed: hello is not a number');
  });

  it('should be a string input as number', () => {
    const result = emojiPipe.transform('3');
    expect(result).toBe(3);
    expect(typeof result).toBe('number');
  });
});
