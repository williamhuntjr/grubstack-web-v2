'use client'

import { FC } from 'react'
import { Oswald } from 'next/font/google'
import Button from '@mui/material/Button'
import { useMediaQuery } from '@mui/material'
import { smMq } from 'common/constants'
import { cls } from 'common/utils/utils'
import { getProperty } from 'common/utils/utils'
import { IHomepage } from './homepage.types'
import styles from './homepage.module.scss'

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const Homepage: FC<IHomepage> = ({ properties }) => {
  const bannerProductImg = getProperty(properties, 'banner_image_url') ?? 'https://cdn.grubstack.app/img/home-banner-image.jpg'
  const bannerProductMobileImg =
    getProperty(properties, 'mobile_banner_image_url') ?? 'https://cdn.grubstack.app/img/mobile-home-banner-image.jpg'

  const bannerProductUrl = 'http://localhost:3001'

  const isMobile = useMediaQuery(smMq)
  const bannerImg = isMobile ? bannerProductMobileImg : bannerProductImg

  return (
    <div className={cls(styles.homepage, oswald.variable)}>
      <div
        className={styles.bannerImage}
        style={{
          backgroundImage: 'url(' + bannerImg + ')',
        }}
      >
        <div className={styles.buttonContainer}>
          <Button color="secondary" variant="contained" onClick={() => (window.location.href = bannerProductUrl)}>
            Order Now
          </Button>
        </div>
      </div>
    </div>
  )
}
