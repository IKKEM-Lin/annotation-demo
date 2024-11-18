/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProTable,
  ProTableProps,
} from "@ant-design/pro-components";
import { useRef, useState } from "react";
import { UserEndpointsService } from "../services/service";
import { Button, message, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";

const tableRequest: ProTableProps<any, any>["request"] = async () => {
  const res = await UserEndpointsService.getUsers();
  return {
    data: res.map((item) => ({ id: item })),
    success: true,
  };
};

const User = () => {
  const actionRef = useRef<ActionType>();
  const [form] = ProForm.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>();

  const columns: ProColumns<any>[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 48,
      hideInSearch: true,
      render: (text) => {
        return text || "-";
      },
    },
    {
      title: "Operation",
      valueType: "option",
      key: "option",
      width: 60,
      render: (__, record) => [
        <Tooltip key={`${record.id}-1`} title="Reset password">
          <Button
            size="small"
            onClick={() => {
              setSelectedUser(record.id);
              setIsOpen(true);
            }}
            type="link"
            icon={<RedoOutlined />}
          />
        </Tooltip>,
        <Popconfirm
          title="Delete the User?"
          key={`${record.id}-2`}
          description={
            <>
              Are you sure to delete <b>{record.title}</b> ?
            </>
          }
          onConfirm={async () => {
            await UserEndpointsService.deleteUser(record.id);
            message.success("Delete success!");
            actionRef.current?.reload();
          }}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="Delete">
            <Button size="small" type="link" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>,
      ],
    },
  ];
  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(undefined);
    form.resetFields();
  };
  return (
    <>
      <ProTable<any>
        columns={columns}
        actionRef={actionRef}
        pagination={false}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              setIsOpen(true);
              form.setFieldValue("username", "");
            }}
            icon={<PlusOutlined />}
          >
            New
          </Button>,
        ]}
        request={tableRequest}
        columnsState={{
          persistenceKey: "pro-table-snippet",
          persistenceType: "localStorage",
          onChange() {
            // console.log("value: ", value);
          },
        }}
        rowKey="id"
        search={false}
        options={{
          fullScreen: false,
          setting: false,
        }}
        dateFormatter="string"
        headerTitle=""
      />
      <ModalForm
        title={selectedUser ? "Reset User" : "Create User"}
        open={isOpen}
        initialValues={selectedUser ? { username: selectedUser } : undefined}
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => closeModal(),
          maskClosable: true,
        }}
        submitTimeout={500}
        onFinish={async (values) => {
          if (values.password !== values.password_confirm) {
            return false;
          }
          if (selectedUser) {
            await UserEndpointsService.resetPassword({
              username: selectedUser,
              newPass: values.password,
            });
            message.success("Reset success!");
            actionRef.current?.reload();
          } else {
            await UserEndpointsService.addUser({
              username: values.username,
              password: values.password,
            });
            message.success("Create success!");
            actionRef.current?.reload();
          }
          closeModal();
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="username"
            label="Name"
            required
            placeholder="Please enter name"
            disabled={!!selectedUser}
          />
          <ProFormText.Password
            width="md"
            name="password"
            required
            label="Password"
            placeholder="Please enter password"
          />
          <ProFormText.Password
            width="md"
            name="password_confirm"
            required
            label="Password Confirm"
            placeholder="Please enter password confirm"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default User;
