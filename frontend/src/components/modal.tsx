import { X } from 'lucide-react'
import { ComponentProps, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const overlayVariants = tv({
  base: 'fixed inset-0 flex items-center justify-center',
  variants: {
    overlay: {
      none: 'bg-transparent',
      dark: 'bg-black/60',
    }
  },
  defaultVariants: {
    overlay: 'dark'
  }
})

const modalVariants = tv({
  base: 'rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5',
  variants: {
    size: {
      md: 'w-[640px]',
      sm: 'w-[360px]'
    },
  },
  defaultVariants: {
    size: 'md'
  },
})

interface ModalProps extends ComponentProps<'div'>, VariantProps<typeof modalVariants>, VariantProps<typeof overlayVariants> {
  children: ReactNode
  title: string
  subText?: ReactNode
  closeButtonAction: () => void
}

export function Modal ({ children, title, subText, closeButtonAction, overlay, size }: ModalProps) {
  return (
    <div className={overlayVariants({ overlay })}>
      <div className={modalVariants({ size })}>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>{title}</h2>
            <button onClick={closeButtonAction}><X className='size-5 text-zinc-400' /></button>
          </div>
          <p className='text-sm text-zinc-400'>
            {subText}
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
