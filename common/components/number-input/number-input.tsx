'use client'

import React, { FC, useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { INumberInput } from './number-input.types'
import styles from './number-input.module.scss'

export const NumberInput: FC<INumberInput> = ({ value, onValueChange, noNegativeValues }) => {
  const [valueState, setValue] = useState<number>(value)

  const decreaseValue = () => {
    if (noNegativeValues && valueState <= 1) {
      return
    } else {
      onValueChange(valueState - 1)
      setValue(valueState - 1)
    }
  }

  const increaseValue = () => {
    onValueChange(valueState + 1)
    setValue(valueState + 1)
  }

  useEffect(() => setValue(value), [value])

  return (
    <div className={styles.numberInput}>
      <Button variant="contained" color="secondary" onClick={() => decreaseValue()}>
        <KeyboardArrowDownIcon />
      </Button>
      <TextField
        inputProps={{ type: 'number' }}
        value={valueState}
        onChange={(value) => setValue(Number(value.target.value))}
        className={styles.inputContainer}
      />
      <Button variant="contained" color="secondary" onClick={() => increaseValue()}>
        <KeyboardArrowUpIcon />
      </Button>
    </div>
  )
}
