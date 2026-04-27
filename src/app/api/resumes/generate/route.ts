import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText, Output } from "ai";
import type { NextRequest } from "next/server";
import { z } from "zod";

const openrouter = createOpenAICompatible({
  name: "openrouter",
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  supportsStructuredOutputs: true,
});

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

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
  if (!res.ok) {
    throw new Error(`Convex query failed: ${res.status} ${await res.text()}`);
  }
  const { value } = await res.json();
  return value;
}

const resumeDataSchema = z.object({
  profile: z.string(),
  experiences: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      years: z.object({
        start: z.number(),
        end: z.union([z.number(), z.literal("Present")]),
      }),
      description: z.union([z.string(), z.array(z.string())]),
      address: z.string().optional(),
    }),
  ),
  skills: z.array(
    z.object({
      category: z.string(),
      name: z.string(),
      isExpert: z.boolean(),
    }),
  ),
  education: z
    .object({
      universityName: z.string(),
      progression: z.string(),
      degreeName: z.string(),
      gpa: z.string().optional(),
    })
    .nullable(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { jobPostingId } = body as { jobPostingId?: string };

  const [masterResume, jobPosting] = await Promise.all([
    convexQuery("resumes:getPublic", {}),
    jobPostingId ? convexQuery("jobPostings:get", { id: jobPostingId }) : null,
  ]);

  if (!masterResume) {
    return Response.json({ error: "No master resume found" }, { status: 404 });
  }

  let prompt = `You are a resume generator for Mohammad Al-Ahdal. Given the master resume below${
    jobPosting ? " and the job description" : ""
  }, produce a tailored resume that highlights the most relevant experience and skills${
    jobPosting ? " for this specific role" : ""
  }.

Master Resume:
${masterResume.content}`;

  if (jobPosting) {
    prompt += `

Job Description:
Title: ${jobPosting.title}
Company: ${jobPosting.company}
${jobPosting.location ? `Location: ${jobPosting.location}` : ""}
${jobPosting.description}`;
  }

  prompt += `

Instructions:
- Tailor the profile summary to match the target role
- Reorder and emphasize relevant experiences
- Keep all factual information accurate — do not invent experiences, skills, or qualifications
- Adjust the skills section to highlight the most relevant skills for this role, but do not add skills that aren't in the master resume
- Output must match the ResumeData schema exactly`;

  try {
    const result = await generateText({
      model: openrouter.chatModel("anthropic/claude-haiku-4.5"),
      output: Output.object({ schema: resumeDataSchema }),
      prompt,
    });

    return Response.json(result.output);
  } catch (err) {
    console.error("Resume generation failed:", err);
    return Response.json(
      { error: "Failed to generate resume" },
      { status: 500 },
    );
  }
}
