import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookController } from './controllers/book.controller';
import { Book } from './models/book.model';
import { BookService } from './services/book.service';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  providers: [BookService],
  controllers: [BookController],
})
export class LibraryModule {}
