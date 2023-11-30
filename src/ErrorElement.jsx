import { useRouteError } from "react-router-dom";
import "./style/ErrorElement.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const getErrorText = () => {
    if (error) {
      if (error.status === 404) {
        return `This page doesn't exist!`;
      }

      if (error.status === 401) {
        return `You aren't authorized to see this`;
      }

      if (error.status === 503) {
        return `Looks like our API is down`;
      }

      if (error.status === 418) {
        return `🫖`;
      }
    }

    return `Something went wrong`;
  };

  const errorText = getErrorText();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorText}</i>
      </p>
    </div>
  );
}
