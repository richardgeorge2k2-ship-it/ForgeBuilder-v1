"use client";

import React from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionAction } from "@/components/ui/SectionAction";
import { MutedText } from "@/components/ui/MutedText";

const title = "ForgeBuilder";

export default function AppPage() {
  return (
    <main className="space-y-6">
      <SectionTitle>{title}</SectionTitle>
      <MutedText>Dashboard</MutedText>
      <SectionAction />
    </main>
  );
}
