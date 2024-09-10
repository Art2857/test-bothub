export type BooksCRUDServiceContractEntityDto = {
  id: string;
  title: string;
  author: string;
  genres: string[];
  publicationDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type BooksCRUDServiceContractCreateBook = {
  RequestDto: {
    title: string;
    author: string;
    genres: string[];
    publicationDate: Date;
  };
  ResponseDto: {
    book: BooksCRUDServiceContractEntityDto;
  };
};

export type BooksCRUDServiceContractUpdateBook = {
  RequestDto: {
    id: string;
    title?: string;
    author?: string;
    genres?: string[];
    publicationDate?: Date;
  };
  ResponseDto: {
    book: BooksCRUDServiceContractEntityDto;
  };
};

export type BooksCRUDServiceContract = {
  create(
    props: BooksCRUDServiceContractCreateBook["RequestDto"]
  ): Promise<BooksCRUDServiceContractCreateBook["ResponseDto"]>;
  findAll(): Promise<{
    books: BooksCRUDServiceContractEntityDto[];
  }>;
  findById(props: { id: string }): Promise<{
    book: BooksCRUDServiceContractEntityDto;
  }>;
  update(
    props: BooksCRUDServiceContractUpdateBook["RequestDto"]
  ): Promise<BooksCRUDServiceContractUpdateBook["ResponseDto"]>;
  delete(props: { id: string }): Promise<void>;
};
