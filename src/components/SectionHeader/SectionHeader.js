import React from 'react'
import './SectionHeader.css'

export default function SectionHeader({title}) {
  return (
    <>
    <div className="section-header__wrapper">
      <h2 className="section-header__title">{title}</h2>
      <div className="section-header__line" />
    </div>
    </>
  )
}
