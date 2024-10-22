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
  ];

  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="container my-5">
        <h1 className="text-center pt-2" style={{color: theme.color, fontSize: '2.5rem', fontWeight: 'bold'}}>News</h1>
        <div className="row">
        {newsItems.map((news, index) => (
          <div key={index} className=" my-4" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', borderRadius: '10px', padding: '20px', color: theme.color, backgroundColor: theme.backgroundColor }}> 
            <h2 style={{ fontSize: '1.8rem', marginBottom: '15px', fontWeight: '600' }}>{news.title}</h2>
            <img src={news.image} alt={news.title} className="img-fluid rounded" style={{ borderRadius: '8px', marginBottom: '15px', maxWidth: '100%', height: 'auto' }}/>
            <p className='pt-2' style={{ fontSize: '1rem', lineHeight: '1.5' }}>{news.description}</p>
          </div>
        ))}
        </div>
      </div>
    </div>

  )
}
