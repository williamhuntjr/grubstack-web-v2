'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Theme } from '@emotion/react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/system'
import { LocationForm } from 'common/forms/location-form/location-form'
import { useDialog } from 'common/hooks/dialog.hook'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { ILocation, IProperty } from 'common/types'
import { generateTheme } from 'common/utils/layout.utils'
import { getProperty } from 'common/utils/utils'
import { RestaurantProperty } from 'common/constants'
import { ICartState } from 'modules/cart/cart.types'
import { defaultCartState } from 'modules/cart/cart.constants'
import { CartProvider } from 'common/hooks/cart.hook'
import defaultTheme from 'theme'
import { getCart } from 'modules/cart/cart.utils'
import { Header } from './header/header'
import { Footer } from './footer/footer'
import { MobileNav } from './mobile-nav/mobile-nav'
import styles from './app-container.module.scss'

export default function AppContainer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [currentLocation, setCurrentLocation] = useState<ILocation>()
  const [properties, setProperties] = useState<IProperty[]>([])
  const [cart, setCart] = useState<ICartState>(defaultCartState)

  const router = useRouter()

  const {
    open: locationDialogOpen,
    openDialog: openLocationDialog,
    closeDialog: closeLocationDialog,
    setData: setLocationDialogData,
  } = useDialog<string>()

  const applyCssVariableValues = (properties: IProperty[]) => {
    const primaryColor = getProperty(properties, RestaurantProperty.PrimaryColor)
    const primaryColorContrast = getProperty(properties, RestaurantProperty.PrimaryColorContrast)
    const secondaryColor = getProperty(properties, RestaurantProperty.SecondaryColor)
    const secondaryColorContrast = getProperty(properties, RestaurantProperty.SecondaryColorContrast)
    const headerBackgroundColor = getProperty(properties, RestaurantProperty.HeaderBackgroundColor)
    const headerForegroundColor = getProperty(properties, RestaurantProperty.HeaderForegroundColor)
    const footerBackgroundColor = getProperty(properties, RestaurantProperty.FooterBackgroundColor)
    const footerForegroundColor = getProperty(properties, RestaurantProperty.FooterForegroundColor)
    const textColor = getProperty(properties, RestaurantProperty.TextColor)
    const headlineTextColor = getProperty(properties, RestaurantProperty.HeadlineTextColor)

    if (primaryColor) {
      document.documentElement.style.setProperty('--primary-color', primaryColor)
    }

    if (primaryColorContrast) {
      document.documentElement.style.setProperty('--primary-color-contrast', primaryColorContrast)
    }

    if (secondaryColor) {
      document.documentElement.style.setProperty('--secondary-color', secondaryColor)
    }

    if (secondaryColorContrast) {
      document.documentElement.style.setProperty('--secondary-color-contrast', secondaryColorContrast)
    }

    if (headerBackgroundColor) {
      document.documentElement.style.setProperty('--header-background-color', headerBackgroundColor)
    }

    if (headerBackgroundColor) {
      document.documentElement.style.setProperty('--header-background-color', headerBackgroundColor)
    }

    if (headerForegroundColor) {
      document.documentElement.style.setProperty('--header-foreground-color', headerForegroundColor)
    }

    if (footerBackgroundColor) {
      document.documentElement.style.setProperty('--footer-background-color', footerBackgroundColor)
    }

    if (footerForegroundColor) {
      document.documentElement.style.setProperty('--footer-foreground-color', footerForegroundColor)
    }

    if (textColor) {
      document.documentElement.style.setProperty('--text-color', textColor)
    }

    if (headlineTextColor) {
      document.documentElement.style.setProperty('--headline-text-color', headlineTextColor)
    }
  }

  const toggleLocationDialog = () => {
    if (locationDialogOpen) {
      closeLocationDialog()
    } else {
      openLocationDialog(currentLocation?.id ?? '')
    }
  }

  const fetchCurrentLocation = async (): Promise<void> => {
    let resp = await fetch('/api/locations/get-current-location')
    let json = await resp.json()

    if (json.data) {
      setCurrentLocation(json.data as ILocation)
      router.refresh()
    } else {
      resp = await fetch('/api/locations')
      const locations = await resp.json()
      if (locations && locations.length > 0) {
        setCurrentLocation(locations[0] as ILocation)
        const params: globalThis.RequestInit = {
          method: 'POST',
          body: JSON.stringify({ locationId: locations[0].id }),
        }

        await fetch('/api/locations/set-current-location', params)
        router.refresh()
      }
    }

    await fetchData()
  }

  const fetchProperties = async (): Promise<void> => {
    if (currentLocation) {
      const resp = await fetch(`/api/locations/${currentLocation?.id!}/properties`)
      const json = await resp.json()
      setProperties(json.data)
      if (json.data.length > 0) {
        setTheme(generateTheme(json.data))
        applyCssVariableValues(json.data)
      }
    }
  }

  const fetchData = async (): Promise<void> => {
    try {
      if (currentLocation) {
        setLoading(true)
        await fetchProperties()

        const cartData = getCart(currentLocation.id!)
        setCart(cartData)
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleUpdateLocation = async (id: string): Promise<void> => {
    setLocationDialogData(id)
    closeLocationDialog()

    const params: globalThis.RequestInit = {
      method: 'POST',
      body: JSON.stringify({ locationId: id }),
    }

    await fetch('/api/locations/set-current-location', params)
    await fetchCurrentLocation()
  }

  useEffect(() => void fetchCurrentLocation(), [])
  useEffect(() => void fetchData(), [currentLocation])

  return (
    <>
      {isLoading && (
        <main className={styles.loadingContainer}>
          <h1 className={styles.loading}>Loading</h1>
        </main>
      )}
      {!isLoading && (
        <AppRouterCacheProvider>
          <ToastContainer pauseOnHover={false} hideProgressBar={true} autoClose={3000} pauseOnFocusLoss={false} position="bottom-right" />
          <ThemeProvider theme={theme}>
            <GrubDialog open={locationDialogOpen} onClose={closeLocationDialog} title="Select a Location">
              <LocationForm onSelect={handleUpdateLocation} location={currentLocation} />
            </GrubDialog>
            <>
              <CartProvider initialValue={cart}>
                <Header onOpenLocations={toggleLocationDialog} properties={properties} />
                <main className={styles.appContainer}>{children}</main>
                <MobileNav onOpenLocations={toggleLocationDialog} />
                <Footer />
              </CartProvider>
            </>
          </ThemeProvider>
        </AppRouterCacheProvider>
      )}
    </>
  )
}
