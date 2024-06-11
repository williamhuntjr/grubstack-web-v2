'use client'

import { useCallback, useEffect, useState } from 'react'
import { LocationForm } from 'common/forms/location-form/location-form'
import { useDialog } from 'common/hooks/dialog.hook'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { ILocation } from 'common/types'
import { Header } from './header/header'
import { MobileNav } from './mobile-nav/mobile-nav'
import styles from './app-container.module.scss'

export default function AppContainer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [ currentLocation, setCurrentLocation ] = useState<ILocation>()
  const {
    open: locationDialogOpen,
    openDialog: openLocationDialog,
    closeDialog: closeLocationDialog,
    setData: setLocationDialogData
  } = useDialog<string>()

  const toggleLocationDialog = () => {
    if (locationDialogOpen) {
      closeLocationDialog()
    }
    else {
      openLocationDialog(currentLocation?.id ?? '')
    }
  }

  const fetchCurrentLocation = async(): Promise<void> => {
    const resp = await fetch('/api/locations/get-current-location')
    const json = await resp.json()
    if (json.data) {
      setCurrentLocation(json.data as ILocation)
    }
  }

  const handleUpdateLocation = useCallback(async (id: string): Promise<void> => {
    setLocationDialogData(id)
    closeLocationDialog()

    const params: globalThis.RequestInit = {
      method: 'POST',
      body: JSON.stringify({ locationId: id }),
    }

    await fetch('/api/locations/set-current-location', params)
    await fetchCurrentLocation()
  }, [setLocationDialogData, closeLocationDialog, fetchCurrentLocation])

  useEffect(() => void fetchCurrentLocation(), [])

  return (
    <>
      <GrubDialog
        open={locationDialogOpen}
        onClose={closeLocationDialog}
        title="Select a Location"
      >
        <LocationForm onSelect={handleUpdateLocation} location={currentLocation} />
      </GrubDialog>
      <Header onOpenLocations={toggleLocationDialog} />
      <main className={styles.appContainer}>{children}</main>
      <MobileNav onOpenLocations={toggleLocationDialog} />
    </>
  )
}
