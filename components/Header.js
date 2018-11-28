import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css"/>

        <div>OTIM</div>
        <a href="/" style={linkStyle}>Home</a>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
    </div>
)

export default Header
