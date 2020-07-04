import React from 'react';
import { Menu } from 'semantic-ui-react';

const items = [
  { key: '1', name: 'Home' },
  { key: '2', name: 'About', position: 'right' },
  {
    key: '3',
    name: 'Resume',
    href: 'static/media/WyllBrim-Resume.99044556.pdf',
    target: '_blank',
    rel: "noopener noreferrer"
  }
]

function Navbar() {
  return (
    <Menu items={items} />
  )
}

export default Navbar;

//href="newsletter_01.pdf" target="_blank"