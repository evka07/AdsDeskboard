const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='text-center text-muted mt-3'>
      <p>Copyright &#169; LocalAds App {currentYear}</p>
    </div>
  );
};

export default Footer;
