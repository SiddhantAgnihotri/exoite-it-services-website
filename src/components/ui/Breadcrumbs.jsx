import { Link, useLocation } from "react-router-dom";
import { pages } from "../../data/seo";

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const page = pages[pathname];
  if (!page?.parent) return null;
  return (
    <nav className="container breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span aria-hidden="true">/</span>
      <Link to={page.parent}>{pages[page.parent].label}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{page.label}</span>
    </nav>
  );
}
