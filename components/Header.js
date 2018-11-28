import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = (props) => (
    <div>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css"/>
        <title></title>
        <div className='header-row'>
        <div className='otim-logo'>
        <a href="/" style={linkStyle}>
        <img src='/static/img/logo-transparent.png'/>
        </a>

        </div>
        <div className="otim-nav">
        <a className='github-link' href="https://github.com/otim-project/">github</a>
{/*        <Link href="/about">
          <a style={linkStyle}>about</a>
        </Link>
*/}        </div>
        </div>

        <style jsx>{`
            .otim-nav{
                float: right;
            }

            .header-row {
                height: 100px;
            }

            .otim-logo {
                width: 80px;
                height: 80px;
                display: inline-block;
                margin: 0 50px;
            }
            .github-link {
                margin-right: 20px;
            }
        `}</style>

    </div>
)

export default Header
