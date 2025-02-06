import React from 'react'
import Button from './Button'

const Header = () => {
  return (
        <nav className='navbar container pt-3 pb-3 align-items-start'>
            <a className='navbar-brand text-light'>STOCK PREDICATION </a> 
            <div>
                <Button class='btn-outline-info' text='Login'/>
                &nbsp;&nbsp;
                <Button text='Register'class='btn-info' />
            </div>
        </nav>
       

  )
}

export default Header