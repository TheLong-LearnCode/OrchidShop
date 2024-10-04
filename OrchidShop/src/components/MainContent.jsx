import React from 'react'
import { Orchids } from '../../ListOfOrchids'
import Content from './Content'

export default function MainContent() {
  return (
    <Content orchidData={Orchids} />
  )
}

