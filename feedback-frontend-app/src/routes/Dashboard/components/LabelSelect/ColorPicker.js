import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

export default function ColorPicker(props) {
  const [isVisible, setIsVisible] = React.useState(false)

  const styles = reactCSS({
    default: {
      color: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        background: props.color || '#000000',
      },
      swatch: {
        width: '100%',
        height: 32,
        padding: 5,
        background: '#fff',
        borderRadius: 2,
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  })

  return (
    <>
      <div
        style={styles.swatch}
        onClick={() => {
          setIsVisible(!isVisible)
        }}
      >
        <div style={styles.color} />
      </div>
      {isVisible ? (
        <div style={styles.popover}>
          <div
            style={styles.cover}
            onClick={() => {
              setIsVisible(false)
            }}
          />
          <SketchPicker
            color={props.color}
            onChange={val => {
              props.onChange(val)
            }}
            disableAlpha
          />
        </div>
      ) : null}
    </>
  )
}
