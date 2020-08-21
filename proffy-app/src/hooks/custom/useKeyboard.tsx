import { useState, useEffect } from "react"
import { Keyboard } from "react-native"

interface UseKeyboardOptions {
  initialOpen?: boolean
  trackScreenFocus?: boolean
}

export default (options?: UseKeyboardOptions) => {
  const { initialOpen = false } = options || {}

  const [open, setOpen] = useState(initialOpen)

  const hideKeyboard = () => {
    setOpen(false)
  }

  const showKeyboard = () => {
    setOpen(true)
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", showKeyboard)
    Keyboard.addListener("keyboardWillShow", showKeyboard)
    Keyboard.addListener("keyboardDidHide", hideKeyboard)
    Keyboard.addListener("keyboardWillHide", hideKeyboard)

    return () => {
      Keyboard.removeListener("keyboardDidShow", showKeyboard)
      Keyboard.removeListener("keyboardWillShow", showKeyboard)
      Keyboard.removeListener("keyboardDidHide", hideKeyboard)
      Keyboard.removeListener("keyboardWillHide", hideKeyboard)
    }
  }, [])

  return open
}
