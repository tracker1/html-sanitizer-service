import {
  Application,
  Context,
  Middleware,
  Router,
} from "https://deno.land/x/oak@v10.1.0/mod.ts";

export interface ApplicationState {}
export interface State extends ApplicationState {}
export type { Middleware };
export { Application, Context, Router };
