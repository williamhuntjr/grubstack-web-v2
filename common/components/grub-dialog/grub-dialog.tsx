import React, { FC } from 'react'
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { trimDialogTitle } from 'common/utils/display.utils'
import { cls } from 'common/utils/utils'
import { IGrubDialog } from './grub-dialog.types'
import styles from './grub-dialog.module.scss'

export const GrubDialog: FC<IGrubDialog> = ({ open, children, className, onClose, title }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const content = <div className={cls(styles.grubDialogContainer, className)}>{children}</div>

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="grub-dialog-title"
    >
      <DialogTitle id="grub-dialog-title" className={styles.dialogTitle}>
        <div className={styles.dialogTitleContent}>
          <div className={styles.dialogTitleText}>
            {trimDialogTitle(title)}
          </div>
          <div className={styles.dialogTitleActions}>
            <Button onClick={onClose} variant="contained" color="secondary" className={styles.dialogActionButton}>
              Close
            </Button>
          </div>
        </div>
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {content}
      </DialogContent>
    </Dialog>
  )
}