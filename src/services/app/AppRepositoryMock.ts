import {
  AppRepositoryInterface,
  GetAppMenuRequest,
  GetAppMenuResponse,
  GetProgramAuthorityRequest,
  GetProgramAuthorityResponse,
} from "./AppRepositoryInterface";
import { delay } from "@core/utils/thread/timing";
import { getAppMenuMockData } from "services/serviceMockUpData";

export class AppRepositoryMock extends AppRepositoryInterface {
  async getAppMenu(params: GetAppMenuRequest): Promise<GetAppMenuResponse> {
    await delay(100);

    return {
      ds: getAppMenuMockData,
    };
  }

  async getProgramAuthority(params: GetProgramAuthorityRequest): Promise<GetProgramAuthorityResponse> {
    return Promise.resolve({});
  }
}
