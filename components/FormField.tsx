import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'



interface FormFieldProps<T extends FieldValues>{
    control: Control<T>
    name: Path<T>
    label: string
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'file' 

}

const FormField = <T,>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    <div>
      <Controller
        
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='label'>{label}</FormLabel>
            <FormControl>
              <Input
              
              className='input' placeholder={placeholder} {...field} 
              type={type}
              />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default FormField
