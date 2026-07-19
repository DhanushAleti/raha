import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { EXPORT_LUT_NOTE } from "@/lib/gst/calc";
import { inrAmountInWords } from "@/lib/format/inr";

/** react-pdf's default fonts lack the ₹ glyph, so amounts print as "Rs." */
const rs = (value: number) =>
  `Rs. ${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export interface PdfInvoice {
  invoiceNumber: string;
  issueDate: string;
  supplyType: "domestic" | "export";
  status: string;
  clientName: string;
  clientGstin: string;
  clientAddress: string;
  clientState: string;
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
  notes: string;
}

export interface PdfInvoiceItem {
  description: string;
  sacCode: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

export interface PdfProfile {
  displayName: string;
  address: string;
  pan: string;
  gstin: string;
  state: string;
  lutArn: string;
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1a2421" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  brand: { fontSize: 20, fontFamily: "Helvetica-Bold" },
  muted: { color: "#5c6660" },
  title: { fontSize: 13, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 },
  draft: { color: "#b45309", fontFamily: "Helvetica-Bold", marginTop: 4 },
  section: { marginBottom: 16 },
  twoCol: { flexDirection: "row", justifyContent: "space-between", gap: 24 },
  label: { fontSize: 8, textTransform: "uppercase", letterSpacing: 0.5, color: "#8a938d", marginBottom: 3 },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#1a2421",
    paddingBottom: 5,
    marginBottom: 2,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    textTransform: "uppercase",
  },
  row: { flexDirection: "row", paddingVertical: 5, borderBottomWidth: 0.5, borderBottomColor: "#d8ddd9" },
  colDesc: { flex: 5 },
  colSac: { flex: 1.5 },
  colQty: { flex: 1, textAlign: "right" },
  colRate: { flex: 2, textAlign: "right" },
  colAmount: { flex: 2, textAlign: "right" },
  totalsBlock: { marginTop: 12, alignSelf: "flex-end", width: 220 },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 2.5 },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#1a2421",
    marginTop: 4,
    paddingTop: 5,
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  words: { marginTop: 10, fontSize: 9, fontStyle: "italic", color: "#3c4540" },
  lutNote: {
    marginTop: 16,
    padding: 9,
    backgroundColor: "#eef3ee",
    fontSize: 9,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#8a938d",
  },
});

function InvoicePdf({
  invoice,
  items,
  profile,
}: {
  invoice: PdfInvoice;
  items: PdfInvoiceItem[];
  profile: PdfProfile;
}) {
  return (
    <Document title={invoice.invoiceNumber}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.brand}>{profile.displayName}</Text>
            {profile.address ? <Text style={styles.muted}>{profile.address}</Text> : null}
            {profile.gstin ? <Text style={styles.muted}>GSTIN: {profile.gstin}</Text> : null}
            {profile.pan ? <Text style={styles.muted}>PAN: {profile.pan}</Text> : null}
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.title}>
              {invoice.supplyType === "export" ? "Export Invoice" : "Tax Invoice"}
            </Text>
            <Text style={{ marginTop: 6, fontFamily: "Helvetica-Bold" }}>
              {invoice.invoiceNumber}
            </Text>
            <Text style={styles.muted}>Date: {invoice.issueDate}</Text>
            {invoice.status === "draft" ? <Text style={styles.draft}>DRAFT</Text> : null}
          </View>
        </View>

        <View style={[styles.section, styles.twoCol]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Billed to</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{invoice.clientName}</Text>
            {invoice.clientAddress ? <Text style={styles.muted}>{invoice.clientAddress}</Text> : null}
            {invoice.clientGstin ? <Text style={styles.muted}>GSTIN: {invoice.clientGstin}</Text> : null}
            {invoice.clientState ? (
              <Text style={styles.muted}>Place of supply: {invoice.clientState}</Text>
            ) : null}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Supply</Text>
            <Text>
              {invoice.supplyType === "export"
                ? "Export of services (zero-rated)"
                : "Domestic supply of services"}
            </Text>
            {profile.state ? <Text style={styles.muted}>From: {profile.state}</Text> : null}
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Description</Text>
          <Text style={styles.colSac}>SAC</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colRate}>Rate</Text>
          <Text style={styles.colAmount}>Amount</Text>
        </View>
        {items.map((item, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.colDesc}>{item.description}</Text>
            <Text style={styles.colSac}>{item.sacCode}</Text>
            <Text style={styles.colQty}>{item.qty}</Text>
            <Text style={styles.colRate}>{rs(item.unitPrice)}</Text>
            <Text style={styles.colAmount}>{rs(item.amount)}</Text>
          </View>
        ))}

        <View style={styles.totalsBlock}>
          <View style={styles.totalsRow}>
            <Text style={styles.muted}>Subtotal</Text>
            <Text>{rs(invoice.subtotal)}</Text>
          </View>
          {invoice.cgst > 0 ? (
            <View style={styles.totalsRow}>
              <Text style={styles.muted}>CGST @ 9%</Text>
              <Text>{rs(invoice.cgst)}</Text>
            </View>
          ) : null}
          {invoice.sgst > 0 ? (
            <View style={styles.totalsRow}>
              <Text style={styles.muted}>SGST @ 9%</Text>
              <Text>{rs(invoice.sgst)}</Text>
            </View>
          ) : null}
          {invoice.igst > 0 ? (
            <View style={styles.totalsRow}>
              <Text style={styles.muted}>IGST @ 18%</Text>
              <Text>{rs(invoice.igst)}</Text>
            </View>
          ) : null}
          {invoice.supplyType === "export" ? (
            <View style={styles.totalsRow}>
              <Text style={styles.muted}>GST</Text>
              <Text>Zero-rated</Text>
            </View>
          ) : null}
          <View style={styles.grandTotal}>
            <Text>Total</Text>
            <Text>{rs(invoice.total)}</Text>
          </View>
        </View>

        <Text style={styles.words}>{inrAmountInWords(invoice.total)}</Text>

        {invoice.supplyType === "export" ? (
          <Text style={styles.lutNote}>
            {EXPORT_LUT_NOTE}
            {profile.lutArn ? ` LUT ARN: ${profile.lutArn}.` : ""}
          </Text>
        ) : null}

        {invoice.notes ? (
          <View style={{ marginTop: 14 }}>
            <Text style={styles.label}>Notes</Text>
            <Text>{invoice.notes}</Text>
          </View>
        ) : null}

        <Text style={styles.footer}>
          Generated with Raha — creator taxes, handled.
        </Text>
      </Page>
    </Document>
  );
}

export async function renderInvoicePdf(
  invoice: PdfInvoice,
  items: PdfInvoiceItem[],
  profile: PdfProfile,
): Promise<Buffer> {
  return renderToBuffer(<InvoicePdf invoice={invoice} items={items} profile={profile} />);
}
