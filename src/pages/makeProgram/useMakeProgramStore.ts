import { create } from "zustand";
import { ExampleSaveRequest } from "@core/services/example/ExampleRepositoryInterface";
import { ExampleService } from "services";
import { setMetaDataByPath } from "@core/stores/usePageTabStore";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { PageStoreActions, StoreActions } from "@core/stores/types";
import { pageStoreActions } from "@core/stores/pageStoreActions";
import pick from "lodash/pick";
import { convertDateToString } from "@core/utils/object";
import { ProgramFn } from "@types";
import { ROUTES } from "../../router";

interface SaveRequest extends ExampleSaveRequest {}

interface MetaData {
  programFn?: ProgramFn;
  saveRequestValue: SaveRequest;
}

interface States extends MetaData {
  routePath: string; // initialized Store;
  saveSpinning: boolean;
}

interface Actions extends PageStoreActions<States> {
  setSaveRequestValue: (exampleSaveRequestValue: SaveRequest) => void;
  setSaveSpinning: (exampleSaveSpinning: boolean) => void;
  callSaveApi: (request?: SaveRequest) => Promise<void>;
}

// create states
const createState: States = {
  routePath: ROUTES.MAKE_PROGRAM.path,
  saveRequestValue: {},
  saveSpinning: false,
};

// create actions
const createActions: StoreActions<States & Actions, Actions> = (set, get) => ({
  onMountApp: async () => {},
  setSaveRequestValue: (exampleSaveRequestValue) => {
    set({ saveRequestValue: exampleSaveRequestValue });
  },
  setSaveSpinning: (exampleSaveSpinning) => set({ saveSpinning: exampleSaveSpinning }),
  callSaveApi: async (request) => {
    if (get().saveSpinning) return;
    set({ saveSpinning: true });

    try {
      const apiParam = request ?? get().saveRequestValue;
      if (!apiParam) return;
      apiParam.__status__ = "C";

      const response = await ExampleService.save(convertDateToString(apiParam));

      console.log(response);
    } finally {
      set({ saveSpinning: false });
    }
  },
  syncMetadata: (metaData) => {
    const metaDataKeys: (keyof MetaData)[] = ["programFn", "saveRequestValue"];
    set(pick(metaData ?? createState, metaDataKeys));
  },

  ...pageStoreActions(set, get, { createState }),
});

// ---------------- exports
export interface makeProgramStore extends States, Actions, PageStoreActions<States> {}

export const useMakeProgramStore = create(
  subscribeWithSelector<makeProgramStore>((set, get) => ({
    ...createState,
    ...createActions(set, get),
  })),
);

useMakeProgramStore.subscribe(
  (s) => [s.programFn, s.saveRequestValue],
  ([programFn, saveRequestValue]) => {
    setMetaDataByPath<MetaData>(createState.routePath, {
      programFn,
      saveRequestValue: saveRequestValue,
    });
  },
  { equalityFn: shallow },
);
