import React, { useMemo, useCallback, useEffect, useRef } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Animated,
  PanResponder
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import { color, viewportWidth } from '../../../theme'
import Text from '../../Text'
import { useToast, Toast as ToastType } from '../../../hooks/toast'

import styles from './styles'

export interface ToastProps {
  toast: ToastType
}

interface AnimationRef extends Animated.Value {
  _value?: number
  _offset?: number
}

const propsTypeMapping = {
  success: {
    icon: 'check',
    color: color.green,
    fontColor: color.white
  },
  error: {
    icon: 'exclamation',
    color: color.red,
    fontColor: color.white
  },
  info: { icon: 'question', color: color.background, fontColor: color.textBase }
} as {
  [key in ToastType['type']]: { icon: string; color: string; fontColor: string }
}

const Toast: React.FC<ToastProps> = (props) => {
  const { toast } = props

  const { removeToast } = useToast()

  const { type, duration, message } = toast

  const animation = useRef<AnimationRef>(new Animated.Value(viewportWidth))
  const timer = useRef<number>()

  const iconName = useMemo(() => {
    return propsTypeMapping[type].icon
  }, [type])

  const color = useMemo(() => {
    return propsTypeMapping[type].color
  }, [type])

  const fontColor = useMemo(() => {
    return propsTypeMapping[type].fontColor
  }, [type])

  const style = useMemo(
    () => [styles.commomToast, { backgroundColor: color }],
    [color]
  )

  const handleRemove = useCallback(
    ({ left = false }) => {
      const toValue = viewportWidth * (left ? -1 : 1)
      Animated.timing(animation.current, {
        toValue,
        duration: 200,
        useNativeDriver: false
      }).start(() => {
        removeToast(toast.id)
      })
    },
    [removeToast]
  )

  const animateToCenter = useCallback(() => {
    Animated.timing(animation.current, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start()
  }, [animation.current])

  useEffect(() => {
    animateToCenter()

    timer.current = setTimeout(() => {
      handleRemove({})
    }, duration || 3000)

    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        clearTimeout(timer.current)
        const animationValue = animation.current._value || 0
        animation.current.setOffset(animationValue)
      },
      onPanResponderMove: Animated.event([null, { dx: animation.current }], {
        useNativeDriver: false
      }),
      onPanResponderRelease: () => {
        const animationValue = animation.current._value || 0
        const animationOffset = animation.current._offset || 0

        animation.current.flattenOffset()

        const totalOffset = animationValue + animationOffset

        if (Math.abs(totalOffset) < viewportWidth * 0.2) {
          animateToCenter()
        } else {
          handleRemove({ left: totalOffset < 0 })
        }
      }
    })
  ).current

  return (
    <View {...panResponder.panHandlers}>
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            style,
            {
              left: animation.current,
              opacity: animation.current.interpolate({
                inputRange: [-viewportWidth, 0, viewportWidth],
                outputRange: [0.1, 1, 0.1]
              })
            }
          ]}
        >
          {type !== 'info' && (
            <View style={styles.icon}>
              <FontAwesome5 name={iconName} color={color} size={13} />
            </View>
          )}
          <Text style={[styles.texto, { color: fontColor }]} text={message} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Toast
