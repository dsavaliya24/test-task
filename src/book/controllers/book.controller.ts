import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Book } from '../models/book.model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BookService } from '../services/book.service';

@Controller('/api/v1/books')
export class BookController {
  constructor(private readonly BookService: BookService) {}

  @Post('/create')
  async createBook(@Res() response, @Body() book: Book) {
    if (!book.title || !book?.ISBN || book?.title == '' || book?.ISBN == '')
      return response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'title and ISBN are required',
      });

    const bookExist = await this.BookService.checkExist(book);
    if (bookExist)
      return response.status(HttpStatus.CONFLICT).json({
        success: false,
        message: 'Book already exists',
      });

    const newBook = await this.BookService.createBook(book);
    return response.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Book created successfully',
      payload: newBook,
    });
  }

  @Get('/fetch-all')
  async fetchAll(@Res() response) {
    const books = await this.BookService.findAll();
    return response.status(HttpStatus.OK).json({
      success: true,
      message: 'Book fetched successfully',
      payload: books,
    });
  }

  @Get('/fetch/:id')
  async findById(@Res() response, @Param('id') id) {
    if (!id || id === '')
      return response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'id is required',
      });

    const book = await this.BookService.findOne(id);

    if (!book)
      return response.status(HttpStatus.OK).json({
        success: true,
        message: 'Book fetched successfully',
        payload: {},
      });

    return response.status(HttpStatus.OK).json({
      success: true,
      message: 'Book fetched successfully',
      payload: book,
    });
  }

  @Put('/update/:id')
  async updateBook(@Res() response, @Param('id') id, @Body() book: Book) {
    if (!id)
      return response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'id is required',
      });

    let updateBook;
    if (book?.title) updateBook = await this.BookService.updateBook(id, book);

    if (updateBook === 'Faild to update book')
      return response.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Faild to update book',
      });

    return response.status(HttpStatus.OK).json({
      success: true,
      message: 'Book updated successfully',
    });
  }

  @Delete('/delete/:id')
  async deleteBook(@Res() response, @Param('id') id) {
    if (!id || id === '')
      return response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'id is required',
      });

    const updateBook = await this.BookService.deleteBook(id);

    if (updateBook === 'Faild to delete book')
      return response.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Faild to delete book',
      });

    return response.status(HttpStatus.OK).json({
      success: true,
      message: 'Book deleted successfully',
    });
  }
}
