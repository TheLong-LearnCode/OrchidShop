import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export default function AboutUs() {
  const { theme, toggle, dark } = useContext(ThemeContext)
  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container text-center my-5 pb-2" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderRadius: '10px' }}>
        <h1 className="display-4 pt-2">FLOWER SHOP ROMA</h1>
        <img src="https://homedecorplus.vn/wp-content/uploads/bab-orchid-shop-nhe-nhang-va-than-thien-homedecorplus-10a.jpg" alt="Flower Shop Roma" className="img-fluid rounded my-4" />
        <p className="lead">Welcome to FLOWER SHOP ROMA, where we offer the most beautiful orchids and excellent customer service.</p>
        <p>We take pride in providing you with high-quality products, carefully selected from the best flower gardens.</p>
        <p>Come and experience the freshness and colors of orchids at our store!</p>
      </div>
    </div>
  )
}
