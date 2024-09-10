import express from "express";

import { ExpressMapPubError } from "#libs/express";

import * as Schemas from "./resource.controller.express.zod";
import {
  BooksCRUDServiceContract,
  BooksCRUDServiceContractEntityDto,
} from "./types";

export class BooksCRUDController {
  public constructor(private readonly crudService: BooksCRUDServiceContract) {}

  @ExpressMapPubError
  public async create(
    req: express.Request,
    _res: express.Response,
    _next: express.NextFunction
  ): Promise<BooksCRUDServiceContractEntityDto> {
    const bookBody = Schemas.createSchema.parse(req.body);
    const { book } = await this.crudService.create(bookBody);
    return book;
  }

  @ExpressMapPubError
  public async findAll(
    _req: express.Request,
    _res: express.Response,
    _next: express.NextFunction
  ): Promise<BooksCRUDServiceContractEntityDto[]> {
    const { books } = await this.crudService.findAll();
    return books;
  }

  @ExpressMapPubError
  public async findById(
    req: express.Request,
    _res: express.Response,
    _next: express.NextFunction
  ): Promise<BooksCRUDServiceContractEntityDto> {
    const { id } = Schemas.findByIdSchema.parse(req.params);
    const { book } = await this.crudService.findById({ id });
    return book;
  }

  @ExpressMapPubError
  public async update(
    req: express.Request,
    _res: express.Response,
    _next: express.NextFunction
  ): Promise<BooksCRUDServiceContractEntityDto> {
    const bookBody = Schemas.updateSchema.parse({
      ...req.params,
      ...req.body,
    });
    const { book } = await this.crudService.update(bookBody);
    return book;
  }

  @ExpressMapPubError
  public async delete(
    req: express.Request,
    _res: express.Response,
    _next: express.NextFunction
  ): Promise<void> {
    const { id } = Schemas.deleteSchema.parse(req.params);
    await this.crudService.delete({ id });
  }
}
