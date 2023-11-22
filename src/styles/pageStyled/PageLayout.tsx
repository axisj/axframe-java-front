import { css } from "@emotion/react";
import React from "react";
import styled from "@emotion/styled";
import { SMixinFlexColumn, SMixinFlexRow, SMixinScrollerStyle } from "@core/styles/emotion/mixins";
import { alpha } from "../palette/colorUtil";

interface Props {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  role?: string;
  stretch?: boolean;
}

type HeaderSize = "small" | "medium" | "large";

const PageLayoutContainer = styled.div<Props>`
  position: relative;

  .datagrid-editable {
    background: ${(p) => alpha(p.theme.primary_color, 0.1)};
    user-select: none;

    input {
      user-select: all;
    }
  }

  ${({ stretch }) => {
    if (stretch) {
      return css`
        flex: 1;
        overflow: hidden;
        ${SMixinFlexColumn("stretch", "stretch")};
      `;
    }

    return css`
      ${SMixinFlexColumn("flex-start", "stretch")};
    `;
  }}
`;

const PageHeader = styled.div`
  ${SMixinFlexRow("space-between", "center", "wrap")};

  font-weight: 700;
  color: ${(p) => p.theme.text_heading_color};
  padding: 20px 16px 16px 16px;
  font-size: 20px;
  gap: 12px;
`;

const PageBody = styled.div`
  position: relative;
  flex: 1;
  ${SMixinFlexColumn("stretch", "stretch")};
  padding: 0 16px 16px 16px;
`;

const PageContentBoxHeader = styled.div<{ size?: HeaderSize }>`
  ${SMixinFlexRow("space-between", "center")};
  font-weight: 600;
  color: ${(p) => p.theme.text_heading_color};
  margin: 20px 0 10px 0;

  ${({ size = "medium" }) => {
    if (size === "small") {
      return css`
        font-size: 1em;
      `;
    }
    if (size === "medium") {
      return css`
        font-size: 1.1em;
      `;
    }
    if (size === "large") {
      return css`
        font-size: 1.4em;
      `;
    }
    return css``;
  }}
`;

const PageContentBox = styled.div<{ level?: 1 | 2 | 3 }>`
  position: relative;
  ${SMixinFlexColumn("stretch", "stretch")};

  .ant-input-group-addon {
    padding: 0 5px;

    .ant-btn.ant-btn-sm {
      padding: 0 2px;

      &:hover {
        color: ${(p) => p.theme.primary_color};
      }
    }
  }

  ${({ level = 1, theme }) => {
    if (level === 1) {
      return css`
        border: 1px solid ${theme.axf_border_color};
        background: ${theme.form_box_bg};
        box-shadow: ${theme.box_shadow_base};
        border-radius: 4px;
        padding: 20px;
      `;
    }
    if (level === 2) {
      return css`
        background: ${theme.component_sub_background};
        border: 1px solid ${theme.axf_border_color};
        border-radius: 4px;
        padding: 10px 20px;
        margin: 0 0 15px;
      `;
    }
    return css``;
  }}
`;

const PageGroupTitle = styled.div`
  margin-bottom: 5px;
  color: ${(p) => p.theme.text_heading_color};
  font-weight: bold;
  font-size: 1.1em;
`;

const ButtonGroup = styled.div<{ compact?: boolean; align?: "flex-start" | "center" | "flex-end" }>`
  ${({ align = "flex-start" }) => {
    return css`
      ${SMixinFlexRow(align, "center")};
      gap: 6px;
    `;
  }};
  ${({ compact, align }) => {
    if (!compact) {
      return css`
        margin: 15px 0;
      `;
    }
  }};
`;

const PageFrameHeader = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  line-height: 32px;
  gap: 10px;
  //margin-top: 6px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
  color: ${(p) => p.theme.text_heading_color};
`;
const PageFrameRow = styled.div<{ scroll?: boolean }>`
  position: relative;
  flex: 1;
  ${SMixinFlexRow("stretch", "stretch")};
  padding: 0;
  ${({ scroll }) => {
    if (!scroll) {
      return css`
        overflow: hidden;
      `;
    }
    return css`
      overflow: auto;
    `;
  }};
`;
const PageFrameColumn = styled.div<{ scroll?: boolean }>`
  position: relative;
  flex: 1;
  ${SMixinFlexColumn("stretch", "stretch")};
  padding: 16px;

  ${({ theme }) => {
    return css`
      ${SMixinScrollerStyle({
        track_color: theme.body_background,
        thumb_color: theme.scroll_thumb_color,
      })}
    `;
  }};
  ${({ scroll }) => {
    if (!scroll) {
      return css`
        overflow: hidden;
      `;
    }
    return css`
      overflow: auto;
    `;
  }};
`;
const PageFrameBody = styled.div`
  position: relative;
  flex: 1;
  ${SMixinFlexColumn("stretch", "stretch")};
`;
const ToolBar = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  margin-bottom: 0.7em;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h1 {
  }

  h2 {
  }

  h3 {
  }
`;
const PageSearchBar = styled.div`
  position: relative;
  padding: 0 16px;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    //background: ${(p) => p.theme.border_color_base};
    background: linear-gradient(
      90deg,
      ${(p) => alpha(p.theme.border_color_base, 0)} 0%,
      ${(p) => alpha(p.theme.border_color_base, 100)} 32px,
      ${(p) => alpha(p.theme.border_color_base, 100)} calc(100% - 32px),
      ${(p) => alpha(p.theme.border_color_base, 0)} 100%
    );
  }
`;

const PageTabBar = styled.div`
  position: relative;
  padding: 0 16px;

  .ant-tabs-top > .ant-tabs-nav {
    margin: 0;
  }
`;

export class PageLayout extends React.Component<Props> {
  public static Header = PageHeader;
  public static Body = PageBody;
  public static ContentBoxHeader = PageContentBoxHeader;
  public static ContentBox = PageContentBox;
  public static GroupTitle = PageGroupTitle;
  public static ButtonGroup = ButtonGroup;

  public static FrameHeader = PageFrameHeader;
  public static FrameBody = PageFrameBody;
  public static FrameRow = PageFrameRow;
  public static FrameColumn = PageFrameColumn;
  public static ToolBar = ToolBar;
  public static PageSearchBar = PageSearchBar;
  public static PageTabBar = PageTabBar;

  public render(): React.ReactElement {
    const { children, ...restProps } = this.props;
    return <PageLayoutContainer {...restProps}>{children}</PageLayoutContainer>;
  }
}
