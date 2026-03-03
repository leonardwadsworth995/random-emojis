import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(index?: number): string {
    const emojis = this.getEmojis();
    const randomIndex = typeof index === 'number' ? index : Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  }

  getEmojis() {
    return [
      '😀',
      '😂',
      '😍',
      '🤔',
      '🥳',
      '😎',
      '😭',
      '🤩',
      '🥳',
      '😎',
      '😭',
      '🤩',
    ];
  }
}
