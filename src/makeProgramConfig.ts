import { ProgramConfig } from "@core/scripts/makeProgram/@types";

const programConfig: ProgramConfig = {
  pagesDir: "./src/pages",
  templateDir: "./src/@core/pages",
  programTypeFile: "./src/router/@programTypes.ts",
  pageRouteFile: "./src/router/PageRoute.tsx",
  routesFile: "./src/router/Routes.tsx",
  serviceMockUpDataFile: "./src/services/serviceMockUpData.ts",
  programs: [
    {
      code: "MAKE_PROGRAM",
      name: ["makeProgram"],
      type: "FORM",
      url: "/make-program",
    },
  ],
};

export default programConfig;
