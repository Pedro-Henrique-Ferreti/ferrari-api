import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Auth = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    if (field) {
      return (request.auth[field]) ? request.auth[field] : null
    }
    else {
      return request.auth;
    }
    
  },
);