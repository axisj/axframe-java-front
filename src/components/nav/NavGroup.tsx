import { css } from "@emotion/react";
import React from "react";
import styled from "@emotion/styled";
import NavUserMenu from "./NavUserMenu";
import { SMixinFlexColumn } from "@core/styles/emotion";
import { MenuItem } from "router";
import { useAppStore } from "stores";
import { User } from "services";

interface StyleProps {
  sideMenuOpened?: boolean;
}

interface Props extends StyleProps {
  me?: User;
  menus?: MenuItem[];
  openedMenuUuids?: string[];
  selectedMenuUuid?: string;
}

function NavGroup(props: Props) {
  const sideMenuOpened = useAppStore((s) => s.sideMenuOpened);

  return (
    <Container sideMenuOpened={sideMenuOpened}>
      <NavGroupContainer sideMenuOpened={sideMenuOpened}>
        <NavContent sideMenuOpened={sideMenuOpened}>
          <NavUserMenu {...props} />
        </NavContent>
        {/*<NavFooter />*/}
      </NavGroupContainer>
    </Container>
  );
}

const Container = styled.div<StyleProps>`
  ${SMixinFlexColumn("stretch", "stretch")};
  ${({ sideMenuOpened }) => {
    if (!sideMenuOpened) {
      return css`
        width: 64px;
      `;
    }
  }}
`;

const NavGroupContainer = styled.div<StyleProps>`
  flex: 1;
  overflow: hidden;
  ${SMixinFlexColumn("stretch", "stretch")};
  background: ${(p) => p.theme.header_background};
  border-radius: 8px;
  ${({ theme }) => {
    if (theme.themeType === "DARK") {
      return css`
        border: 1px solid ${theme.border_color_base};
      `;
    }
    return css`
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);
    `;
  }}
`;
const NavContent = styled.div<StyleProps>`
  flex: 1;
  overflow-x: hidden;
  ${SMixinFlexColumn("stretch", "stretch")};
  padding: 4px;

  ${({ sideMenuOpened, theme }) => {
    if (sideMenuOpened) {
      return css`
        width: ${theme.side_menu_open_width - 32}px;
      `;
    }
    return css`
      width: 64px;
    `;
  }}
`;

export default NavGroup;
