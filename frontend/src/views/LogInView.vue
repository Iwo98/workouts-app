<script setup lang="ts">
import { Button } from "@frontend/components/ui/button";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@frontend/components/ui/form";
import { api } from "@frontend/lib/api/axios";
import { useRouter } from "vue-router";
import { authenticateSchema } from "@common/types/auth";

const router = useRouter();

const form = useForm({
  validationSchema: toTypedSchema(authenticateSchema),
  initialValues: { email: "", password: "" },
});

const onSubmit = form.handleSubmit(async ({ email, password }) => {
  try {
    await api.post("auth/login", {
      email: email,
      password: password,
    });

    router.push("/dashboard");
  } catch {
    // TODO
  }
});
</script>

<template>
  <div class="flex gap-3 flex-col items-start p-4">
    <h1 class="fill-primary">Log in</h1>
    <div class="w-full">
      <form @submit="onSubmit">
        <FormField v-slot="{ field }" name="email">
          <FormItem class="w-full gap-1 mb-2">
            <FormLabel>E-mail</FormLabel>
            <FormControl class="rounded-xs border-2 border-tertiary w-full">
              <Input
                required
                class="p-1"
                placeholder="Your e-mail"
                v-bind="field"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="password" v-slot="{ field }">
          <FormItem class="w-full gap-1">
            <FormLabel>Password</FormLabel>
            <FormControl class="rounded-xs border-2 border-tertiary w-full">
              <Input
                type="password"
                required
                class="p-1"
                placeholder="Your password"
                v-bind="field"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button as="button" type="submit" size="default" class="w-full mt-2"
          >Log in</Button
        >
      </form>
    </div>
  </div>
</template>
