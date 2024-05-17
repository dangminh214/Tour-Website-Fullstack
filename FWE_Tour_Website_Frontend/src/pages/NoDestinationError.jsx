import Header from "../components/Header";

const NoDestinationError = () => {
  return (
    <>
      <Header />
      <h1 className="headerError">Keine Reiseziel gefunden</h1>
    </>
  );
};
export default NoDestinationError;