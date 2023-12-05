import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../models/book.model';
import { Op } from 'sequelize';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.findAll({
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async createBook(book: Book): Promise<Book> {
    return this.bookModel.create(book);
  }

  async checkExist(book: Book): Promise<Book> {
    return await this.bookModel.findOne({
      where: {
        [Op.or]: [
          {
            title: book.title,
          },
          {
            ISBN: book.ISBN,
          },
        ],
        isActive: true,
      },
    });
  }

  async updateBook(id: string, book: Book) {
    const updateBook = await this.bookModel.update(
      { title: book?.title },
      {
        where: {
          id,
        },
      },
    );

    if (updateBook[0] <= 0) return 'Faild to update book';
    return updateBook;
  }

  async deleteBook(id: string) {
    const deleteBook = await this.bookModel.update(
      { isActive: false },
      {
        where: {
          id,
        },
      },
    );

    if (deleteBook[0] <= 0) return 'Faild to delete book';
    return deleteBook;
  }
}
