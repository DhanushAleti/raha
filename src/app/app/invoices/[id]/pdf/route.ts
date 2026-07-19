import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { renderInvoicePdf } from "@/lib/invoice/pdf";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const parsed = z.string().uuid().safeParse(id);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid invoice id" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  // RLS scopes all three queries to the signed-in user.
  const [
    { data: invoice, error: invoiceErr },
    { data: items, error: itemsErr },
    { data: profile, error: profileErr },
  ] = await Promise.all([
    supabase
      .from("invoices")
      .select(
        "invoice_number, issue_date, supply_type, status, client_name, client_gstin, client_address, client_state, subtotal, cgst, sgst, igst, total, notes",
      )
      .eq("id", parsed.data)
      .single(),
    supabase
      .from("invoice_items")
      .select("description, sac_code, qty, unit_price, amount")
      .eq("invoice_id", parsed.data),
    supabase
      .from("profiles")
      .select("display_name, address, pan, gstin, state, lut_arn")
      .eq("id", user.id)
      .single(),
  ]);

  if (!invoice || !items || items.length === 0 || !profile) {
    // Distinguish real 404s from transient query failures in the logs.
    if (invoiceErr || itemsErr || profileErr) {
      console.error("invoice pdf queries failed", {
        invoice: invoiceErr?.message,
        items: itemsErr?.message,
        profile: profileErr?.message,
      });
    }
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  try {
    const pdf = await renderInvoicePdf(
      {
        invoiceNumber: invoice.invoice_number,
        issueDate: invoice.issue_date,
        supplyType: invoice.supply_type as "domestic" | "export",
        status: invoice.status,
        clientName: invoice.client_name,
        clientGstin: invoice.client_gstin ?? "",
        clientAddress: invoice.client_address ?? "",
        clientState: invoice.client_state ?? "",
        subtotal: Number(invoice.subtotal),
        cgst: Number(invoice.cgst),
        sgst: Number(invoice.sgst),
        igst: Number(invoice.igst),
        total: Number(invoice.total),
        notes: invoice.notes ?? "",
      },
      items.map((item) => ({
        description: item.description,
        sacCode: item.sac_code,
        qty: Number(item.qty),
        unitPrice: Number(item.unit_price),
        amount: Number(item.amount),
      })),
      {
        displayName: profile.display_name || "Creator",
        address: profile.address ?? "",
        pan: profile.pan ?? "",
        gstin: profile.gstin ?? "",
        state: profile.state ?? "",
        lutArn: profile.lut_arn ?? "",
      },
    );

    const filename = `${invoice.invoice_number.replaceAll("/", "-")}.pdf`;
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    console.error("invoice pdf render failed", err);
    return NextResponse.json({ error: "Couldn't render the PDF" }, { status: 500 });
  }
}
