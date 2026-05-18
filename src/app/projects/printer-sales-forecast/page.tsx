import type { Metadata } from "next";
import PrinterForecastContent from "./content";

export const metadata: Metadata = {
  title: "Printer Sales Time-Series Forecast — Alexandre Vives",
  description:
    "ARIMA/SARIMA forecasting pipeline for 120+ printer SKUs at HP, improving forecast accuracy by ~27% and enabling more reliable global supply-chain planning.",
};

export default function PrinterForecastPage() {
  return <PrinterForecastContent />;
}
