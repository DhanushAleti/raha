"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/app/actions/profile";

export interface ProfileValues {
  displayName: string;
  state: string;
  address: string;
  pan: string;
  gstin: string;
  lutArn: string;
  invoicePrefix: string;
}

export function ProfileForm({ initial }: { initial: ProfileValues }) {
  const [values, setValues] = useState<ProfileValues>(initial);
  const [pending, startTransition] = useTransition();

  function set<K extends keyof ProfileValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateProfile(values);
      if (result.status === "ok") toast.success("Profile saved");
      else toast.error(result.message);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pf-name">Display name (on invoices)</Label>
          <Input
            id="pf-name"
            value={values.displayName}
            onChange={(e) => set("displayName", e.target.value)}
            required
            maxLength={120}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pf-state">Your GST state</Label>
          <Input
            id="pf-state"
            value={values.state}
            onChange={(e) => set("state", e.target.value)}
            placeholder="Karnataka"
            maxLength={60}
          />
          <p className="text-xs text-raha-ink/50">
            Decides CGST+SGST vs IGST on domestic invoices.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="pf-address">Address (on invoices)</Label>
        <Textarea
          id="pf-address"
          value={values.address}
          onChange={(e) => set("address", e.target.value)}
          rows={2}
          maxLength={500}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pf-pan">PAN</Label>
          <Input
            id="pf-pan"
            value={values.pan}
            onChange={(e) => set("pan", e.target.value.toUpperCase())}
            placeholder="ABCPD1234E"
            maxLength={10}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pf-gstin">GSTIN</Label>
          <Input
            id="pf-gstin"
            value={values.gstin}
            onChange={(e) => set("gstin", e.target.value.toUpperCase())}
            placeholder="29ABCPD1234E1Z5"
            maxLength={15}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pf-lut">LUT ARN</Label>
          <Input
            id="pf-lut"
            value={values.lutArn}
            onChange={(e) => set("lutArn", e.target.value)}
            placeholder="AD290426000123B"
            maxLength={30}
          />
          <p className="text-xs text-raha-ink/50">
            Needed on zero-rated export invoices.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pf-prefix">Invoice prefix</Label>
          <Input
            id="pf-prefix"
            value={values.invoicePrefix}
            onChange={(e) => set("invoicePrefix", e.target.value.toUpperCase())}
            maxLength={12}
          />
          <p className="text-xs text-raha-ink/50">
            e.g. {values.invoicePrefix || "INV"}/2026-27/001
          </p>
        </div>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}
