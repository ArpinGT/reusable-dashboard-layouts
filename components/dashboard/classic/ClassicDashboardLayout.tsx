export const ClassicDashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex min-h-screen">
            <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
                Sidebar
            </aside>
            <div className="flex min-w-0 flex-1 flex-col">
                <header className="h-16 shrink-0 border-b px-6">
                    Header
                </header>
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
