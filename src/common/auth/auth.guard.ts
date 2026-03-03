import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.info('[My AuthGuard]: checking authentication...')
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    this.logger.info(`API Key: ${apiKey}`)
    if (apiKey !== 'secret') {
      this.logger.info('[My AuthGuard]: authentication failed')
      return false;
    }
    console.log('[My AuthGuard]: authentication passed')
    return true;
  }
}
