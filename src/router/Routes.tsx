import React from "react";
import { getFlattedRoutes } from "@core/utils/store/getFlattedRoutes";
import { PROGRAM_TYPES } from "./@programTypes";
import { example_router, getRoutes } from "../@core/router/exampleRouter";

export interface RawRoute {
  key?: string;
  path: string;
  program_type?: PROGRAM_TYPES;
  icon?: React.ReactNode;
  children?: RawRoutes;
  hideTab?: boolean;
}

export type RawRoutes = Record<string, RawRoute>;

const routes = {
  SIGN_IN: {
    path: "sign-in",
    hideTab: true,
  },
  HOME: {
    path: "",
    hideTab: true,
  },
  MAKE_PROGRAM: {
    program_type: PROGRAM_TYPES.MAKE_PROGRAM,
    path: "/make-program",
  },
  /* ##INSERT_ROUTE_POSITION## */
};

routes["EXAMPLES"] = {
  path: "examples",
  children: example_router,
};

export const ROUTES = getRoutes(routes, "/") as typeof routes;
export const ROUTES_LIST: RawRoute[] = getFlattedRoutes(ROUTES);
