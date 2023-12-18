import styled from "@emotion/styled";
import { Button, Form } from "antd";
import { Loading, ProgramTitle } from "@core/components/common";
import { useCallback } from "react";
import { AXFIRevert, AXFIWriteForm } from "@axframe/icon";
import { PageLayout } from "styles/pageStyled";
import { useI18n, useUnmountEffect } from "@core/hooks";
import { useDidMountEffect } from "@core/hooks/useDidMountEffect";
import { FormSet } from "./FormSet";
import { useMakeProgramStore } from "./useMakeProgramStore";
import { errorHandling, formErrorHandling } from "utils/errorHandling";

interface Props {}

function App({}: Props) {
  const { t } = useI18n();
  const _t = t.example;

  const init = useMakeProgramStore((s) => s.init);
  const reset = useMakeProgramStore((s) => s.reset);
  const destroy = useMakeProgramStore((s) => s.destroy);
  const saveSpinning = useMakeProgramStore((s) => s.saveSpinning);
  const callSaveApi = useMakeProgramStore((s) => s.callSaveApi);
  const programFn = useMakeProgramStore((s) => s.programFn);

  const [form] = Form.useForm();
  const handleSave = useCallback(async () => {
    try {
      await form.validateFields();
    } catch (e) {
      await formErrorHandling(form);
      return;
    }

    try {
      await callSaveApi();
      await reset();
    } catch (e) {
      await errorHandling(e);
    }
  }, [callSaveApi, form, reset]);

  useDidMountEffect(() => {
    (async () => {
      try {
        await init();
      } catch (e: any) {
        await errorHandling(e);
      }
    })();
  });

  useUnmountEffect(() => {
    destroy();
  });

  return (
    <Container>
      <Header>
        <ProgramTitle icon={<AXFIWriteForm />}>
          <Button icon={<AXFIRevert />} onClick={reset} size='small' type={"text"}>
            {t.button.reset}
          </Button>
        </ProgramTitle>
        <ButtonGroup compact>
          {programFn?.fn02 && (
            <Button type={"primary"} loading={saveSpinning} onClick={handleSave}>
              {t.button.save}
            </Button>
          )}
        </ButtonGroup>
      </Header>

      <FormSet form={form} />

      <Loading active={saveSpinning} />
    </Container>
  );
}

const Container = styled(PageLayout)``;
const Header = styled(PageLayout.Header)``;
const ButtonGroup = styled(PageLayout.ButtonGroup)``;

export default App;
