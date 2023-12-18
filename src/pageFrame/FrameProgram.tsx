import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { Outlet } from "react-router-dom";
import { SMixinFlexColumn, SMixinFlexRow } from "@core/styles/emotion";
import NavGroup from "components/nav/NavGroup";
import TabGroup from "components/tabs/TabGroup";
import Logo from "components/nav/Logo";
import AppMenuBarTools from "components/nav/AppMenuBarTools";
import AppMenuBar from "components/nav/AppMenuBar";
import { usePageTabStore } from "@core/stores/usePageTabStore";
import { PageFooter } from "../components/nav/PageFooter";
import { useAppStore } from "../stores";

interface StyleProps {
  sideMenuOpened: boolean;
}

interface Props extends StyleProps {}

function FrameProgram({ sideMenuOpened }: Props) {
  const pageTabLoaded = usePageTabStore((s) => s.loaded);
  const fullScreen = useAppStore((s) => s.fullScreen);

  return (
    <PageFrameContainer>
      <PageFrameHeaderToolBar>
        <AppMenuBar />
        <AppMenuBarTools />
      </PageFrameHeaderToolBar>

      <PageFrameContent>
        <Content>
          <React.Suspense fallback={<></>}>
            <Outlet />
          </React.Suspense>
        </Content>
      </PageFrameContent>

      {!fullScreen && (
        <PageFrameFooter>
          <PageFooter />
        </PageFrameFooter>
      )}
    </PageFrameContainer>
  );
}

const PageFrameContainer = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  height: 100vh;
  width: 100vw;
  flex: 1;
  overflow: hidden;
  background: ${(p) => p.theme.body_background};
  color: ${(p) => p.theme.text_body_color};
`;
const PageFrameHeaderToolBar = styled.div`
  ${SMixinFlexRow("stretch", "stretch")};
  height: 34px;
  overflow: hidden;
  border-bottom: 1px solid ${(p) => p.theme.border_color_base};
  background: ${(p) => p.theme.axf_page_frame_header_bg};
  padding: 0 12px;
`;

const PageFrameHeader = styled.div`
  ${SMixinFlexRow("stretch", "stretch")};
  overflow: hidden;
  background-color: ${(p) => p.theme.page_background};
`;
const PageFrameFooter = styled.div`
  height: 34px;
  background: ${(p) => p.theme.axf_page_frame_footer_bg};
  border-top: 1px solid ${(p) => p.theme.border_color_base};
  padding: 0;
  ${SMixinFlexRow("space-between", "stretch")};
`;

const PageFrameNav = styled.div<StyleProps>`
  ${SMixinFlexRow("stretch", "stretch")};
  flex: none;
  position: relative;
  padding: 3px 16px 16px 16px;
  box-sizing: border-box;
  ${({ sideMenuOpened, theme }) => {
    if (sideMenuOpened) {
      return css`
        width: ${theme.side_menu_open_width}px;
      `;
    }

    return css`
      width: ${theme.side_menu_close_width}px;
    `;
  }}

  z-index: 10;
`;
const PageFrameContent = styled.div`
  flex: 1;
  ${SMixinFlexRow("stretch", "stretch")};
  overflow: hidden;
  background-color: ${(p) => p.theme.page_background};
`;
const Content = styled.div`
  flex: 1;
  overflow: auto;
  ${SMixinFlexColumn("stretch", "stretch")};
`;

export default FrameProgram;
