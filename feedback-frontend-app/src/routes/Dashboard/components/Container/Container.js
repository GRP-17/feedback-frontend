import React from 'react'
import './Container.css'

export default function Container(props) {
  return (
    <div className="s-container" style={props.style}>
      {(props.title || props.extra) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: 10 }}>
            {props.title}
          </div>
          {props.extra}
        </div>
      )}
      {props.children}
    </div>
  )
}
