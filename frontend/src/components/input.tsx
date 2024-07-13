import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  base: 'bg-transparent placeholder-zinc-400 outline-none',
  variants: {
    textSize: {
      default: 'text-base',
      lg: 'text-lg',
    },
    extent: {
      sm: 'w-40',
      default: 'flex-1',
      xl: 'w-[500px]',
    },
    colorScheme: {
      white: '',
      dark: '[color-scheme:dark]',
    }
  },

  defaultVariants: {
    textSize: 'default',
    extent: 'default',
    colorScheme: 'white'
  },
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {}

export function Input ({ textSize, colorScheme, extent, ...props }: InputProps) {
  return <input {...props} className={inputVariants({ textSize, extent, colorScheme })} />
}
