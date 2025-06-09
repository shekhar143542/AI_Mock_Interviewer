
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { isAuthenticated, signOut } from '@/lib/actions/auth.action'
import { toast } from 'sonner'
import {
  LayoutDashboard,
  Brain,
  FileText,
  User,
  LogOut,
  PlusCircle, // ← Add this
} from 'lucide-react'

import React, { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {

  const isUserAuthenticated = await isAuthenticated();
  
  if(!isUserAuthenticated){
    redirect('/sign-in');
  }

  // const router = useRouter()

  // const handleSignOut = async () => {
  //   const res = await signOut()
  //   if (res.success) {
  //     toast.success('Signed out successfully')
  //     router.push('/sign-in')
  //   } else {
  //     toast.error('Sign out failed')
  //   }
  // }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] text-white font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-black bg-opacity-40 backdrop-blur-md shadow-lg p-6 flex flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-10 group">
            <Image src="/logo.svg" alt="Logo" width={38} height={32} />
            <h2 className="text-2xl font-bold text-white group-hover:text-purple-500 transition-colors">
              PrepPro
            </h2>
          </Link>

          <nav className="flex flex-col gap-5 text-sm text-gray-300">
            <Link href="/" className="flex items-center gap-3 hover:text-white transition duration-200">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link href="/interviews" className="flex items-center gap-3 hover:text-white transition duration-200">
              <Brain size={18} /> Interviews
            </Link>
            <Link href="/feedback" className="flex items-center gap-3 hover:text-white transition duration-200">
              <FileText size={18} /> Feedback
            </Link>
            <Link href="/profile" className="flex items-center gap-3 hover:text-white transition duration-200">
              <User size={18} /> Profile
            </Link>

            <Link href="/interview" className="mt-2">
  <button className="w-full py-2 px-4 flex items-center cursor-pointer justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition">
    <PlusCircle size={16} /> Create Interview
  </button>
</Link>


            {/* Sign out button inside nav */}
            <button
              // onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition mt-2"
              type="button"
            >
              <LogOut size={16} /> <span className='cursor-pointer'>Sign Out</span>
            </button>
          </nav>
        </div>

        <div className="text-xs text-gray-500 text-center mt-10">
          © 2025 PrepPro Inc.
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default RootLayout
