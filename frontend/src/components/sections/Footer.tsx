const Footer = () => {
  return (
    <footer className='text-white bg-background'>
      <div className='flex flex-row items-center flex-wrap justify-center font-light min-h-[10vh]'>
        Created with love and care by{'\u00A0'}
        <a href='http://linktr.ee/toucheyphoenix' className='hover:text-accent'>
          Abhinil
        </a>
        {'\u00A0&\u00A0'}
        <a href='https://ayushgupta.tech' className='hover:text-accent'>
          Ayush
        </a>
      </div>
    </footer>
  );
};
export default Footer;
