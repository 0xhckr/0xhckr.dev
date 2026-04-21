import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#ededed",
            colorBackground: "#000000",
            colorInputBackground: "#111111",
            colorInputText: "#ededed",
          },
          elements: {
            rootBox: "mx-auto",
            card: "bg-black/80 backdrop-blur-xl border border-foreground/10 shadow-2xl",
            headerTitle: "text-foreground",
            headerSubtitle: "text-foreground/60",
            socialButtonsBlockButton:
              "border-foreground/10 bg-foreground/5 text-foreground hover:bg-foreground/10",
            formFieldLabel: "text-foreground/70",
            formFieldInput:
              "bg-foreground/5 border-foreground/10 text-foreground",
            formButtonPrimary:
              "bg-foreground text-black hover:bg-foreground/90",
            footerActionLink: "text-foreground/60 hover:text-foreground",
            dividerLine: "bg-foreground/10",
            dividerText: "text-foreground/40",
          },
        }}
      />
    </div>
  );
}
