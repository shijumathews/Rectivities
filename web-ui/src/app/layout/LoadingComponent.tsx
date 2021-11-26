import { Spinner } from "react-bootstrap";
interface Props {
  inverted?: boolean;
  content?: string;
}

export default function LoadingComponent({ inverted, content }: Props) {
  return (
    <div className="border d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
