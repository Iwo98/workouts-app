<script setup lang="ts">
import TheWelcome from "@frontend/components/ui/theWelcome/TheWelcome.vue";
import { RouterLink, RouterView } from "vue-router";
import { Button } from "@frontend/components/ui/button";
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@frontend/components/ui/form";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  }),
);
const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  // oxlint-disable-next-line no-console
  console.log("Form submitted!", values);
});
</script>

<template>
  <div class="flex gap-3 flex-col items-start p-4">
    <h1 class="fill-primary">Log in</h1>
    <div class="w-full">
      <form @submit="onSubmit">
        <FormField v-slot="{ field }" name="username">
          <FormItem class="w-full gap-1 mb-2">
            <FormLabel>Username</FormLabel>
            <FormControl class="rounded-xs border-2 border-tertiary w-full">
              <Input
                required
                class="p-1"
                placeholder="Username"
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
      </Form>
    </div>
  </div>
</template>
