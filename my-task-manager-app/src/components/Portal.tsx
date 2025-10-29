import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

interface PortalProps {
  children: ReactNode
}

const Portal = ({ children }: PortalProps) => createPortal(children, document.body)

export default Portal
