import type { Metadata } from "next";
import FoodDetectionContent from "./content";

export const metadata: Metadata = {
  title: "Food Detection & Classification — Alexandre Vives",
  description:
    "Computer vision pipeline to detect and classify 101 food categories from meal photos. ResNet-50 fine-tuning achieved 82% top-1 accuracy. Published at Purdue Research Conference.",
};

export default function FoodDetectionPage() {
  return <FoodDetectionContent />;
}
