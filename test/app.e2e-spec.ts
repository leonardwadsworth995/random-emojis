import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: any;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appService = app.get<AppService>(AppService)
    server = app.getHttpServer();
    await app.init();
  });

  describe(`/ GET`, () => {
    it(`should return a 403 when an invalid api is used`, () => {
      return request(server)
        .get('/')
        .set('x-api-key', 'invalid')
        .expect(403);
    });

    it(`should return a 403 when no api key is used`, () => {
      return request(server)
        .get('/')
        .expect(403);
    });

    it(`should return random emoji`, () => {
      const emojis = appService.getEmojis()
      return request(server)
        .get('/')
        .set('x-api-key', 'secret')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.data).toHaveProperty('emoji');
          expect(res.body.data).toHaveProperty('browser');
          expect(emojis).toContain(res.body.data.emoji);
        });
    });
  });
});

