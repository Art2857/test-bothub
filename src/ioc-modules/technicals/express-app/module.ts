import depfy from "depfy";
import express from "express";
import { ZodError } from "zod";

import * as LibsExpress from "#libs/express";
import * as LibsExceptions from "#libs/exceptions";
import * as IocModuleBooks from "#ioc-modules/books";
import * as IocModuleAuth from "#ioc-modules/auth";
import * as IocModuleAuthMiddlewares from "#ioc-modules/auth-middlewares";
import * as IocModuleUsers from "#ioc-modules/users";

export default depfy.injectable({
  dependencies: {
    auth: IocModuleAuth.injector,
    authMiddleware: IocModuleAuthMiddlewares.injector,
    books: IocModuleBooks.injector,
    users: IocModuleUsers.injector,
  },
  factory: async ({ dependencies }) => {
    const { auth, books, users, authMiddleware } = dependencies;

    const app = express();

    const middlewares: LibsExpress.ExpressMiddlewareContract<void>[] = [
      authMiddleware.auth,
    ];

    app.use(express.json());

    for (const middleware of middlewares) {
      app.use(middleware.middleware());
    }

    const routes: LibsExpress.ExpressAppRouter[] = [
      auth.router,
      books.router,
      users.router,
    ];

    for (const [route, router] of routes) {
      app.use(route, router);
    }

    app.use(
      (
        error: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
      ) => {
        if (error instanceof ZodError) {
          res.status(400).json({ error: "Validation error", payload: error });
          return;
        }

        if (error instanceof LibsExceptions.UnauthorizedException) {
          res.status(401).json({ error: "Unauthorized" });
          return;
        }

        if (error instanceof LibsExceptions.HttpException) {
          res.status(error.status).json({ error: error.message });
          return;
        }

        console.debug(error.message);
        console.error(error.stack);
        res.status(500).json({ error: "Internal Server Error" });
      }
    );

    return app;
  },
});
