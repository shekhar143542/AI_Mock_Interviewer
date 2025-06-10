'use client'

import { useRouter } from "next/navigation"
import { signOut } from "./actions/auth.action"
import { toast } from "sonner"




export const handleSignOut = async () => {

    const router = useRouter()

    const res = await signOut()
    if (res.success) {
      toast.success('Signed out successfully')
      router.push('/sign-in')
    } else {
      toast.error('Sign out failed')
    }
  }
