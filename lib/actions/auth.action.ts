'use server'

import Interview from "@/app/(pages)/interview/page"
import { auth, db } from "@/firebase/admin"
import { Auth } from "firebase-admin/auth"
import { cookies } from "next/headers"
import { string } from "zod"



export async function signUp(params: SignUpParams){
    const {uid, name, email} = params
    try {

        const userRecord = await db.collection('users').doc(uid).get()

        if(userRecord.exists){
            return {
                success: false,
                message: 'User already exists, Please sign in instead',
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: 'Account created successfully, Please sign in',
        }
        
    } catch (error) {
        console.error('Error creating a user', error)

        if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'auth/emailalready-exists') {
            return {
                success: false,
                message: 'This email is already in use',
            }
        }

        return {
            success:false,
            message: 'Failed to create an account'
        }
        
    }
}

export async function signIn (params: SignInParams){
    const {email, idToken} = params

    try {

         const userRecord = await auth.getUserByEmail(email);
         
    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

       await setSessionCookie(idToken);
        
    } catch (error) {
        console.log(error)
        return{
            success: false,
            message: 'Failed to log into account'
        }
    }

}

export async function setSessionCookie(idToken: string){ 
    const ONE_WEEK = 60*60*24*7;
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK*1000,
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK*1000,
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })
}


// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");

  return{
    success: true,
  }
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie){
        return null;
    }

    try {

        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection('users')
        .doc(decodedClaims.uid).get()

        if(!userRecord.exists){
            return null;
        }

        return{
            ...userRecord.data(),
            id:userRecord.id
        } as User;
        
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
     
    return !!user;
}


