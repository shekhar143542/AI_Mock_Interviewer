// "use client"



// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import React from 'react'
// import { Button } from "@/components/ui/button"

// import { Input } from "@/components/ui/input"
// import Image from "next/image"
// import Link from "next/link"
// import { email } from "zod/v4"
// import { toast } from "sonner"
// import FormField from "./FormField"
// import { Form } from "./ui/form"
// import { useRouter } from "next/navigation"



// type FormType = "sign-in" | "sign-up";

// const authFormSchema = (type:FormType) => {
//   return z.object({
//     name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
//     email: z.string().email(),
//     password: z.string().min(3),
//   })
// }

// const AuthForm = ({type}:{type:FormType}) => {

//   const formSchema = authFormSchema(type);

//   const router = useRouter();

//     const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   })

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
      
//       if(type === 'sign-up'){
//         toast.success("Account Created successfully.Please sign in")
//         router.push("/sign-in")
//         console.log("SIGN-UP",values)

//       }else{

//         toast.success('Sign in successfull')
//         router.push('/')
//         console.log("SIGN-IN",values)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(`There was an error: ${error}`)
//     }
//     console.log(values)
//   }

//   const isSignIn = type === "sign-in";

//   return (
//     <div className="card-border lg:min-w-[566px]">
//       <div className="flex flex-col gap-6 card py-14 px-10">
//       <div className="flex flex-row gap-2 justify-center">
//           <Image src="/logo.svg" alt="logo" height={32}
//           width={38}/>

//           <h2 className="text-primary-200">PrepPro</h2>
//       </div>
//       <h3>Practice Job Interviews with AI</h3>
     
//        <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}
//        className="w-full space-y-6 mt-4 form">
//        {!isSignIn && <FormField 
//        control={form.control} 
//         name="name"
//           label="Name"
//         placeholder="Your Name"
//        />}

//        <FormField 
//        control={form.control} 
//         name="email"
//         label="Email"
//         placeholder="Your Email address"
//         type = 'email'
//        />

//       <FormField 
//        control={form.control} 
//         name="password"
//         label="Password"
//         placeholder="Enter your Password"
//         type="password"
//        />
      

//         <Button  className = "btn" type="submit">
//           {isSignIn ? "Sign In" : "Create an Account"}
//         </Button>
//       </form>
//     </Form>
//     <p className="text-center">
//       {isSignIn?"No account yet": "Already have an account?"}
//       <Link href={!isSignIn? '/sign-in':'sign-up'}
//       className="font-bold text-user-primary ml-1"
//       >
//         {isSignIn?"Sign up":"Sign in"}
//       </Link>
//     </p>
//     </div>
//      </div>
//   )
// }

// export default AuthForm


"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { Form } from "./ui/form"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Sparkles, Brain, MessageSquare } from "lucide-react"
import { SplashCursor } from "./ui/splash-cursor"
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth'
// Make sure this file initializes Firebase using 'firebase/app' and 'firebase/auth', NOT 'firebase-admin'
import { signIn, signUp } from "@/lib/actions/auth.action"
import { auth } from '@/firebase/client'

type FormType = "sign-in" | "sign-up"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const formSchema = authFormSchema(type)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    if (type === "sign-up") {
      const { name, email, password } = values;

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

      const result = await signUp({
        uid: userCredentials.user.uid,
        name: name!,
        email,
        password,
      });

      if (!result?.success) {
        toast.error(result?.message);
        return;
      }

      toast.success("Account Created successfully. Please sign in");
      router.push("/sign-in");
      console.log("SIGN-UP", values);

    } else {
      const { email, password } = values;

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      if (!idToken) {
        toast.error("Sign in failed");
        return;
      }

      await signIn({
        email,
        idToken,
      });

      toast.success("Sign in successful");
      router.push("/");
      console.log("SIGN-IN", values);
    }
  } catch (error) {
    console.log(error);
    toast.error(`There was an error: ${error}`);
  }
}


  const isSignIn = type === "sign-in"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Splash Cursor in background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <SplashCursor />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side - Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Logo and Brand */}
          <div className="text-center lg:text-left mb-8">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                
                  <Image src="/logo.svg" alt="logo" height={32}  width={38}/>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                PrepPro
              </h1>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                {isSignIn ? "Welcome Back" : "Join PrepPro"}
              </h2>
              <p className="text-slate-400 text-lg">
                {isSignIn ? "Continue your AI interview journey" : "Start practicing with AI interviews"}
              </p>
            </div>
          </div>

          {/* Features Pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300">AI Powered</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Real-time Feedback</span>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-purple-500/10 relative z-20">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {!isSignIn && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      Name
                      <span className="text-purple-400">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        {...form.register("name")}
                        placeholder="Enter your full name"
                        className="h-14 bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl pl-4 pr-4 text-base transition-all duration-200"
                      />
                    </div>
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-sm flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    Email
                    <span className="text-purple-400">*</span>
                  </label>
                  <div className="relative group">
                    <Input
                      {...form.register("email")}
                      type="email"
                      placeholder="Enter your email address"
                      className="h-14 bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl pl-4 pr-4 text-base transition-all duration-200"
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    Password
                    <span className="text-purple-400">*</span>
                  </label>
                  <div className="relative group">
                    <Input
                      {...form.register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-14 bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl pl-4 pr-14 text-base transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                {isSignIn && (
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 text-base relative overflow-hidden group"
                >
                  <span className="relative z-10">{isSignIn ? "Sign In" : "Create Account"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-slate-400">
                {isSignIn ? "Don't have an account?" : "Already have an account?"}
                <Link
                  href={!isSignIn ? "/sign-in" : "/sign-up"}
                  className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {isSignIn ? "Sign up" : "Sign in"}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - AI Interviewer Image */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 -right-12 w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60 blur-sm"></div>

            <div className="relative transform rotate-6 hover:rotate-3 transition-transform duration-500">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-purple-500/20">
                <div className="relative w-80 h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                  <Image
                    src="/plceholder1.jpg?height=400&width=320"
                    alt="AI Interviewer"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className="absolute top-6 right-6 bg-purple-500/20 backdrop-blur-sm rounded-full p-3 border border-purple-400/30">
                    <Brain className="w-6 h-6 text-purple-300" />
                  </div>
                  <div className="absolute bottom-6 left-6 bg-blue-500/20 backdrop-blur-sm rounded-full p-3 border border-blue-400/30">
                    <MessageSquare className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-white font-bold text-xl mb-2">AI Interview Coach</h3>
                    <p className="text-slate-300 text-sm">Practice with intelligent feedback</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-16 top-16 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-lg transform -rotate-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">95%</div>
                <div className="text-xs text-slate-400">Success Rate</div>
              </div>
            </div>

            <div className="absolute -right-20 bottom-20 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-lg transform rotate-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">10k+</div>
                <div className="text-xs text-slate-400">Interviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default AuthForm



