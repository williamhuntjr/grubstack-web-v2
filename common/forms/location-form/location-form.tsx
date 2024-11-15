'use client'

import { FC, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Loading } from 'common/components/loading/loading'
import { ILocation } from 'common/types'
import { getActiveLocations } from 'common/actions/locations'
import { ILocationForm } from './location-form.types'
import styles from './location-form.module.scss'

export const LocationForm: FC<ILocationForm> = ({ onSelect, location }) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [locations, setLocations] = useState<ILocation[]>([])

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentLocation(event.target.value as string)
  }

  const init = async () => {
    setLoading(true)
    const locations = await getActiveLocations() ?? []
    setLocations(locations)
    if (location) {
      setCurrentLocation(location.id!)
    }
    setLoading(false)
  }

  const handleSelect = () => {
    if (currentLocation) {
      onSelect(currentLocation)
    }
  }

  useEffect(() => void init(), [])

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className={styles.locationForm}>
          <FormControl fullWidth>
            <InputLabel id="location-select-label">Store Location</InputLabel>
            <Select labelId="location-select-label" id="location-select" value={currentLocation} label="Location" onChange={handleChange}>
              {locations.map((location) => (
                <MenuItem value={location.id} key={`location-${location.id}`}>
                  {location.name} - {location.address1}, {location.city} {location.state}, {location.postal}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Divider />
          <div className={styles.buttonContainer}>
            <Button variant="contained" color="secondary" size="large" className={styles.selectButton} onClick={handleSelect}>
              Select Location
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
