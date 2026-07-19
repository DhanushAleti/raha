"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { importIncomeCsv, type CsvImportResult } from "@/app/actions/income";

type Preset = "adsense" | "patreon" | "generic";

const MAX_FILE_BYTES = 2_000_000;

export function CsvUploadDialog() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<Preset>("adsense");
  const [content, setContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [dateColumn, setDateColumn] = useState("");
  const [amountColumn, setAmountColumn] = useState("");
  const [currencyColumn, setCurrencyColumn] = useState("");
  const [platformColumn, setPlatformColumn] = useState("");
  const [report, setReport] = useState<Extract<CsvImportResult, { status: "ok" }> | null>(null);
  const [pending, startTransition] = useTransition();

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      toast.error("File is too large (2 MB max).");
      e.target.value = "";
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setContent(typeof reader.result === "string" ? reader.result : null);
    reader.onerror = () => toast.error("Couldn't read that file.");
    reader.readAsText(file);
  }

  function handleImport() {
    if (!content) return;
    startTransition(async () => {
      const result = await importIncomeCsv({
        content,
        preset,
        mapping:
          preset === "generic"
            ? {
                dateColumn,
                amountColumn,
                currencyColumn: currencyColumn || undefined,
                currency: currencyColumn ? undefined : "INR",
                platformColumn: platformColumn || undefined,
                platform: platformColumn ? undefined : "Imported",
              }
            : undefined,
      });
      if (result.status === "ok") {
        setReport(result);
        toast.success(`Imported ${result.imported} entries`);
      } else {
        toast.error(result.message);
      }
    });
  }

  function reset() {
    setContent(null);
    setFileName("");
    setReport(null);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Upload CSV</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import income from CSV</DialogTitle>
          <DialogDescription>
            AdSense and Patreon exports work out of the box; anything else via
            column mapping. Up to 1,000 rows per file.
          </DialogDescription>
        </DialogHeader>

        {report ? (
          <div className="space-y-4">
            <p className="rounded-lg bg-raha-green-soft px-4 py-3 text-sm text-raha-green">
              <strong>{report.imported}</strong> entries imported
              {report.failed.length > 0 ? `, ${report.failed.length} skipped` : ""}.
            </p>
            {report.failed.length > 0 ? (
              <div className="max-h-48 overflow-y-auto rounded-lg border border-raha-ink/10 p-3 text-xs text-raha-ink/70">
                <p className="mb-2 font-medium text-raha-ink">Skipped rows:</p>
                <ul className="space-y-1">
                  {report.failed.map((f, i) => (
                    <li key={i}>
                      {f.row > 0 ? `Row ${f.row}: ` : ""}
                      {f.message}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Button className="w-full" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-preset">Format</Label>
              <Select value={preset} onValueChange={(v) => setPreset(v as Preset)}>
                <SelectTrigger id="csv-preset" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adsense">AdSense export (Date, Earnings)</SelectItem>
                  <SelectItem value="patreon">Patreon export (Date, Amount, Currency)</SelectItem>
                  <SelectItem value="generic">Other — map columns myself</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {preset === "generic" ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="col-date">Date column</Label>
                  <Input
                    id="col-date"
                    value={dateColumn}
                    onChange={(e) => setDateColumn(e.target.value)}
                    placeholder="e.g. Date"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="col-amount">Amount column</Label>
                  <Input
                    id="col-amount"
                    value={amountColumn}
                    onChange={(e) => setAmountColumn(e.target.value)}
                    placeholder="e.g. Earnings"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="col-currency">
                    Currency column{" "}
                    <span className="text-raha-ink/40">(blank = INR)</span>
                  </Label>
                  <Input
                    id="col-currency"
                    value={currencyColumn}
                    onChange={(e) => setCurrencyColumn(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="col-platform">
                    Platform column{" "}
                    <span className="text-raha-ink/40">(optional)</span>
                  </Label>
                  <Input
                    id="col-platform"
                    value={platformColumn}
                    onChange={(e) => setPlatformColumn(e.target.value)}
                  />
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="csv-file">CSV file</Label>
              <Input id="csv-file" type="file" accept=".csv,text/csv" onChange={handleFile} />
              {fileName ? (
                <p className="text-xs text-raha-ink/55">{fileName} loaded</p>
              ) : null}
            </div>

            <Button
              className="w-full"
              onClick={handleImport}
              disabled={
                pending ||
                !content ||
                (preset === "generic" && (!dateColumn || !amountColumn))
              }
            >
              {pending ? "Importing…" : "Import"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
