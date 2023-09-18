import Header from '@/components/Header'
import '../globals.css'


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}
