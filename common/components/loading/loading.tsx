import React, { FC } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import styles from './loading.module.scss'

export const Loading: FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <h3>Loading...</h3>
        <LinearProgress color="info" />
      </div>
    </div>
  )
}
