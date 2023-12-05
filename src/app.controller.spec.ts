import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Welcome to the books backend APIs!"', () => {
      expect(appController.getHello()).toStrictEqual({
        success: true,
        status: 200,
        message: 'Welcome to the books backend APIs!',
      });
    });
  });
});
