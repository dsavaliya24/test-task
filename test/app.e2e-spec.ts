import * as dotenv from 'dotenv';
dotenv.config();

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { assert } from 'console';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let bookId: string;

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect({
      success: true,
      status: 200,
      message: 'Welcome to the books backend APIs!',
    });
  });

  it('/books/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/books/create')
      .set('Content-Type', 'application/json')
      .send({
        title: 'The Lord of the Rings',
        ISBN: '9780007525546',
      })
      .expect(201)
      .then((response) => {
        bookId = response.body.payload.id;
        assert(response.body.success === true);
        assert(response.body.message === 'Book created successfully');
        assert(response.body.payload.id !== null);
        assert(response.body.payload.isActive === true);
        assert(response.body.payload.title === 'The Lord of the Rings');
        assert(response.body.payload.ISBN === '9780007525546');
        assert(response.body.payload.updatedAt !== null);
        assert(response.body.payload.createdAt !== null);
        assert(response.body.payload.description === null);
        assert(response.body.payload.auther === null);
        assert(response.body.payload.publishYear === null);
        assert(response.body.payload.deletedAt === null);
      });
  });

  it('/books/create (POST) - title and ISBN are required', () => {
    return request(app.getHttpServer())
      .post('/api/v1/books/create')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(400)
      .then((response) => {
        assert(response.body.success === false);
        assert(response.body.message === 'title and ISBN are required');
      });
  });

  it('/books/fetch-all (GET) - Fetch all the books', () => {
    return request(app.getHttpServer())
      .get('/api/v1/books/fetch-all')
      .expect(200)
      .then((response) => {
        assert(response.body.success === true);
        assert(response.body.message === 'Book fetched successfully');
        assert(response.body.payload.length > 0);
      });
  });

  it('/books/fetch/:id (GET) - Fetch book by id', () => {
    return request(app.getHttpServer())
      .get(`/api/v1/books/fetch/${bookId}`)
      .expect(200)
      .then((response) => {
        assert(response.body.success === true);
        assert(response.body.message === 'Book fetched successfully');
        assert(response.body.payload.id === bookId);
        assert(response.body.payload.isActive === true);
        assert(response.body.payload.title === 'The Lord of the Rings');
        assert(response.body.payload.ISBN === '9780007525546');
        assert(response.body.payload.updatedAt !== null);
        assert(response.body.payload.createdAt !== null);
        assert(response.body.payload.description === null);
        assert(response.body.payload.auther === null);
        assert(response.body.payload.publishYear === null);
        assert(response.body.payload.deletedAt === null);
      });
  });

  it('/books/update/:id (PUT) - Update book by id', () => {
    return request(app.getHttpServer())
      .put(`/api/v1/books/update/${bookId}`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'The Lord of the Rings',
        ISBN: '9780007525546',
        description: 'The Lord of the Rings is an epic high fantasy novel',
        auther: 'J. R. R. Tolkien',
        publishYear: 1954,
      })
      .expect(200)
      .then((response) => {
        assert(response.body.success === true);
        assert(response.body.message === 'Book updated successfully');
        assert(response.body.payload !== null);
      });
  });

  it('/books/update/:id (PUT) - Faild', () => {
    return request(app.getHttpServer())
      .put(`/api/v1/books/update/07e90ca2-8b3f-451d-b511-098684b58cde`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .then((response) => {
        console.log(response.body);
        assert(response.body.success === false);
        assert(response.body.message === 'Faild to update book');
      });
  });

  it('/books/delete/:id (DELETE) - Delete book by id', () => {
    return request(app.getHttpServer())
      .delete(`/api/v1/books/delete/${bookId}`)
      .expect(200)
      .then((response) => {
        assert(response.body.success === true);
        assert(response.body.message === 'Book deleted successfully');
      });
  });

  it('/books/delete/:id (DELETE) - Faild', () => {
    return request(app.getHttpServer())
      .delete(`/api/v1/books/delete/07e90ca2-8b3f-451d-b511-098684b58cde`)
      .expect(404)
      .then((response) => {
        assert(response.body.success === false);
        assert(response.body.message === 'Faild to delete book');
      });
  });
});
