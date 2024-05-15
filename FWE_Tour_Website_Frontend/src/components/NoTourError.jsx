import Header from "./Header";

const NoTourError = () => {
  return (
    <>
      <Header />
      <h1 className="headerError">Keine Reise gefunden</h1>
    </>
  );
};
export default NoTourError;
