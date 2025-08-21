import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface NavigationContextType {
  isNavExpanded: boolean
  setIsNavExpanded: (expanded: boolean) => void
  intelExpanded: boolean
  setIntelExpanded: (expanded: boolean) => void
  covenantsExpanded: boolean
  setCovenantsExpanded: (expanded: boolean) => void
  sourceFilesExpanded: boolean
  setSourceFilesExpanded: (expanded: boolean) => void
  companiesExpanded: boolean
  setCompaniesExpanded: (expanded: boolean) => void
  creditCloudExpanded: boolean
  setCreditCloudExpanded: (expanded: boolean) => void
  findoxExpanded: boolean
  setFindoxExpanded: (expanded: boolean) => void
  resourcesExpanded: boolean
  setResourcesExpanded: (expanded: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  // Non-landing page defaults - navigation expanded, Intel collapsed (user preference)
  const [isNavExpanded, setIsNavExpanded] = useState(true)
  const [intelExpanded, setIntelExpanded] = useState(false) // Start collapsed for other pages
  const [covenantsExpanded, setCovenantsExpanded] = useState(false)
  const [sourceFilesExpanded, setSourceFilesExpanded] = useState(false)
  const [companiesExpanded, setCompaniesExpanded] = useState(false)
  const [creditCloudExpanded, setCreditCloudExpanded] = useState(false)
  const [findoxExpanded, setFindoxExpanded] = useState(false)
  const [resourcesExpanded, setResourcesExpanded] = useState(false)

  return (
    <NavigationContext.Provider value={{
      isNavExpanded,
      setIsNavExpanded,
      intelExpanded,
      setIntelExpanded,
      covenantsExpanded,
      setCovenantsExpanded,
      sourceFilesExpanded,
      setSourceFilesExpanded,
      companiesExpanded,
      setCompaniesExpanded,
      creditCloudExpanded,
      setCreditCloudExpanded,
      findoxExpanded,
      setFindoxExpanded,
      resourcesExpanded,
      setResourcesExpanded
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}

// Separate context for chat pages that can have different defaults
export function useChatNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useChatNavigation must be used within a NavigationProvider')
  }
  return context
}
