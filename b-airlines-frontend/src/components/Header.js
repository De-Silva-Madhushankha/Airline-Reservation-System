export default function Header() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            B-Airlines <i className='fab fa-typo3' />
          </Link>
        </div>
      </nav>
    </>
  );
}