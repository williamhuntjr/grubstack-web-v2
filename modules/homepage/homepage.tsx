'use client'

import { Oswald } from 'next/font/google'
import Button from '@mui/material/Button'
import { useMediaQuery } from '@mui/material'
import { smMq } from 'common/constants'
import { cls } from 'common/utils/utils'
import styles from './homepage.module.scss'

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ["400", "700"]
})

export const Homepage = () => {
  const bannerProductImg = 'https://cdn.grubstack.app/9fa974f0-b13d-46ba-9a9e-227cb3c218f7/burger-banner-2-06_05_2024_13:49:43.jpg'
  const bannerProductMobileImg = 'https://cdn.grubstack.app/9fa974f0-b13d-46ba-9a9e-227cb3c218f7/burger-banner-2-06_05_2024_13:49:43.jpg'

  const bannerProductUrl = 'http://localhost:3001'

  const isMobile = useMediaQuery(smMq)
  const bannerImg = isMobile ? bannerProductMobileImg : bannerProductImg

  return (
    <div className={cls(styles.homepage, oswald.variable)}>
      <div className={styles.bannerImage} style={{  
          backgroundImage: "url(" + bannerImg + ")",
        }}>
          <div className={styles.buttonContainer}>
            <Button color="secondary" variant="contained" onClick={() => window.location.href = bannerProductUrl}>Order Now</Button>
          </div>
      </div>
    </div>
  )
}