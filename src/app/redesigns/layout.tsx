import RedesignSwitcher from "@/components/redesigns/switcher";

export default function RedesignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <RedesignSwitcher />
    </>
  );
}
