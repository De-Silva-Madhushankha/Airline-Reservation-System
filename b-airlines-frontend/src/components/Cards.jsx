import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/galle.jpeg'
              text='Explore Sri Lanka: Endless Beaches, Timeless Ruins, Welcoming Hearts'
              label='Adventure'
              path='/services'
            />
            <CardItem
              src='images/BALI.jpg'
              text='Travel through the Islands of Bali'
              label='Luxury'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/thailand.jpeg'
              text='Now even more amazing Thailand has it all'
              label='Adventure'
              path='/services'
            />
            <CardItem
              src='images/india.jpg'
              text='Discover the Hidden Gems of India - A Place of Endless Splendor!'
              label='Culture'
              path='/products'
            />
            <CardItem
              src='images/singapore-01.jpg'
              text='Experience the Future in Singapore'
              label='Luxury'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;