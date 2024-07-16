'use client'

import React from 'react'
import styles from './footer.module.scss'

export const Footer = (): JSX.Element => {
  return (
    <div className={styles.footerContainer}>
      <p>
        Powered by{' '}
        <a href="https://grubstack.app" className={styles.siteLink}>
          GrubStack
        </a>
      </p>
    </div>
  )
}
