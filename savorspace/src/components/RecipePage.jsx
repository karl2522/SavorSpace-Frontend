import { useEffect, useState } from 'react';
import { MdAccessTime, MdOutlineSignalCellularAlt } from "react-icons/md";
import '../styles/RecipePageStyles.css';

const trendingItems = [
  {
    image: 'src/images/sinigang-trend.webp',
    category: 'Filipino Dish',
    subCategory: 'Main Course',
    title: 'Sinigang na Baboy',
    description: 'Sinigang na Baboy is a classic Filipino stew made with tender pork, simmered in a tangy tamarind-based broth. It\'s filled with fresh vegetables like eggplant, radish, and okra, creating a comforting, savory, and slightly sour soup that\'s perfect with steamed rice.',
    author: {
    name: 'Lily Anderson',
    avatar: 'src/images/trend-chef1.png'
    },
    cookingTime: '30 mins',
    difficulty: 'Intermediate'
  },

  {
    image: 'src/images/adobo-trend.webp',
    category: 'Filipino Dish',
    subCategory: 'Main Course',
    title: 'Adobo',
    description: 'Adobo is one of the Philippines\' most beloved dishes, known for it\'s savory, tangy, and slightly sweet flavors. Made by simmering tender cuts of pork or chicken in a marinade of soy sauce, vinegar, garlic, bay leaves, and black peppercorns, Adobo develops a deep, rich flavor that perfectly balances salty and acidic notes.',
    author: {
    name: 'Emma Nguyen',
    avatar: 'src/images/trend-chef2.png'
    },
    cookingTime: '30 mins',
    difficulty: 'Intermediate'
  },

  {
    image: 'src/images/pancit-trend.jpg',
    category: 'Filipino Dish',
    subCategory: 'Main Course',
    title: 'Pansit Bam-i',
    description: 'Pansit Bam-i is a traditional Filipino noodle dish, popular in the Visayas region, known for its unique combination of two types of noodles: canton (egg noodles) and sotanghon (glass noodles). This flavorful stir-fry is loaded with a mix of vegetables, savory pork, tender chicken, and shrimp, all seasoned with garlic, soy sauce, and spices.',
    author: {
    name: 'Lily Anderson',
    avatar: 'src/images/trend-chef1.png'
    },
    cookingTime: '30 mins',
    difficulty: 'Intermediate'
  },
  // Add more trending items here...
];

export default function RecipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingItems.length);
    }, 5000); // Change item every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const currentItem = trendingItems[currentIndex];

  return (
    <div className="trending-container">
      <h2 className="trending-title">Trending <span>Now</span></h2>
      <div className="trending-content">
        <div className="trending-image">
          <img src={currentItem.image} alt={currentItem.title} />
        </div>
        <div className="trending-details">
          <div className="trending-categories">
            <span>{currentItem.category}</span>
            <span>{currentItem.subCategory}</span>
          </div>
          <h3 className="trending-item-title">{currentItem.title}</h3>
          <div className="trending-meta">
          </div>
          <p className="trending-description">{currentItem.description}</p>
          <div className="trending-author">
            <img src={currentItem.author.avatar} alt={currentItem.author.name} />
            <span>{currentItem.author.name}</span>
            <div className="trending-info">
              <MdAccessTime size={20}/>
              <span>{currentItem.cookingTime}</span>
              <MdOutlineSignalCellularAlt size={20}/>
              <span>{currentItem.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="trending-pagination">
        {trendingItems.map((_, index) => (
          <span 
            key={index} 
            className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
}