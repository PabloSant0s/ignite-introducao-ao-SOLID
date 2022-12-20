import { Request, Response } from "express";
import { User } from "modules/users/model/User";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;
      let users: User[] = [];
      if (typeof user_id === "string") {
        users = this.listAllUsersUseCase.execute({ user_id });
      }
      return response.status(200).json(users);
    } catch (error: Error | any) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
      return response.status(500).send();
    }
  }
}

export { ListAllUsersController };
