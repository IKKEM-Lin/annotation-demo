/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from "@formily/antd-v5";
import { createForm, onFormValuesChange } from "@formily/core";
import { FormProvider, createSchemaField, ISchema } from "@formily/react";
import { Card, Slider, Rate } from "antd";
import React from "react";

import type { IFormLayoutProps } from "@formily/antd-v5";

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: "normal" | "h1" | "h2" | "h3" | "p";
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === "normal" || !mode ? "div" : mode;
  return React.createElement(tagName, props, value || content);
};

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
  },
});


interface ISchemaJSON extends ISchema {
  form?: IFormLayoutProps;
  schema?: ISchema;
}

const Formily: React.FC<{
  schema: ISchemaJSON;
  onChange?: (value: Record<string, any>) => void;
  value?: Record<string, any>;
}> = ({ schema, onChange, value }) => {
  const formRef = React.useRef(createForm({initialValues: value, effects: () => {
    onFormValuesChange((form) => {
      // form.modified = true;
      onChange?.(form.getState().values);
    });
  }}));
  const form = formRef.current;

  // const handleOK = () => {
  //   const data = form.getState().values;
  //   console.log(data);
  //   if (onChange) {
  //     onChange(data);
  //   }
  //   form.modified = false;
  // };


//   useEffect(() => {
//     console.log(value);
//     form.initialValues = value?.data;
//   }, [value]);

//   useEffect(() => {
//     if (value) {
//         form.setInitialValues(value);
//     }
//   }, []);

  const formLayoutFromJSON = schema?.form || {};
  const schemaFromJSON = schema?.schema || schema;

  return (
    <FormProvider {...formLayoutFromJSON} form={form}>
      <SchemaField schema={schemaFromJSON} />
      {/* <Divider /> */}
      {/* <FormButtonGroup align="right">
      <FormConsumer>
        {() => <Submit disabled={!form.modified} onSubmit={handleOK}>保存</Submit>}
      </FormConsumer>
      </FormButtonGroup> */}
    </FormProvider>
  );
};

export default Formily;
