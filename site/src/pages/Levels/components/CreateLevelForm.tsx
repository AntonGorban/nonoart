import { Alert, Button, ColorPicker, Flex, Form, Input, Modal } from 'antd';
import type { AggregationColor } from 'antd/es/color-picker/color';
import React, { useCallback, useId, useMemo, useState } from 'react';

import { type ApiDictionary, type ApiError, getApiError } from '@nono-art/api';
import type { D } from '@nono-art/domain';
import { useFlag, useIsLoadingFlag } from '@nono-art/hooks';

import { GridEditor, MultilineText } from '../../../components';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export const CreateLevelForm = React.memo<Props>(({ create }) => {
  const [isOpenModal, { enable: openModal, disable: closeModal }] = useFlag(true);

  const { isLoading, enableIsLoading, disableIsLoading } = useIsLoadingFlag(false);
  const [error, setError] = useState<ApiError | null>(null);

  const [name, setName] = useState<D.Level.Name>('');
  const changeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const [description, setDescription] = useState<D.Level.Description>('');
  const changeDescription = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  const [color0, setColor0] = useState<D.Level.Color>('#FF0000');
  const changeColor0 = useCallback((value: AggregationColor) => {
    setColor0(value.toHexString());
  }, []);

  const [color1, setColor1] = useState<D.Level.Color>('#00FF00');
  const changeColor1 = useCallback((value: AggregationColor) => {
    setColor1(value.toHexString());
  }, []);

  const [color2, setColor2] = useState<D.Level.Color>('#0000FF');
  const changeColor2 = useCallback((value: AggregationColor) => {
    setColor2(value.toHexString());
  }, []);

  const colors = useMemo<D.Level.Colors>(() => [color0, color1, color2], [color0, color1, color2]);

  const [grid, setGrid] = useState<D.Level.Grid>([
    [0, 1, 2],
    [1, 2, 0],
    [2, 0, 1],
  ]);

  const clear = useCallback(() => {
    setError(null);
    setName('');
    setDescription('');
    setColor0('#FF0000');
    setColor1('#00FF00');
    setColor2('#0000FF');
    setGrid([
      [0, 1, 2],
      [1, 2, 0],
      [2, 0, 1],
    ]);
  }, []);

  const submit = useCallback(async () => {
    enableIsLoading();
    setError(null);
    try {
      await create({}, {}, { name, description, colors: [color0, color1, color2], grid });
      closeModal();
      clear();
    } catch (error) {
      setError(getApiError(error));
    } finally {
      disableIsLoading();
    }
  }, [clear, closeModal, color0, color1, color2, create, description, disableIsLoading, enableIsLoading, grid, name]);

  const htmlNameId = useId();
  const htmlDescriptionId = useId();
  const htmlColor0Id = useId();

  return (
    <>
      <Button onClick={openModal} type="primary">
        Создать
      </Button>

      <Modal
        title="Создание нового уровня"
        open={isOpenModal}
        centered
        footer={
          <Flex align="center" justify="flex-end" gap="small">
            <Button onClick={clear} loading={isLoading} block={isLoading} danger>
              Очистить
            </Button>
            <Button onClick={closeModal} loading={isLoading} block={isLoading}>
              Закрыть
            </Button>
            <Button onClick={submit} loading={isLoading} block={isLoading} type="primary">
              Создать
            </Button>
          </Flex>
        }
        width="75vw"
      >
        <Form layout="vertical">
          <Form.Item label="Наименование" htmlFor={htmlNameId}>
            <Input value={name} onChange={changeName} id={htmlNameId} placeholder="Наименование" />
          </Form.Item>

          <Form.Item label="Описание" htmlFor={htmlDescriptionId}>
            <Input.TextArea
              value={description}
              onChange={changeDescription}
              id={htmlDescriptionId}
              placeholder="Описание"
            />
          </Form.Item>

          <Form.Item label="Цвета" htmlFor={htmlColor0Id}>
            <Flex orientation="horizontal" align="center" justify="flex-start" gap="small">
              <ColorPicker
                value={color0}
                onChange={changeColor0}
                format="hex"
                size="large"
                disabledAlpha
                disabledFormat
                showText
              />

              <ColorPicker
                value={color1}
                onChange={changeColor1}
                format="hex"
                size="large"
                disabledAlpha
                disabledFormat
                showText
              />

              <ColorPicker
                value={color2}
                onChange={changeColor2}
                format="hex"
                size="large"
                disabledAlpha
                disabledFormat
                showText
              />
            </Flex>
          </Form.Item>

          <Form.Item label="Сетка">
            <GridEditor grid={grid} colors={colors} onChange={setGrid} />
          </Form.Item>
        </Form>

        {!!error && (
          <Alert title="Ошибка" description={<MultilineText>{error.message}</MultilineText>} type="error" showIcon />
        )}
      </Modal>
    </>
  );
});

/* -------------------------------------------------------------------------- */
/*                                 / COMPONENT                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  create: (...args: Parameters<ApiDictionary['level']['create']>) => ReturnType<ApiDictionary['level']['create']>;
}

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */
