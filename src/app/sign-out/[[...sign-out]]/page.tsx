import { SignOut } from "@clerk/nextjs";

export default function SignOutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignOut
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
            formButtonPrimary:
              "bg-foreground text-black hover:bg-foreground/90",
          },
        }}
      />
    </div>
  );
}
