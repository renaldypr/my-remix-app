import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Text,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useActionData, useFetcher } from "@remix-run/react";
import type { action } from "~/routes/_index";
import { notifications } from "@mantine/notifications";

export function LoginRegisterForm() {
  const [isLogin, setIsLogin] = useState(true);
  const fetcher = useFetcher();
  const actionData = useActionData<typeof action>();

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 4 ? null : "Password must be at least 4 characters",
    },
  });

  const registerForm = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  // Show notification based on action result
  if (actionData?.error) {
    notifications.show({
      title: "Login Failed",
      message: actionData.error,
      color: "red",
    });
  }

  const handleSubmit = (values: any) => {
    fetcher.submit(
      { email: values.email, password: values.password },
      { method: "post" }
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <Text className="text-2xl font-bold text-center mb-6">
        {isLogin ? "Login" : "Register"}
      </Text>

      <fetcher.Form
        onSubmit={
          isLogin
            ? loginForm.onSubmit(handleSubmit)
            : registerForm.onSubmit(handleSubmit)
        }
      >
        <TextInput
          label="Email"
          placeholder="your@email.com"
          className="mb-4"
          {...(isLogin
            ? loginForm.getInputProps("email")
            : registerForm.getInputProps("email"))}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          className="mb-4"
          {...(isLogin
            ? loginForm.getInputProps("password")
            : registerForm.getInputProps("password"))}
        />

        {!isLogin && (
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            className="mb-4"
            {...registerForm.getInputProps("confirmPassword")}
          />
        )}

        <Group justify="space-between" className="mt-6">
          <Anchor
            component="button"
            type="button"
            className="text-blue-500 hover:text-blue-600"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Anchor>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            {isLogin ? "Login" : "Register"}
          </Button>
        </Group>
      </fetcher.Form>
    </div>
  );
}
