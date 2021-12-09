import { Spinner } from "react-bootstrap";
interface Props {
  content?: string;
}

export default function LoadingComponent({ content }: Props) {
  return (
    <div className="border d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="dark">
        <span className="visually-hidden">{content}...</span>
      </Spinner>
    </div>
  );
}
