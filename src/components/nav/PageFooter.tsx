import React from "react";
import styled from "@emotion/styled";
import { useAppStore, useUserStore } from "stores";
import { LangSelector } from "components/LangSelector";
import { IconText } from "@core/components/common";
import { AXFIMoon, AXFISun } from "@axframe/icon";
import { IconSideBarClosed, IconSideBarOpen } from "../icons";
import { SMixinFlexRow } from "@core/styles/emotion";
import pkg from "../../../package.json";

interface Props {}

function PageFooter({}: Props) {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  const handleChangeTheme = React.useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return (
    <Container>
      <Tools>
        <LangSelector />

        <IconText
          icon={theme === "light" ? <AXFIMoon /> : <AXFISun />}
          iconSize={20}
          onClick={handleChangeTheme}
          role={"theme-selector"}
        />
      </Tools>
      <FooterLinks>
        <span role={"copyright"}>2023 AXISJ Inc.</span>
        <span role={"version"}>AXFrame {pkg.version}</span>
      </FooterLinks>
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  flex: 1;
  padding: 0 6px;
  position: relative;
  font-size: 11px;
`;

const Tools = styled.div`
  ${SMixinFlexRow("flex-start", "center")};
  flex: 1;
  gap: 10px;
  padding-left: 8px;
`;

const FooterLinks = styled.div`
  font-size: 11px;

  [role="copyright"] {
    color: ${(p) => p.theme.text_body_color};
    margin-right: 8px;
  }
  [role="version"] {
    color: ${(p) => p.theme.text_heading_color};
    margin-right: 8px;
  }

  .ant-btn.ant-btn-sm {
    font-size: 12px;
    padding: 0 8px;
    color: ${(p) => p.theme.text_color};

    &:hover {
      color: ${(p) => p.theme.link_color};
    }
  }
`;

export { PageFooter };
