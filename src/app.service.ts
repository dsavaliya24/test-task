import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { success: boolean; status: number; message: string } {
    return {
      success: true,
      status: 200,
      message: 'Welcome to the books backend APIs!',
    };
  }
}
