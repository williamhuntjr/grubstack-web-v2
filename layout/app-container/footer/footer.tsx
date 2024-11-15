'use client'

import React, { FC } from 'react'
import { cls } from 'common/utils/utils'
import { IFooter } from './footer.types'
import styles from './footer.module.scss'

export const Footer: FC<IFooter> = ({ isHomepage }): JSX.Element => {
  return (
    <div className={cls(styles.footerContainer, !isHomepage ? styles.fixedFooter : '')}>
      <p>
        Powered by{' '}
        <a href="https://grubstack.app" className={styles.siteLink}>
          GrubStack
        </a>
      </p>
    </div>
  )
}
