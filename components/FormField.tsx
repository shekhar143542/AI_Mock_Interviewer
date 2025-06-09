// import React from 'react'
// import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form'
// import { Input } from './ui/input'
// import { Control, Controller, FieldValues, Path } from 'react-hook-form'



// interface FormFieldProps<T extends FieldValues>{
//     control: Control<T>
//     name: Path<T>
//     label: string
//     placeholder?: string;
//     type?: 'text' | 'password' | 'email' | 'file' 

// }

// const FormField = <T,>({
//   control,
//   name,
//   label,
//   placeholder,
//   type = "text",
// }: FormFieldProps<T>) => {
//   return (
//     <div>
//       <Controller
        
//         control={control}
//         name={name}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel className='label'>{label}</FormLabel>
//             <FormControl>
//               <Input
              
//               className='input' placeholder={placeholder} {...field} 
//               type={type}
//               />
//             </FormControl>
            
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </div>
//   );
// }

// export default FormField


import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { FormControl, FormField as ShadcnFormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder: string
  type?: string
}

const FormField = <T extends FieldValues>({ control, name, label, placeholder, type = "text" }: FormFieldProps<T>) => {
  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-sm font-medium text-slate-300">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className="h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </FormControl>
          <FormMessage className="text-red-400 text-sm" />
        </FormItem>
      )}
    />
  )
}

export default FormField
