import { PrismaClient } from "@prisma/client";

import { PrismaMapPubError } from "#libs/prisma";

import {
  BooksCRUDServiceContractCreateBook,
  BooksCRUDServiceContractUpdateBook,
  BooksCRUDServiceContract,
  BooksCRUDServiceContractEntityDto,
} from "./types";

export class BooksCRUDService implements BooksCRUDServiceContract {
  public constructor(private readonly prisma: PrismaClient) {}

  public async create(
    props: BooksCRUDServiceContractCreateBook["RequestDto"]
  ): Promise<BooksCRUDServiceContractCreateBook["ResponseDto"]> {
    const book = await this.prisma.book.create({
      data: {
        title: props.title,
        author: props.author,
        genres: props.genres,
        publicationDate: props.publicationDate,
      },
    });
    return { book };
  }

  public async findAll(): Promise<{
    books: BooksCRUDServiceContractEntityDto[];
  }> {
    const books = await this.prisma.book.findMany();
    return { books };
  }

  @PrismaMapPubError
  public async findById(props: {
    id: string;
  }): Promise<{ book: BooksCRUDServiceContractEntityDto }> {
    const book = await this.prisma.book.findFirstOrThrow({
      where: { id: props.id },
    });

    return { book };
  }

  @PrismaMapPubError
  public async update(
    props: BooksCRUDServiceContractUpdateBook["RequestDto"]
  ): Promise<BooksCRUDServiceContractUpdateBook["ResponseDto"]> {
    const book = await this.prisma.book.update({
      where: { id: props.id },
      data: {
        title: props.title,
        author: props.author,
        genres: props.genres,
        publicationDate: props.publicationDate,
      },
    });
    return { book };
  }

  @PrismaMapPubError
  public async delete(props: { id: string }): Promise<void> {
    await this.prisma.book.delete({ where: { id: props.id } });
  }
}
