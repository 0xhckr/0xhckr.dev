"use client";

import { useCallback } from "react";
import { FileDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { generateResumePDF } from "~/lib/generate-resume-pdf";
import type { ResumeData } from "~/lib/resume";

export const DownloadResumeButton = ({ data }: { data: ResumeData }) => {
  const handleClick = useCallback(async () => {
    const doc = await generateResumePDF(data);
    doc.save("resume-mohammad-alahdal.pdf");
  }, [data]);

  return (
    <Button
      onClick={handleClick}
      aria-label="Download resume as PDF"
      variant="ghost"
      size="icon-lg"
      className="size-10"
    >
      <FileDown className="size-6" />
    </Button>
  );
};
