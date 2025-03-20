// Force dynamic rendering to prevent issues with client reference manifest
export const dynamic = 'force-dynamic';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 