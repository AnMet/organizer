import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { supabase } from "~/utils/supabaseClient";

export default defineNuxtRouteMiddleware(async (to) => {
  const publicPages = ["/auth"];

  if (publicPages.includes(to.path)) return;

  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user;

  if (!user) {
    return navigateTo("/auth");
  }
});
