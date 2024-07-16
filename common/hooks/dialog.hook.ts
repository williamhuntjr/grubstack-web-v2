import { useCallback, useState } from 'react'

interface IDialogHookState<Data> {
  open: boolean
  data: Data
}

export interface IDialogHook<Data> extends IDialogHookState<Data> {
  closeDialog(): void
  openDialog(data: Data): void
  setData(data: Data): void
}

// Overload to make the hook work without data
export function useDialog<Data = void>(initialData?: Data): IDialogHook<Data>

export function useDialog<Data>(initialData: Data): IDialogHook<Data> {
  const [state, setState] = useState<IDialogHookState<Data>>({ open: false, data: initialData })

  const closeDialog = useCallback<VoidFunction>(() => {
    setState((prev) => ({ ...prev, open: false }))
  }, [])

  const openDialog = useCallback<(data: Data) => void>((data: Data) => {
    setState({ open: true, data })
  }, [])

  const setData = useCallback<(data: Data) => void>((data) => setState((prevState) => ({ ...prevState, data })), [])

  return {
    ...state,
    closeDialog: closeDialog,
    openDialog: openDialog,
    setData: setData,
  }
}
