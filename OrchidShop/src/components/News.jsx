import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export default function News() {
  const { theme, toggle, dark } = useContext(ThemeContext)

  const newsItems = [
    {
      title: "New Orchid Arrivals",
      image: "https://www.airorchid.com/wp-content/uploads/2022/07/Air-Orchid-2-6213_Orchid-farm-consultancy.webp",
      description: "We have just received a new shipment of beautiful orchids!"
    },
    {
      title: "Spring Sale",
      image: "https://www.creativefabrica.com/wp-content/uploads/2020/08/11/Spring-Sale-Banner-Template-Graphics-4926712-1.jpg",
      description: "Enjoy our spring sale with discounts on selected orchids."
    },
    {
      title: "Orchid Care Tips",
      image: "https://bee-ma.world/wp-content/uploads/2024/09/Leonardo_Phoenix_A_serene_and_elegantly_composed_photograph_sh_1.jpg",
      description: "Learn how to take care of your orchids with our expert tips."
    }
  ];

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="container my-5">
        <h1 className="text-center pt-2">News</h1>
        {newsItems.map((news, index) => (
          <div key={index} className="my-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px', padding: '15px', color: theme.color, backgroundColor: theme.backgroundColor }}>
            <h2>{news.title}</h2>
            <img src={news.image} alt={news.title} className="img-fluid rounded"/>
            <p className='pt-2'>{news.description}</p>
          </div>
        ))}
      </div>
    </div>

  )
}