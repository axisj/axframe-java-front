import { ProgramConfig } from "@core/scripts/makeProgram/@types";

const programConfig: ProgramConfig = {
  pagesDir: "./src/pages",
  templateDir: "./src/@core/pages",
  programTypeFile: "./src/router/@programTypes.ts",
  pageRouteFile: "./src/router/PageRoute.tsx",
  programs: [
    {
      code: "DEMO_USER_LIST",
      name: ["DEMO", "userList"],
      type: "LIST",
      url: "/demo/user/list",
    },
    {
      code: "DEMO_USER_LIST_FORM",
      name: ["DEMO", "userListForm"],
      type: "LIST_WITH_FORM",
      url: "/demo/user/list-form",
    },
  ],
};

export default programConfig;
