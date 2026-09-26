import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AnnouncementBanner from "@/components/AnnouncementBanner/AnnouncementBanner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </>
  );
}
