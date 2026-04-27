import type { NextRequest } from "next/server";
import type { Id } from "../../../../../convex/_generated/dataModel";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;

async function convexQuery(
  functionName: string,
  args: Record<string, unknown>,
) {
  const url = `${CONVEX_URL}/api/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: functionName, args }),
  });
  console.log(res);
  if (!res.ok) {
    throw new Error(`Convex query failed: ${res.status} ${await res.text()}`);
  }
  const { value } = await res.json();
  return value;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  const { resumeId } = await params;
  const id = resumeId === "default" ? undefined : (resumeId as Id<"resumes">);

  const resume = await convexQuery("resumes:getPublic", { id });

  if (!resume) {
    return Response.json({ error: "Resume not found" }, { status: 404 });
  }

  return Response.json(resume);
}
