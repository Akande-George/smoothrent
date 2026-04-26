import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="grain" />
      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full sun-gradient opacity-60" />
      <div className="pointer-events-none absolute right-[-12rem] top-[18rem] h-[520px] w-[520px] rounded-full canopy-gradient opacity-50" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8">
        <PublicNavbar />
      </div>

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 pb-12 pt-8 sm:gap-20 sm:px-8 sm:pt-12 lg:gap-24 lg:pt-14">
        {children}
        <PublicFooter />
      </main>
    </div>
  );
}
