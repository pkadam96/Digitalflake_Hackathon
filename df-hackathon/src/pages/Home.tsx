import logo from '../assets/logo.png';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-36 ">
      <img src={logo} alt="Logo" />
      <p className="mt-4 text-3xl">Welcome to Digitalflake Admin</p>
    </div>
  );
};

export { Home };
