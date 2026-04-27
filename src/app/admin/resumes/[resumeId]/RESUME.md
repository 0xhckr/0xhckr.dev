---
name: resume-generator
description: A tool for generating professional resumes with customizable templates, data validation, and export options.
license: MIT
---

# Resume Generator

The Resume Generator is a comprehensive tool designed to help the user "Mohammad Al-Ahdal" create professional resumes that cater to specific companies and job roles given his previous experience and other relevant information.

## Output Shape

The output **must** match the following structure in order to be valid:

```ts
export type ResumeData = {
  profile: string;
  experiences: Array<{
    title: string;
    company: string;
    years: { start: number; end: number | "Present" };
    description: string | Array<string>;
    address?: string;
  }>;
  skills: Array<{
    category: string;
    name: string;
    isExpert: boolean;
  }>;
  education: {
    universityName: string;
    progression: string;
    degreeName: string;
    gpa?: string;
  } | null;
};
```

After generating the resume, the output must be formatted as a JSON object matching the above structure. If the output does not match the required structure, the generator must return an error indicating the validation failure. When you complete the generation, ensure the output is valid JSON and follows the exact schema specified above.

## Inputs

There are details to be considered when generating the resume:

- The Master Resume
- The Job Description (Optional)

The Master Resume contains the user's complete professional history, education, skills, and personal summary. The Job Description provides context about the specific role and company the resume is being tailored for.

## Output Format

The output must be a valid JSON object matching the `ResumeData` structure exactly. Do not include markdown formatting, comments, or any additional text outside of the JSON object. Ensure all required fields are present and properly typed.

## Master Resume

The Master Resume is able to be pulled using a REST API endpoint.

```http
GET https://0xhckr.dev/api/resumes/default
```
