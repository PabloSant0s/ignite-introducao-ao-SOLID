import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, email } = request.body;
      const user = this.createUserUseCase.execute({ name, email });
      return response.status(201).json(user);
    } catch (error: Error | any) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
      return response.status(500).send();
    }
  }
}

export { CreateUserController };
