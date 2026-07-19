"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const waitlistSchema = z
  .object({
    name: z.string().trim().min(1, "Please tell us your name").max(120),
    email: z.string().trim().email("That email doesn't look right").max(320),
    incomeRange: z.enum(["under_20l", "20l_50l", "50l_1cr", "1cr_2cr", "over_2cr"], {
      message: "Pick your income range",
    }),
    platforms: z.array(z.string().max(60)).max(10).default([]),
    // Honeypot: real users never fill this.
    company: z.string().max(0).optional(),
  })
  .transform((data) => ({ ...data, email: data.email.toLowerCase() }));

export type WaitlistResult =
  | { status: "ok"; alreadyJoined: boolean }
  | { status: "error"; message: string };

export async function joinWaitlist(input: unknown): Promise<WaitlistResult> {
  const parsed = waitlistSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again",
    };
  }

  const { name, email, incomeRange, platforms } = parsed.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("waitlist").insert({
      name,
      email,
      income_range: incomeRange,
      platforms,
    });

    if (error) {
      // 23505 = unique_violation → they're already on the list; that's a success.
      if (error.code === "23505") return { status: "ok", alreadyJoined: true };
      console.error("waitlist insert failed", { code: error.code, message: error.message });
      return { status: "error", message: "Couldn't save that just now — please try again." };
    }

    return { status: "ok", alreadyJoined: false };
  } catch (err) {
    console.error("waitlist action crashed", err);
    return { status: "error", message: "Couldn't save that just now — please try again." };
  }
}
